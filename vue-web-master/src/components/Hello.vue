<template>
	<div class="hello">
		<div class="areaBar">
			<select name="" class="province_now input-brd" @change="provinceChange">
				<option>省/市</option>
				<option v-for="item in province_now" :value="item.code">{{item.name}}</option>
			</select>
			<select name="" class="city_now input-brd" v-on:change="cityChange">
				<option>市/区</option>
				<option v-for="item in city_now" :value="item.code">{{item.name}}</option>
			</select>
			<select name="" class="county_now input-brd" v-if="showCounty">
				<option>区/县</option>
				<option v-for="item in county_now">{{item.name}}</option>
			</select>
		</div>
                <input type="button" id="verifyBtn" value="获取验证码" onclick="getVerifyCode(this)">
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				province_now: [],
				city_now: [],
				county_now: [],
				data: {},
				provinceId: 0,
				cityId: 0,
				showCounty: true,
                                nums:6
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.showArea();
			});
		},
		methods: {
                        getVerifyCode:function (btn){
			    btn.setAttribute("disabled",true);
			    btn.value = "还剩" + this.nums + "秒";
			    var timmer = setInterval(function(){
				if(nums > 0){
					nums --;
					btn.value = "还剩" + this.nums + "秒";
				}else{
					clearInterval(timmer);
					btn.removeAttribute("disabled");
					btn.value = '获取验证码';
					this.nums = 6;
				}
			    },1000)
		        },
			showArea: function() {
				this.province_now = [];
				this.$http.get('static/mockup/adc-tree.json').then(function(res) {
					this.data = res.data;
					for(var key in this.data) {
						this.province_now.push(this.data[key]);
					}
				})
			},
			provinceChange: function(e) {
				var twoCitys = ['110000','120000', '310000','500000','710000','810000','820000'];
				this.city_now = [];
				this.provinceId = e.target.value;
				if(twoCitys.indexOf(this.provinceId) > -1){
					this.showCounty = false;
				}else{
					this.showCounty = true;
				}
				var citys = this.data[this.provinceId].children;
				for(var key in citys) {
					this.city_now.push(citys[key]);
				}
			},
			cityChange: function(e) {
				this.county_now = [];
				this.cityId = e.target.value;
				var cityObj = this.data[this.provinceId].children[this.cityId];

				if(cityObj.children !== undefined) {
					this.showCounty = true;
					var countys = cityObj.children;
					for(var key in countys) {
						this.county_now.push(countys[key]);
					}
				}
			}

			/*getCookie: function(c_name) {
				if(document.cookie.length > 0) {
					c_start = document.cookie.indexOf(c_name + "=")
					if(c_start != -1) {
						c_start = c_start + c_name.length + 1
						c_end = document.cookie.indexOf(";", c_start)
						if(c_end == -1) c_end = document.cookie.length
						return unescape(document.cookie.substring(c_start, c_end))
					}
				}
				return ""
			},

			setCookie: function(c_name, value, expiredays) {
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + expiredays);
				document.cookie = c_name + "=" + escape(value) +
					((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
			},

			checkCookie: function() {
				username = getCookie('username')
				if(username != "") {
					alert('Welcome again ' + username + '!')
				} else {
					username = prompt('Please enter your name:', "")
					if(username != "") {
						setCookie('username', username, 365)
					}
				}
			}*/
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		padding: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	.areaBar {
		line-height: 30px;
		text-align: center;
	}
	
	.input-brd {
		display: inline-block;
		width: 150px;
		height: 30px;
		margin: 10px 10px;
		border-radius: 5px;
	}
</style>
