<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size=large @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time|dateForm}}
                </div>
                <div class="cmt-body">
                    <!-- 世间草木都美，人不是 -->
                    {{item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>   
    </div>
</template>
<script>
import {    Toast} from 'mint-ui'
export default {
    data() {
        return {
          pageIndex:1,   //默认展示第一页数据
          comments:[],   //所有的评论数据  
          msg:'',   //评论输入的内容
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments(){
            //获取评论
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(
                result=>{
                    if (result.body.status===0) {
                        // this.comments = result.body.message;
                        // 每当获取新的评论数据的时候，不要把旧数据清空覆盖，而是应该以旧数据拼接上新数据
                        this.comments =this.comments.concat(result.body.message) ;

                        // Toast("获取评论成功")

                    } else {
                        Toast("获取评论失败")
                    }
                }
            )
        },
        getMore(){
            //加载更多
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            // 校验是否评论为空
            if (this.msg.trim().length===0) {
                return Toast("请输入评论内容")
            }

            // 发表评论
            // 参数1：请求url的地址
            // 参数2：提交给服务器的数据对象  {content：this.msg}
            // 参数3：定期提交时候，表单中数据的格式    {emulateJSON：true}
            this.$http.post('api/postcomment/'+this.id,{
                content:this.msg.trim()
            }).then(function (result) {
                if (result.body.status===0) {
                    // 拼接处一个评论对象
                    var cmt = {
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.mag=""
                }
            })
        }
    },
    props:["id"],
}
</script>
<style lang="scss" spcoed>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list{
            .cmt-item{
                .cmt-title{
                    margin: 5px 0px;

                    font-size: 12px;
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cmt-body{
                    font-size: 13px;
                    line-height: 35px;
                    text-indent: 2em;                    
                }
            }
        }
    }
</style>