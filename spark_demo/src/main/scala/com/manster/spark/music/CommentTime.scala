package com.manster.spark.music
import java.io.PrintWriter
import org.apache.spark.rdd.RDD
import org.apache.spark.{SparkConf, SparkContext}
import org.json4s.JsonDSL._
import org.json4s.jackson.JsonMethods._
/**
 * @Author manster
 * @Date 2021/12/16
 * */
object CommentTime {
  def main(args: Array[String]): Unit = {
    val sparkConf: SparkConf = new SparkConf().setAppName("CommentTime").setMaster("local")
    val sc = new SparkContext(sparkConf)
    val inputFile = "comments.csv"
    val outputFilePath = "output\\commenttime.json"
    val splitData: RDD[Array[String]] = sc.textFile(inputFile).map(line => line.split(",").map(elem => elem.trim))

    val filterData: RDD[Array[String]] = splitData.filter(line => line(0)!="commentId")
    val timeData: RDD[String] = filterData.map(item => item(3) ).map(x =>DateUtils.formatValueTime(x))
    val res: RDD[(String, Int)] = timeData.map(x =>(x,1)).reduceByKey((a, b) =>a+b).sortBy(_._1,true)
    tojson(res,outputFilePath)

  }

  def tojson(time: RDD[(String, Int)], outputFilePath: String): Unit = {
    val json = "times" -> time.collect().toList.map {
      case (time, count) =>
        ("name", time) ~
        ("value", count)
    }
    val writer = new PrintWriter(outputFilePath)
    writer.write(compact(render(json)))
    writer.close()
  }
}
