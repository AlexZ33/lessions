<template>
	<div class="calendar">
		<div class="plan-row">
			<span @click="pre()" class="curPointer"> < </span>
			<span> {{currentYear}}-{{currentMonth}}-{{currentDay}} </span>
			<span @click="next()" class="curPointer"> > </span>
		</div>
		<div class="date-box">
			<ul class="date-title">
				<li>日</li>
				<li>一</li>
				<li>二</li>
				<li>三</li>
				<li>四</li>
				<li>五</li>
				<li>六</li>
			</ul>
			<ul class="date-list">
				<li v-for="item in preList" @click="choose(currentMonth-1,item)">{{item}}</li>
				<li v-for="item in currentList" @click="choose(currentMonth,item)" :class="{'blue' : item == currentDay}">{{item}}</li>
				<li v-for="item in nextList" @click="choose(currentMonth+1,item)">{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'calendar',
		data() {
			return {
				currentYear: 1900,
				currentMonth: 1,
				currentDay: 1,
				preList: [],
				nextList: [],
				currentList: []
			}
		},
		mounted: function() {
			this.initPage();
		},
		methods: {
			initPage: function() {
				var date = new Date();
				this.currentYear = date.getFullYear(); //当前年份
				this.currentMonth = date.getMonth() + 1; //当前月份
				this.currentDay = date.getDate(); //当前日期
				this.showPage();
			},
			showPage: function() {
				this.preList = [];
				this.nextList = [];
				this.currentList = [];

				var curMonDays = this.getMonDays(this.currentYear, this.currentMonth)
				for(var i = 1; i < curMonDays + 1; i++) {
					this.currentList.push(i)
				}

				var preMonDays = this.getMonDays(this.currentYear, this.currentMonth - 1);
				var firstDayWeekRange = this.getDayWeekRange(this.currentYear, this.currentMonth - 1, 1);

				var preStartDay = preMonDays - firstDayWeekRange;
				if(7 !== firstDayWeekRange) {
					for(var j = preStartDay + 1; j < preMonDays + 1; j++) {
						this.preList.push(j)
					}
				}
				var lastDayWeekRange = this.getDayWeekRange(this.currentYear, this.currentMonth - 1, curMonDays);
				if(6 !== lastDayWeekRange) {
					for(var r = 1; r < 7 - lastDayWeekRange; r++) {
						this.nextList.push(r)
					}
				}
			},
			pre: function() {
				if(1 == this.currentMonth) {
					this.currentMonth = 12;
					this.currentYear -= 1
				} else {
					this.currentMonth--;
				}
				this.showPage()
			},
			next: function() {
				if(12 == this.currentMonth) {
					this.currentMonth = 1;
					this.currentYear += 1;
				} else {
					this.currentMonth++;
				}
				this.showPage();
			},
			choose: function(month, day) {
				this.currentMonth = month;
				this.currentDay = day;
				this.showPage();
			},
			/**
			 * 格式化：年-月-日
			 * @param {String} year
			 * @param {String} month
			 * @param {String} day
			 */
			formatDate: function(year, month, day) {
				var y = year;
				var m = month;
				if(m < 10) m = "0" + m;
				var d = day;
				if(d < 10) d = "0" + d;
				return y + "-" + m + "-" + d;
			},
			/**
			 * 获取月份的天数
			 * @param {String} year
			 * @param {String} month
			 */
			getMonDays: function(year, month) {
				var dateObj = new Date(year, month, 0);
				return dateObj.getDate();
			},
			/**
			 * 获取日期的星期
			 * @param {String} year
			 * @param {String} month
			 * @param {String} day
			 */
			getDayWeekRange: function(year, month, day) {
				var dateObj = new Date(year, month, day);
				return dateObj.getDay();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.calendar {
		margin: auto;
		width: 280px;
		border: 1px solid #e7e7e7;
		border-radius: 5px;
		box-shadow: 2px 2px 8px #999;
		padding: 20px;
		line-height: 26px;
	}
	
	.curPointer {
		cursor: pointer;
		padding: 0 10px;
	}
	
	.plan-row {
		line-height: 32px;
		justify-content: space-between;
		display: flex;
		-webkit-box-pack: justify;
		padding: 0 10px;
	}
	
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		width: 280px;
		overflow: hidden;
	}
	
	.date-list li {
		cursor: pointer;
	}
	
	li {
		float: left;
		width: 20px;
		padding: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	.blue {
		color: #fff;
		background: #1a89d9;
		border-radius: 20px;
	}
</style>