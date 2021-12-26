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
object City {
  def main(args: Array[String]): Unit = {
    val sparkConf: SparkConf = new SparkConf().setMaster("local[*]").setAppName("City")
    val sc = new SparkContext(sparkConf)

    val inputFilePath1 = "userinfo.csv"
    val inputFilePath2 = "province.csv"
    val outputFilePath = "output\\city.json"
    val inputData: RDD[Array[String]] = sc.textFile(inputFilePath1)
      .map(item => item.split(",")).filter(item => item(0)!="userId")
    //变成城市编号并过滤
    val filterData: RDD[Int] = inputData.map(item => item(10).toInt).filter(x => x != 0 && x!=100 && x!=1000000)

    val provinceNum: RDD[(Int, Int)] = filterData.groupBy(n => n).map(n => n._1 -> n._2.size)
    provinceNum.foreach(println)

    val provinceName: RDD[(Int, String)] = sc.textFile(inputFilePath2).map(item => item.split(",")).map(item => (item(1).toInt, item(0)))

    val res: RDD[(String, Int)] = provinceName.join(provinceNum).map(item => item._2)

    res.foreach(println)

    rddToJson(res,outputFilePath)
  }

  def rddToJson(age: RDD[(String, Int)], outputFilePath: String): Unit = {
    val result = "city" -> age.collect().toList.map{
      case (ageRange,count)=>
        ("province",ageRange) ~
          ("count",count)
    }
    val outputFile = new PrintWriter(outputFilePath)
    outputFile.write(compact(render(result)))
    outputFile.close()
  }
}
