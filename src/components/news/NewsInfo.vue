<template>
    <div class="newsinfo-container">
        <!-- 主标题 -->
        <h3 class="title">  {{  newsinfo.title  }}  </h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        
        <hr>
        <!-- 新闻内容 -->
        <div class="content" v-html="newsinfo.content">
        </div>
        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import {    Toast} from 'mint-ui'

// 导入 评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data() {
        return {
            id:this.$route.params.id,   //将url地址中传递过来的ID值，挂载到data上，方便以后调用
            newsinfo:{} //新闻对象
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            // 获取新闻详情
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if (result.body.status===0) {
                    this.newsinfo = result.body.message[0];
                } else {
                    Toast('获取新闻失败')
                }
            })
        }
    },
    components:{
        // 用来注册子组件的节点
        'comment-box':comment
    }    
}
</script>
<style lang="scss" >
    .newsinfo-container{
        padding: 0 5px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: gray;
        }
        .subtitle{
            font-size: 12px;
            color: rgb(49, 170, 207);
            display: flex;
            justify-content: space-between;
        }
        .content{
            padding: 5px;
            img{
                width: 100%;
            }
        }
    }
</style>