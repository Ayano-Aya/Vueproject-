<template>
    <div class="app-container">
        <!-- header区域 -->
        <mt-header fixed title="Vue项目练习"></mt-header>
        <!-- 路由 router-view区域 -->
		<transition>
        	<router-view></router-view>		
		</transition>
        <!-- 底部 tabbar区域 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-x" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-x" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-x" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-x" to="search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
    
</template>
<script>

</script>
<style scoped>
.app-container{
    padding-top: 40px;
	overflow-x: hidden;
	padding-bottom: 50px;
}
.v-enter{
opacity: 0;
transform: translateX(100%);
}
.v-leave-to{
opacity: 0;
transform: translateX(-100%);
position: absolute;
}
.v-enter-active,
.v-leave-active{
transition: all 0.5s ease;
}
/* 解决引入mui.js文件的顶部滑动条之后，下部菜单失灵的问题 */
.mui-bar-tab .mui-tab-item-x .mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-x {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-x .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-x .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mint-header{
    z-index: 99;
}
</style>
