<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time|dateForm}}</span>
            <span>点击：{{photoinfo.click}}</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <!-- 版本过低，不能支持，要用新版本的语法格式 -->
        <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index,list)" :key="item.src"> -->

        <div class="thumbs">
            <vue-preview :slides="list" class="imgPrev" @close="handleClose"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置一个现成的评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
// 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,   //从路由中获取到的图片ID
            photoinfo:{},   //图片详情
            list:[],    //缩略图的数组
        }
    },
    created() {
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods: {
        getPhotoInfo(){
            // 获取图片详情
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                if (result.body.status===0) {
                    this.photoinfo=result.body.message[0];
                } else {
                    Toast("获取数据失败")
                }
            })
        },
        getThumbs(){
            // 获取缩略图
            this.$http.get("api/getthumimages/"+this.id).then(result=>{
                if (result.body.status===0) {
                    result.body.message.forEach(item => {
                        // 循环每个图片数据，补全图片的宽和高
                        item.src=item.src;
                        item.msrc=item.src;
                        item.w=600;
                        item.h=400;
                    });
                    // 把完整的数据保存到list中
                    this.list=result.body.message
                }
            })
        },
        handleClose () {  //加上这个方法
                console.log('close event')
        }
    },
    components:{
        'cmt-box':comment   //注册评论子组件
    }
}
</script>
<style lang="scss">
    .photoinfo-container{
        padding: 3px;

        h3{
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            padding: 5px;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
            padding: 5px;
        }
         .thumbs{
         /deep/ .my-gallery{   //deep深层作用选择器
              display: flex;
              flex-wrap:wrap;//默认换行
              figure{
                  width: 30%;  
                  margin: 5px; 
                  img{
                      width: 100%;
                      box-shadow: 0 0 8px #999;  
                      border-radius: 5px;
                  }
              }
          }
        }
    }
</style>