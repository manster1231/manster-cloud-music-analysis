package com.manster.spark.music
import java.io.PrintWriter

import org.apache.spark.rdd.RDD
import org.apache.spark.{SparkConf, SparkContext}
import org.json4s.JsonAST
import org.json4s.JsonDSL._
import org.json4s.jackson.JsonMethods._
/**
 * @Author manster
 * @Date 2021/12/16
 * */
object Date {
  def main(args: Array[String]): Unit = {
    val sparkConf: SparkConf = new SparkConf().setAppName("Date").setMaster("local")
    val sc = new SparkContext(sparkConf)
    val inputFile = "comments.csv"
    val outPutPath = "output\\date.json"
    val inputFileData: RDD[String] = sc.textFile(inputFile)


    val data: RDD[Array[String]] = inputFileData.map(line => line.split(",").map(elem => elem.trim))
    val filterData: RDD[Array[String]] = data.filter(line => line(0)!="commentId")
    val dateDate: RDD[String] = filterData.map(comm => comm(3)).map(x =>DateUtils.formatValueDate(x))
    val res: RDD[(String, Int)] = dateDate.map(x => (x,1)).reduceByKey((a, b) => a+b).sortBy(_._1,true)
    tojson(res,outPutPath)
  }
  def tojson(date: RDD[(String, Int)], outPutPath:String): Unit = {
    val json: (String, List[JsonAST.JObject]) = "dates" -> date.collect().toList.map {
      case (date, count) =>
        ("date", date) ~
          ("count", count)
    }
    val writer = new PrintWriter(outPutPath)
    writer.write(compact(render(json)))
    writer.close()
  }
}
