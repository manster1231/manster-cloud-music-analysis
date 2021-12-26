package com.manster.spark.music

import java.io.PrintWriter

import org.apache.spark.rdd.RDD
import org.apache.spark.{SparkConf, SparkContext}
import org.json4s.JsonDSL._
import org.json4s.jackson.JsonMethods._

/**
 * @Author manster
 * @Date 2021/12/15
 * */
object Gender {
  def main(args: Array[String]): Unit = {
    val sparkConf: SparkConf = new SparkConf().setMaster("local[*]").setAppName("Gender")
    val sc = new SparkContext(sparkConf)

    val inputFilePath = "userinfo.csv"
    val inputFile: RDD[String] = sc.textFile(inputFilePath)
    val outputFile = "output\\gender.json"

    val data: RDD[Array[String]] = inputFile.map(item => item.split(","))

    val header = data.take(1)(0)
    val filterData: RDD[Array[String]] = data.filter(item => item(0) != "userId")

    //userId,nickname,gender,age,birthday,viptype,level,sign,eventCount,followsCount,province,city,listenSongs
    val genderData: RDD[Int] = filterData.map(item => item(2).toInt)

    val res: RDD[(String, Int)] = genderData.filter(genderNum => genderNum == 0).map(item => ("未设定", 1)).reduceByKey(_ + _)
      .union(genderData.filter(genderNum => genderNum == 1).map(item => ("男", 1)).reduceByKey(_ + _))
      .union(genderData.filter(genderNum => genderNum == 2).map(item => ("女", 1)).reduceByKey(_ + _))

    res.foreach(println)
    rddToJson(res,outputFile)
  }

  def rddToJson(genderRdd:RDD[(String,Int)],outputFilePath :String)={
    //1.将分析结果转换为 json 格式的数据
    val result = "gender" -> genderRdd.collect().toList.map{
      case (a,b) =>
        ("sex",a) ~
          ("count",b)
    }
    //2.将转换后的数据写入到文件中
    val outputFile = new PrintWriter(outputFilePath)
    outputFile.write(compact(render(result)))
    outputFile.close()
  }
}
