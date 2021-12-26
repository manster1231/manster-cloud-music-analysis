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
object Vip {
  def main(args: Array[String]): Unit = {
    val inputFile = "userinfo.csv"
    val outputFilePath = "output\\vip.json"
    val sparkConf: SparkConf = new SparkConf().setAppName("Vip").setMaster("local")
    val sc = new SparkContext(sparkConf)
    val inputData: RDD[Array[String]] = sc.textFile(inputFile).map(line => line.split(",").map(elem => elem.trim))
    val filterData: RDD[Array[String]] = inputData.filter(line => line(0)!="userId")
    val vipData: RDD[(Int, Int)] = filterData.map(item => (item(5).toInt, item(6).toInt))

    val res: RDD[(Int, String, Int)] = vipData.filter(item => item._1 == 0).map(item => (item._2 + ",普通用户", 1))
      .union(vipData.filter(item => item._1 == 10).map(item => (item._2 + ",普通会员", 1)))
      .union(vipData.filter(item => item._1 == 11).map(item => (item._2 + ",黑胶会员", 1)))
      .reduceByKey(_ + _)
      .map(item => (item._1.split(",")(0).toInt, item._1.split(",")(1), item._2))
      .sortBy(_._1,true)
      .sortBy(_._2,true)

    tojson(res,outputFilePath)
  }

  def tojson(vip: RDD[(Int, String, Int)],outputFilePath: String): Unit = {
    val json = "vip" -> vip.collect().toList.map {
      case (level, viptype, count) =>
        ("level", level) ~
          ("viptype", viptype) ~
          ("count", count)
    }
    println(json)
    val writer = new PrintWriter(outputFilePath)
    writer.write(compact(render(json)))
    writer.close()
  }
}
