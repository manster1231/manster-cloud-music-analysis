package com.manster.spark.music

import com.huaban.analysis.jieba.JiebaSegmenter
import org.apache.spark.{SparkConf, SparkContext}

/**
 * @Author manster
 * @Date 2021/12/15
 * */
object JiebaDemo {

  def main(args: Array[String]): Unit = {

    /*val str:String ="我来到太原理工大学"
    var jiebaStr1= new JiebaSegmenter().sentenceProcess(str).toString()
    println(jiebaStr1)*/

    val conf = new SparkConf().setAppName("input").setMaster("local[*]")
    val sc = new SparkContext(conf)
    val rdd=sc.textFile("comments.csv")
      .map { x =>
        var str = if (x.length > 0)
          new JiebaSegmenter().sentenceProcess(x)
        str.toString
      }.take(5).foreach(println)

  }
}
