<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/'+ item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h4>{{ item.title }}</h4>
							<p class="mui-ellipsis">
                                <span>发表时间：{{ item.add_time|dateForm }}</span>
                                <span>点击：{{ item.click }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            newslist:[]//新闻列表
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList(){
            // 获取新闻列表
            this.$http.get("api/getnewslist").then(result=>{
                if (result.body.status===0) {
                    // Toast('获取新闻列表成功')
                    // 如果没有失败，就把数据保存到data上
                    this.newslist = result.body.message;
                } else {
                    Toast('获取新闻列表失败')
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .mui-table-view{
        li{
            .mui-ellipsis{
                font-size: 12px;
                color: rgb(60, 143, 170);
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>