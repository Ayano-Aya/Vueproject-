<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt />
      </mt-swipe-item>
      <!-- <mt-swipe-item></mt-swipe-item>
      <mt-swipe-item></mt-swipe-item>-->
    </mt-swipe>
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newslist">
          <img src="../../img/ico1.jpg" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/photolist">
          <img src="../../img/ico2.jpg" alt="">          
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodslist">
          <img src="../../img/ico3.jpg" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../img/ico4.jpg" alt="">          
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../img/ico5.jpg" alt="">     
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../img/ico6.jpg" alt="">          
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunbotuList: [
        // 保存轮播图的数组
      ]
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          // console.log(result.body)
          if (result.body.status === 0) {
            // 成功
            this.lunbotuList = result.body.message;
            // Toast('加载轮播图成功')
          } else {
            // 失败
            Toast("加载轮播图失败");
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: lightpink;
    }
    &:nth-child(2) {
      background-color: lightskyblue;
    }
    &:nth-child(3) {
      background-color: limegreen;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mui-grid-view.mui-grid-9{
    background-color: white;
    border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;

    img{
        width: 60px;
        height: 60px;
    }

    .mui-media-body{
        font-size: 13px;
    }
}
</style>