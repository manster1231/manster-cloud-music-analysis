package com.manster.spark.music

import java.io.PrintWriter

import com.huaban.analysis.jieba.JiebaSegmenter
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.rdd.RDD
import org.json4s.jackson.JsonMethods._
import org.json4s.JsonDSL._

import scala.io.Source

/**
 * @Author manster
 * @Date 2021/12/15
 * */
object Comment {
  def main(args: Array[String]): Unit = {

    val conf = new SparkConf().setAppName("AnalyzeComment").setMaster("local")
    val sc = new SparkContext(conf);

    val inputFile = "comments.csv"
    val outputFile = "output\\comments.json"

    val inputData = sc.textFile(inputFile)
    var mapData: RDD[Array[String]] = inputData.map(line => line.split(","))

    val filterData = mapData.filter( line => line(0) != "commentId")

    val stopsource = Source.fromFile("stopword.txt")
    val stopset = stopsource.getLines().toSet
    stopsource.close()

    var mapComment: RDD[String] = filterData.map(x => x(1))

    val mkComment = mapComment.collect().mkString
    val jieba = new JiebaSegmenter();
    var res: String = jieba.sentenceProcess(mkComment).toString
    var words: RDD[String] = sc.parallelize(res.split("[,| ]")
      .filter(x => !stopset.contains(x))
      .filter(x => x != ""))
    var wordcount: RDD[(String, Int)] = words.flatMap(line => line.split(" "))
      .map(word => (word, 1))
      .reduceByKey(_ + _)
      .sortBy(item => item._2,false)

    rddToJson(wordcount,outputFile)

  }

  def rddToJson(genderRdd:RDD[(String,Int)],outputFilePath :String)={
    //1.将分析结果转换为json格式的数据
    val result = "words" -> genderRdd.collect().toList.map{
      case (a,b) =>
        ("name",a) ~
          ("value",b)
    }
    //2.将转换后的数据写入到文件中
    val outputFile =  new PrintWriter(outputFilePath)
    outputFile.write(compact(render(result)))
    outputFile.close()

  }
}
