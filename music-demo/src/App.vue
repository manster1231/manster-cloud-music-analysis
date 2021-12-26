<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li>  <router-link to="/index">年龄分布</router-link> </li>
        <li>  <router-link to="/city">城市分布</router-link></li>
        <li>  <router-link to="/comments">评论关键词</router-link></li>
        <li>  <router-link to="/time">评论时间分布</router-link></li>
        <li>  <router-link to="/date">评论月份分布</router-link></li>
        <li>  <router-link to="/gender">性别分布</router-link></li>
        <li>  <router-link to="/vip">会员情况</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
ul{
    list-style:none;
}
a{
    text-decoration: none;
}
.nav{
    width: 970px;
    height: 25px;
    margin: 0 auto;
    border-bottom: 2px solid #0266A3;
}
.nav li{
    padding:0 15px 0 15px;
    line-height: 25px;
    float: left;
    font-size: 14px;
    font-weight: bold;
}
.nav li a{
    color: #0266A3;
}
.nav li:hover{
    background-color:#0266A3 ;
}
.nav  li:hover  a{
    color: white;
}
</style>
