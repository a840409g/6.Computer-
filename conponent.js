// 匯率
// 1. 輸入欄 丟台幣用的
// 	(1) 輸入欄東西用v-model綁住
// 2. 各國匯率 會跟著台幣輸入欄的數字變動
// 	(1) 試著用component來寫出不一樣國家的匯率
// BMI
// const channel1 = Vue.extend({

// })
const BMI = JSON.parse(localStorage.getItem('BMIdata')) || [];
const channel2 = Vue.extend({
	template:
		'<div>'+
			'<ul>'+
			'<input type="text" placeholder="請輸入身高" v-model="hei">'+
			'<input type="text" placeholder="請輸入體重" v-model="wei">'+
			'<input type="button" value="送出" @click="addBMI(hei,wei)">'+
			'</ul>'+
			'<ul>'+
			'<li v-for="(data,id) in person">'+
			'<span class="num">{{id+1}}.</span>'+
			'<span class="hei"> 身高:{{data.hei}} cm</span>'+
			'<span class="wei"> 體重:{{data.wei}} kg</span>'+
			'<span class="BMI"> BMI:{{data.BMI}}</span>'+
			'<span class="time">{{data.time}}</span>'+
			'<a href="#">X</a>'+
			'</li>'+
			'</ul>'+
		'</div>',
		data(){
			return{
				person: BMI,
				hei: "",
				wei: "",
			}
		},
		methods:{
			addBMI: function(a,b){
				let weiBmi = parseInt(b);
				let heiBmi = parseFloat((a/100).toFixed(2));
				let BMIfor = parseFloat(((weiBmi)/(heiBmi*heiBmi)).toFixed(0));
				let date = new Date();
		    	let now = date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate();
				this.person.push({hei: a,wei: b,BMI: BMIfor,time: now});
				localStorage.setItem('BMIdata',JSON.stringify(BMI));
				this.hei = "";
				this.wei = "";
				console.log(this.person);
		    },
		}
})
const channel1 = Vue.extend({
	template: 
	'<div>'+
		'<input type="text" placeholder="請輸入台幣..." v-model="NT" class="channel">'+
		'<ul>'+
		'<li class="reg" v-for="reg in regions">{{reg.region}}:'+
		'<span class="rate">{{NT/reg.rate}}</span>'+
		'<span class="unit">元</span>'+
		'</li>'+
		'</ul>'+
	'</div>',
	data(){
		return {
			regions:[
				{														
					region:"US",
					rate:31.165
				},
				{
					region:"JP",
					rate:0.2811
				},
				{
					region:"HK",
					rate:3.985
				},
				{
					region:"EU",
					rate:35.3
				},
				{
					region:"KR",
					rate:0.02952
				},
			],
			NT: "",
		}
	}
});
const main = new Vue({
	el:"#main",
	data:{
		currentView: "channel1",
	},
	methods:{

	},
	components:{
		channel1,
		channel2
	}
})

