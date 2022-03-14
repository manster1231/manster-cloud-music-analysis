# manster网易云音乐分析

#### 介绍
一个简单的网易云音乐大数据分析，采用 Saprk 框架进行分析，并以前端 vue 使用 ECharts 作为展示

#### 环境

jdk-1.8，scala-2.12.13，nodejs-12.1.0，hadoop-2.7.3


#### 安装教程

1.  首先安装好以上环境(配到环境变量中)
2.  使用 vscode 或者 webstorm 打开 music-demo 文件夹，输入 `npm install`, 然后 `npm run serve`
3.  后端项目就是简单的一个一个单独的启动项，类似 javase 的单个程序，使用 idea 打开，下载 jar 包，一个一个进行运行即可

#### 样例

![年龄分布](./images/age.png)

![城市分布](./images/city.png)

![评论关键词](./images/keywords.png)

![评论时间分布](./images/hour.png)

![评论月份分布](./images/month.png)

![性别分布](./images/gender.png)

![会员分布](./images/vip.png)

# manster的纪录片大数据分析
[https://gitee.com/manster1231](https://gitee.com/manster1231)
#### 介绍
基于B站纪录片使用 Python 进行爬取，使用 Spark 进行对数据的分析，使用 ECharts 展示数据

#### 环境

jdk-1.8，scala-2.12.13，nodejs-12.1.0，hadoop-2.7.3，python-3.7


#### 安装教程

1.  首先安装好以上环境(配到环境变量中)
2.  爬虫使用pycharm或者命令行界面打开，直接运行即可
3.  使用 vscode 或者 webstorm 打开 music-demo 文件夹，输入 `npm install`, 然后 `npm run serve`
4.  后端项目就是简单的一个一个单独的启动项，类似 javase 的单个程序，使用 idea 打开，下载 jar 包，一个一个进行运行即可

#### 样例
首页
![index](https://img-blog.csdnimg.cn/f2c9b51ce9a64751a78e0d9a623cfc55.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

词云
![wordcloud](https://img-blog.csdnimg.cn/e770bf6e4a3c439db00de646d726a6c7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

弹幕发送时间图
![在这里插入图片描述](https://img-blog.csdnimg.cn/906e633e743941d1b8227054a76e9417.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
纪录片受欢迎程度
![在这里插入图片描述](https://img-blog.csdnimg.cn/ecc956f7470f43e58afb94a058e6ad0d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
各国纪录片集数分析
![在这里插入图片描述](https://img-blog.csdnimg.cn/8cd54fba87164e2c91fbc6ee2f6dc94c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
各国纪录片数量分析
![在这里插入图片描述](https://img-blog.csdnimg.cn/97f136f0b92044a7bf30687f8588d472.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
各国每集时长分析
![在这里插入图片描述](https://img-blog.csdnimg.cn/f5dc302ec8704e19807158ee116620eb.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
纪录片地区分布图
![在这里插入图片描述](https://img-blog.csdnimg.cn/40a0a2ec05924825aaa056f36334bdcc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
粉丝数与发布数
![在这里插入图片描述](https://img-blog.csdnimg.cn/fe8e2472b591409aa2d9d31b79f25c59.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
纪录片类型分布图
![在这里插入图片描述](https://img-blog.csdnimg.cn/94c25fcf8f41497a8562b592817146be.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
各国纪录片时长分析
![在这里插入图片描述](https://img-blog.csdnimg.cn/06a1ecf3d6d9492f9dd677f75dd89c4c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
各国记录片风格分布
![在这里插入图片描述](https://img-blog.csdnimg.cn/e96eb9f1353a4deb8f554b8355239224.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
弹幕视频点
![在这里插入图片描述](https://img-blog.csdnimg.cn/ca3fcd0dfe014fc3a47f626b893c9102.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbWFuc3RlcjEyMzE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


