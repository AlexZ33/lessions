<template>
	<div id="cartBar" class="comWidth">
		<ul>
			<li v-for="item in productList" class="claerFix">
				<div class="pull-left">
					<input type="checkbox" name="" id="" :value="item.productName" v-model="item.checked" @click="changeChecked(item)" />
					<!--<a href="javascrtipt:;" class="checkox" :class="{'check':item.checked}"  ></a>-->
				</div>
				<div class="pull-left">
					{{item.productId}}
				</div>
				<div class="imgage-bar pull-left">
					<img :src="item.productImage" alt="" />
					<p>赠品：<span v-for="part in item.parts">{{part.partName}}、</span></p>
				</div>
				<div class="money pull-left">
					{{item.productPice}}
				</div>
				<div class="pull-left">
					<a href="javascript:;" @click="changeMoney(item,-1)">-</a>
					<input type="text" name="" id="" value="0" v-model="item.productNum" />
					<!--v-model="item.productNum"-->
					<a href="javascript:;" @click="changeMoney(item,1)">+</a>
				</div>
				<div class="total-money pull-left">
					{{item.productPice*item.productNum}}
				</div>
				<div class="pull-right">
					<a href="javascript:;" v-on:click="deleteProduct(item)">
						<font color="grey">删除</font>
					</a>
				</div>
			</li>
		</ul>
		<div class="text-right">
			<div class="pull-left">
				<input type="checkbox" name="" id="" v-model="checkAllFlag" value="" @click="checkAll()" />
			</div>
			<span class="pull-left">{{checkAllFlag?'全不选':'全选'}} </span>
			<div class="pull-right">
				总金额：
				<font color="red">{{totalMoney | formatMoney}}</font>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import vueResource from 'vue-resource';
	Vue.use(vueResource);

	export default {
		name: 'cartBar',
		data() {
			return {
				totalMoney: 0,
				productList: [],
				checkAllFlag: false
			}
		},
		filters: {
			formatMoney: value => '￥ ' + value.toFixed(2)
		},
		mounted: function() {
			this.$nextTick(function() {
				this.cartView()
			});
		},
		methods: {
			cartView: function() {
				var _this = this;
				this.$http.get('static/mockup/cartData.json').then(function(res) {
					_this.productList = res.body.result.list;
					this.calcTotalPrice();
				})
			},
			changeMoney: function(product, value) {
				if(value > 0) {
					product.productNum++;
				} else if(value < 0) {
					product.productNum--;
					if(product.productNum < 1) {
						product.productNum = 1;
					}
				}
				this.calcTotalPrice();
			},
			changeChecked: function(product) {
				if(product.checked) {
					product.checked = true
				} else {
					product.checked = false
				}
				var _this = this;
				this.checkAllFlag = true;
				this.productList.forEach(function(value, index) {
					if(value.checked !== true) {
						_this.checkAllFlag = false;
					}
				});
				this.calcTotalPrice();
			},
			checkAll: function() {
				if(this.checkAllFlag) {
					this.checkAllFlag = true
				} else {
					this.checkAllFlag = false
				}
				if(this.checkAllFlag) {
					this.productList.forEach(function(value, index) {
						value.checked = true;
					});
				} else {
					this.productList.forEach(function(value, index) {
						value.checked = false;
					});
				}
				this.calcTotalPrice();
			},
			calcTotalPrice: function() {
				this.totalMoney = 0;
				var _this = this;
				this.productList.forEach(function(item, index) {
					if(item.checked) {
						_this.totalMoney += item.productNum * item.productPice;
					}
				})
			},
			deleteProduct: function(item) {
				if(confirm('是否删除该商品？')) {
					var index = this.productList.indexOf(item);
					this.productList.splice(index, 1);
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	ul li {
		margin: 20px 0;
	}
	
	.pull-left {
		float: left;
	}
	
	.text-right {
		text-align: right;
	}
	
	.claerFix {
		overflow: hidden;
	}
	
	.wd200 {
		width: 200px;
	}
	
	.comWidth {
		width: 1000px;
		margin: auto;
	}
	
	input[type='text'] {
		height: 28px;
		line-height: 28px;
		padding: 0 10px;
		display: inline-block;
		width: 50px;
		text-align: center;
	}
	
	#cartBar .pull-left {
		margin-left: 30px;
	}
	
	#cartBar div img {
		width: 100px;
		height: 100px;
		border: 1px solid #999;
	}
	
	.imgage-bar {
		width: 200px;
	}
	
	#cartBar {
		line-height: 30px;
	}
	
	#cartBar p {
		line-height: 18px;
	}
	
	.text-hide {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.checkox {
		width: 15px;
		height: 15px;
		background: #999;
		display: block;
	}
	
	.check {
		background: #f00;
	}
	
	.total-money,
	.money {
		width: 50px;
	}
	
	font:hover {
		color: red;
	}
</style>