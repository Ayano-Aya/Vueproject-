<template>
    <div>
        <!-- 顶部滑动条区域 -->
		<!-- 导入相关js文件之后 在浏览器中 顶部导航依旧无法滑动 去除严格模式之后也无法滑动 -->
		<!-- 暂时不知道问题出在哪里，将mui.js的相关文件注释掉，之后在研究 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicatorcode mui-segmented-control mui-segmented-control-inverted" data-scroll="1">
					<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
						<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
		</div>
		<!-- 图片列表区域 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{item.title}}</h1>
					<div class="info-body">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
    </div>
</template>
<script>
import { Toast} from 'mint-ui'
import mui from '../../css/lib/mui/js/mui.js'
// mui.init()
// mui('.mui-scroll-wrapper').scroll({
//     deceleration:0.0005
// })

export default {
    data() {
        return {
			cates:[],	//所有分类的列表数组
			list:[],	//图片列表的数组
        }
	},
	created() {
		this.getAllCategory();
		// 默认进入页面，就主动请求 所有图片列表的 数据
		this.getPhotoListByCateId(0)
	},
    methods: {
        getAllCategory(){
			// 获取所有的图片分类
			this.$http.get("api/getimgcategory").then(result=>{
				if (result.body.status===0) {
					// 手动拼接处一个最完整的分类列表
					result.body.message.unshift({title:"全部",id:0});
					this.cates=result.body.message;
				}
				else
				{
					Toast("获取数据失败")
				}
			})
		},
		getPhotoListByCateId(cateId){
			// 根据 分类 ID 获取图片列表
			this.$http.get("api/getimages/"+cateId).then(result=>{
				if (result.body.status===0) {
					this.list=result.body.message;
				} else {
					Toast("获取图片失败")
				}
			})
		}
	},
	mounted() {
		// 如果要操作元素， 最好在mounted里面，  因为这时候的 DOM元素 是最新的
	   // 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
	   mui.init()
       this.mui('.mui-scroll-wrapper').scroll({
         deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
       });
   }
}
</script>
<style lang="scss" scoped>
  * { touch-action: none; }  
 
  .photo-list{
	  margin: 0;
	  padding: 10px;
	  padding-bottom: 0px;
	  li{
		  background-color: #ccc;
		  list-style: none;
		  text-align: center;
		  margin-bottom: 10px;
		  box-shadow: 0 0 9px #999;
		  position: relative;
		img{
				width: 100%;
				vertical-align: middle;
		}

		img[lazy="loading"]{
				width: 40px;
				height: 300px;
				margin: auto;
			}
	  	}
		.info{
			color: white;
			text-align: left;
			position: absolute;
			bottom: 0;
			background-color: rgba($color: #000000, $alpha: 0.4);
			max-height: 85px;
			padding-left: 5px;
			.info-title{
				font-size: 14px;
			}
			.info-body{
				font-size: 12px;
			}
		}
  }
</style>