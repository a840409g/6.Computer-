// 匯率
// 1. 輸入欄 丟台幣用的
// 	(1) 輸入欄東西用v-model綁住
// 2. 各國匯率 會跟著台幣輸入欄的數字變動
// 	(1) 試著用component來寫出不一樣國家的匯率
// BMI

const BMI = JSON.parse(localStorage.getItem('BMIdata')) || [];
const list = JSON.parse(localStorage.getItem('todolist')) || [];
const channel1 = Vue.extend({
	template:
		'<div id="todo">'+
			'<input class="addClass" type="text" placeholder="請輸入代辦事項..." @keyup.enter="add(newone)" v-model="newone">'+
			'<div class="stateClass">'+
		      '<label for="allDone">'+
		        '<input type="radio" name="" id="allDone" @click="all()">'+
		        '全部完成'+
		      '</label>'+
		      '<label for="all">'+
		        '<input type="radio" name="" id="all" value="0" v-model="Condition">'+
		        '顯示全部'+
		      '</label>'+
		      '<label for="done">'+
		        '<input type="radio" name="" id="done" value="1" v-model="Condition">'+
		        '顯示完成'+
		      '</label>'+
		      '<label for="notYet">'+
		         '<input type="radio" name="" id="notYet" value="2" v-model="Condition">'+
		        '顯示未完成'+
		      '</label>'+
			'</div>'+
		    '<ul>'+
		      '<li class="todoClass" v-for="(todo,id) in todos" v-if="Condition == 0||(Condition == 1 && todo.completed == true)||(Condition == 2 && todo.completed == false)">'+
		        '<input class="checkClass" type="checkbox" v-model="todo.completed">'+
		        '<span>{{id+1}}</span>.'+
		        '<span>{{todo.content}}</span>'+
		        '<span class="time">{{todo.time}}</span>'+
		        '<a class="dlt" href="" @click.prevent="remove(todo)">X</a>'+
		      '</li>'+
		    '</ul>'+
		    // '<pre>'+
		      // '{{this.todos}}'+
		    // '</pre>'+
	  	'</div>',
	props:{
		todos: Array,
		newTodo: null,
		// null代表檢查類型
		condition: Number,
		// add: Function,
		remove: Function,
		all: Function
  	},
	data(){
		return{
			newone: this.newTodo,
			Condition: this.condition
			// 若母組件的值會被更動時會跳警告,因此要在子組件將值重新定義起來才能避免
		}
	},
	methods:{
	    add: function(todo){
	      let date = new Date();
    	  let now = date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate();
	      this.todos.push({content: todo, time: now,completed:false});
	      localStorage.setItem('todolist',JSON.stringify(list));
	      this.newone='';
	    },
	}
})
const channel2 = Vue.extend({
	template: 
	'<div>'+
		// '<input type="button" @click="testProp">'+
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
	},
	// props:{
	// 	testProp:{
	// 		type: Object
	// 	}
	// }
});
const channel3 = Vue.extend({
	template:
		'<div>'+
			'<ul>'+
			'<input type="text" placeholder="請輸入身高" v-model="hei">'+
			'<input type="text" placeholder="請輸入體重" v-model="wei">'+
			'<input type="button" value="送出" @click="addBMI(hei,wei)">'+
			// '<input type="button" @click="count()">'+
			'</ul>'+
			'<ul>'+
			'<li v-for="(data,id) in person">'+
			'<span class="num">{{id+1}}.</span>'+
			'<span class="hei"> 身高:{{data.hei}} cm</span>'+
			'<span class="wei"> 體重:{{data.wei}} kg</span>'+
			'<span class="BMI"> BMI:{{data.BMI}}</span>'+
			'<span class="time">{{data.time}}</span>'+
			'<a href="#" @click.prevent="removeBMI(data)">X</a>'+
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
		      removeBMI: function(data){
				this.person.splice(this.person.indexOf(data),1);
				localStorage.setItem('BMIdata',JSON.stringify(BMI));
	    	},
	    	test(){
	    		this.num++
	    		console.log(this.num)
	    	}
	    },
	    props:{
	    	count:{
	    		type: Function
	    	},
	    	number: Number
	    }
});

const main = new Vue({
	el:"#main",
	data:{
		currentView: "channel1",
		num: 0,
		todos: list,
	    newTodo: '',
	    newone: 222,
	    condition: 0
	},
	components:{
		channel1,
		channel2,
		channel3
	},
	methods:{
	    test: function(){
	    	console.log("worked!");
	    	console.log(typeof(this.removeBMI))
	    },
	    count(){
	    	this.num++;
	    	console.log(this.num)
	    },
	    removeTodo: function(todo){
	      this.todos.splice(this.todos.indexOf(todo),1);
	      localStorage.setItem('todolist',JSON.stringify(list));
	    },
	    // dltDone: function(){
	    //   this.todos.splice(this.todos.indexOf(),this.todos.length);
	    //   localStorage.setItem('todolist',JSON.stringify(list));
	    // },
	    allDone: function(){
	      for(let i=0;i<this.todos.length;i++){
	        this.todos[i].completed = true;
	        // 用迴圈將completed狀態改成ture
	      }
	      localStorage.setItem('todolist',JSON.stringify(list));
	    }
	    // 用props將資料傳給子組件channel1
	}
})
