<template>
	<transition name="fade">
		<div id="newsList" class="comWidth">
			<div class="news-ceils grid-content">
				<dl class="news-ceil" v-for="item in newsList">
					<dt><img :src="item.imageurl" ></dt>
					<dd>
						<div class="news-abstract">
							<a :href="item.alink" target="_blank">
								{{item.atitle}}
							</a>
							<div class="news-brief">
								摘要：{{item.asource}}
							</div>
						</div>
						<cite>来源：{{item.acite}}</cite>
					</dd>
				</dl>
			</div>
			<div id="pageBar" class="comWidth">
				<ul>
					<li>
						<a href="javascript:;" v-on:click="goPre()" v-bind:class="{'hide' : current == 1}">上一页</a>
					</li>
					<li class="num-item" v-for="item in pageList">
						<a href="javascript:;" v-bind:class="{'active' :  item == current}" v-on:click="selectPage(item)"> {{item}}</a>
					</li>
					<li>
						<a href="javascript:;" v-on:click="goNext()" v-bind:class="{'hide' : current == pageTotal}">下一页</a>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script>
	import PageBar from './PageBar';
	export default {
		name: 'newsList',
		data() {
			return {
				pageTotal: 0, //总的页数
				showItems: 3, //展示新闻条数
				current: 1, //当前页数
				newsList: [], //当前展示数据
				totalList: [], //获取所有数据
				pageList: [] //分页内容
			}
		},
		components: {
			pageBar: PageBar
		},
		mounted: function() {
			this.$nextTick(function() {
				this.load();
			});
		},
		methods: {
			load: function() {
				var _this = this;
				this.$http.get('static/mockup/newsList.json').then(function(res) {
					_this.totalList = res.body.result.list;
					_this.pageTotal = Math.ceil(_this.totalList.length / _this.showItems)
					_this.showPage();
					_this.getData();
				})
			},
			getData: function() {
				this.newsList = this.totalList.slice((this.current - 1) * this.showItems, this.current * this.showItems)
			},
			//显示分页
			showPage: function() {
				var min = 1,
					max = this.pageTotal;
				this.pageList = [];
				if(this.current < 6) {
					max = max > 10 ? 10 : max;
				} else if(this.current >= max - 6) {
					min = max > 10 ? max - 9 : 1;
				} else {
					min = this.current - 4;
					max = this.current + 5;
				}
				for(var i = min; i < max + 1; i++) {
					this.pageList.push(i)
				}
			},
			selectPage: function(item) {
				this.current = item;
				this.showPage();
				this.getData();
			},
			goPre: function() {
				if(this.current == 1) {
					return;
				}
				this.current--;
				this.showPage();
				this.getData();
			},
			goNext: function() {
				if(this.current == this.pageTotal) {
					return;
				}
				this.current++;
				this.showPage();
				this.getData();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	a {
		text-decoration: none;
		color: #333;
	}
	
	ul li {
		list-style: none;
		padding: 0 10px;
		height: 30px;
		line-height: 30px;
		display: inline-block;
	}
	
	#pageBar,
	ul {
		text-align: center;
		overflow: hidden;
	}
	
	#pageBar {
		margin: 100px 0;
	}
	
	#pageBar ul li.num-item {
		width: 15px;
	}
	
	#pageBar .active {
		color: #1a89d9;
	}
	
	#pageBar a:hover {
		color: #1a89d9;
		text-decoration: underline;
	}
	
	.hide {
		cursor: no-drop;
		color: #333;
	}
	
	#pageBar .hide:hover {
		color: #333;
		text-decoration: none;
	}
	
	.comWidth {
		width: 1000px;
		margin: auto;
	}
	
	.news-ceil {
		border-bottom: 1px solid #d9d9d9;
		padding: 15px 0;
		overflow: hidden;
		text-align: left;
	}
	
	.news-ceil:hover {
		background: #f2f2f2;
	}
	
	.news-ceil dt {
		width: 204px;
		height: 150px;
		float: left;
	}
	
	.news-ceil dt img {
		width: 100%;
		height: 100%;
		border: 1px solid #d9d9d9;
	}
	
	.news-ceil dd {
		width: 740px;
		float: right;
	}
	
	.news-ceil dd .news-abstract {
		height: 136px;
		overflow: hidden;
	}
	
	.news-ceil dd .news-abstract a {
		font-size: 20px;
		line-height: 36px;
		font-weight: 500;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.news-ceil dd .news-abstract a:hover {
		color: #1a89d9;
	}
	
	.news-ceil dd .news-abstract .news-brief {
		color: #656565;
	}
	
	.news-ceil dd cite {
		font-style: normal;
		font-size: 12px;
		line-height: 12px;
		color: #999999;
	}
</style>