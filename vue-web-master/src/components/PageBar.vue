<template>
	  <div id="pageBar" class="comWidth">
					<ul>
							<li><a href="javascript:;" v-on:click="goPre()"  v-bind:class="{'hide' : current == 1}">上一页</a></li>
							<li class="num-item" v-for="item in pageList"><a href="javascript:;" v-bind:class="{'active' :  item == current}" v-on:click="selectPage(item)"> {{item}}</a></li>
							<li><a href="javascript:;" v-on:click="goNext()"  v-bind:class="{'hide' : current == pageTotal}">下一页</a></li>
					</ul>
		</div>
</template>

<script>
export default {
	  name: 'pageBar',
	  data () {
		    return {
		    		current:1,
						pageList: []
		    }
	  },
	  props:['pageTotal'],
	  mounted:function(){
		  	this.$nextTick(function(){
				 	this.showPage();
				});
	  },
	  methods:{
		  	showPage:function(){
		  		var min = 1 ,
		      		max = parseInt(this.pageTotal);
					this.pageList = [];
					if(this.current < 6){
							max = max > 10 ? 10 : max;
					}else if(this.current >= max - 6 ){
						 	min = max > 10 ? max - 9 : 1; 
					}else{
							min = this.current - 4;
							max = this.current + 5;
					}
					for(var i = min; i < max + 1; i++ ){
							this.pageList.push(i)
					}
		  	},
		  	selectPage:function(item){
					this.current = item;
					this.showPage();
				},
				goPre:function(){
					if ( this.current == 1 ) {
				    return ;
				  }
				  this.current--;
				  this.showPage();
				},
				goNext:function(){
					if ( this.current == this.pageTotal ) {
				    return ;
				  }
				  this.current++;
				  this.showPage();
				}
	  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{margin: 0;padding: 0;}
a{text-decoration:none ;color: #333;}
ul li{list-style: none;padding: 0 10px; height: 30px; line-height: 30px;display: inline-block;}
#pageBar,ul{text-align: center;overflow: hidden;}
#pageBar{margin: 100px 0;}
#pageBar ul li.num-item{width: 15px;}
#pageBar .active{color: #1a89d9;}
#pageBar a:hover{color: #1a89d9;text-decoration:underline ;}
.hide{ cursor: no-drop;color: #333;}
#pageBar .hide:hover{color: #333;text-decoration:none ;}
</style>
