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
object Age {

  def main(args: Array[String]): Unit = {
    val sparkConf: SparkConf = new SparkConf().setMaster("local[*]").setAppName("Age")
    val sc = new SparkContext(sparkConf)

    val inputFilePath = "userinfo.csv"
    val outputFile = "output\\age.json"
    val inputFile: RDD[String] = sc.textFile(inputFilePath)

    val data: RDD[Array[String]] = inputFile.map(item => item.split(",").map(elem => elem.trim))
    //去除第一行
    val filterData: RDD[Array[String]] = data.filter(item => item(0) != "userId")
    //将第4列转为数字
    val intData: RDD[Int] = filterData.map(item => item(3).toInt).filter(x => x>0)
    //统计
    val res: RDD[(String, Int)] = intData.filter(age => age >= 1 && age <= 6).map(age => ("童年", 1)).reduceByKey(_ + _)
      .union(intData.filter(age => age >= 7 && age <= 17).map(age => ("少年", 1)).reduceByKey(_ + _))
      .union(intData.filter(age => age >= 18 && age < 28).map(age => ("青春期", 1)).reduceByKey(_ + _))
      .union(intData.filter(age => age >= 29 && age < 40).map(age => ("成熟", 1)).reduceByKey(_ + _))
      .union(intData.filter(age => age >= 41 && age < 65).map(age => ("中年", 1)).reduceByKey(_ + _))
      .union(intData.filter(age => age >= 66).map(age => ("老年", 1)).reduceByKey(_ + _))

    res.foreach(println)
    rddToJson(res,outputFile)
  }


  def rddToJson(age: RDD[(String, Int)], outputFilePath: String): Unit = {
    val result = "age" -> age.collect().toList.map{
      case (ageRange,count)=>
        ("ageRange",ageRange) ~
          ("count",count)
    }
    val outputFile = new PrintWriter(outputFilePath)
    outputFile.write(compact(render(result)))
    outputFile.close()
  }

}
