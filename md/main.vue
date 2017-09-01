<template>
    <div class="flex" @scroll="top($event)">
        <header class="header">
            <div class="commonHeader">
                <div class="back"><router-link :to="{name:'kind'}">分类</router-link></div>
                <div class="title" @click="show()">ENJOY
                    <span class="iconfont" :cityid="cityid">{{chengshi}} &#xe610;</span>
                </div>
                <div class="moreInfo">
                    <span v-if="deng"><router-link to="login">登录</router-link></span>
                    <span v-if="!deng" class="iconfont abc" @click="xiao">&#xe617;
                        <div class="tuichu1" v-show="tian" @click="tui()">退出</div>
                    </span>
                    <span class="iconfont" @click="show11()">&#xe642;</span>
                </div>
            </div>
        <!-- 搜索狂 -->
            <div class="saosuo" v-show="show1">
                <div class="sou1">
                    <input type="text" placeholder="搜索本地精选 / 快递到家" />
                    <span @click="search()">搜索</span>
                    <div class="jiao"></div>
                </div>
            </div>
        </header>
        <img v-if="!dis" class="jiazai" src="tool/img.gif"/>
        <div id="content" v-if="dis">
            <div class="list">
                <div class="list1"  v-for="it in list">
                    <h3>{{it.group_section.title}} </h3>
                    <p>{{it.group_section.desc}}</p>
                    <ul>
                        <li v-for="i in it.tabs" @click="delate(i.enjoy_url)">
                            <img class="lazy" src="tool/img.gif" :data-echo="i.url"/>     
                              <!-- <img :src="i.url"/>   -->
                            <div class="title">{{i.title}}</div>
                            <div class="title2">{{i.desc}} </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="city" v-show="ishow">
                <h1>本地服务开通城市</h1>
                <div class="citys">
                    <span v-for="(i,index) in city">
                           <div v-for="(it,ind) in i"  @click="xuan($event)" :cityid="ind">{{it}}</div>
                    </span>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Vue from "vue";
import VueRouter from "vue-router";
import { Toast } from 'mint-ui';
import "./../scss/main1.scss";
import Ajax from "./../tool/MyAjax";


Vue.use(VueRouter)
    var router=new VueRouter({
   
        }) 
    export default {
        
        data(){
            return {
               ishow:false,
               deng:true,
               show1:false,
               cityid:104,
               list:[],
                num:0,
                city:[{104:"上海"},{140:"北京"},{144:"南京"},{185:"天津"},{216:"广东"},{235:"成都"},
               {260:"杭州"},{299:"深圳"},{347:"苏州"},{362:"西安"},{388:"重庆"},{401:"长沙"}],
               chengshi:"",
               dis:false,
               tian:false
            }
        },
        watch:{
            cityid(new1,old){
                // console.log(new1,old)
                this.list=[];
                 var url1="https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id="+this.cityid+"&page="+this.num;
                   
                   var that=this;
                    Ajax.vueJson(url1,function(data){
                        // console.log(data);
                        that.list=data;
                    
                    },function(err){console.log(err)})
            }
        },
        methods:{
            search(){
                var word=$(".sou1 input").val()
                if(word!=""){
                     router.push({
                        path:"search",
                        query:{
                            query_k:word
                        }
                    })
                }
                   
            },
            tui(){
                this.deng=true;
                localStorage.removeItem("user")
            },
            xiao(){
                console.log("已经登录过了")
              if(!this.tian){
                    this.tian=true;
                    $(".tuichu1").animate({
                        opacity:"1"
                    })
              }else{
                   this.tian=false;
                    $(".tuichu1").animate({
                        opacity:"0"
                    })
              }
               
            },
            delate(data){
                
                var arr=data.split("?")[1]
                console.log(arr);
                router.push({
                    path:"detail",
                    query:{
                        url:arr
                    }
                })
                
            },
            show(){
                if(this.ishow){
                    this.ishow=false;
                }else{
                    this.ishow=true;
                }

            },
             show11(){
                if(this.show1){
                    this.show1=false;
                }else{
                    this.show1=true;
                }

            },
             xuan(event){
                // console.log(event.target.innerText)
                var arr=this.city;
                var cheng=event.target.innerText;
                this.chengshi=cheng;
                // console.log(event.target.getAttribute("cityid"))
                  this.cityid=event.target.getAttribute("cityid");
                localStorage.setItem("city",event.target.getAttribute("cityid"))

               
                    this.ishow=false;
                    console.log(this.cityid,"结束")
              
                    
            },
            top(event){
                // console.log(event.target.scrollTop)
                // console.log(event.target.offsetHeight);
                // console.log(event.target.scrollHeight);
                 echo.init({
                        offset: 0,
                    　　 throttle: 0 ,
                        unload: false,
                        callback: function (element, op) {
                        // console.log(element, 'has been', op + 'ed')
                    }
                    }); 
                var sh=event.target.scrollHeight;
                var h=event.target.offsetHeight;
                var t=event.target.scrollTop;
                var cityid=this.cityid;
                var that=this;
                if(sh==h+t ){
                    console.log("加载");
                    this.num++;
                    // console.log(this.num);
                     var url = "https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id="+cityid+"&page="+this.num;
                        Ajax.vueJson(url,function(data){
                            // console.log(data);
                            for(var itm of data){
                                that.list.push(itm)
                            }
                            
                        },function(err){console.log(err)})
                }
            }

            
            
        },
        computed:{
           
        },
        mounted(){
                if(localStorage.getItem("user")){
                    this.deng=false;
                }else{
                    this.deng=true;
                }
                if(localStorage.getItem("city")){
                    this.cityid=localStorage.getItem("city")
                    var arr=this.city;
                    for(var it of arr){
                        // console.log(it,"aaaa")
                        for(var i in it){
                            
                            if(i==localStorage.getItem("city")){
                                console.log(it[i])
                                this.chengshi=it[i]
                            }
                        }
                    }
                }else{
                    localStorage.setItem("city",this.cityid);
                    var arr=this.city;
                    for(var it of arr){
                        console.log(it,"aaaa")
                        for(var i in it){
                            if(i==localStorage.getItem("city")){
                                 this.chengshi=it[i]
                            }
                        }
                    }
                }
              var cityid=this.cityid;
                var that =this
                var url = "https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id="+cityid+"&page=0";
                Ajax.vueJson(url,function(data){
                    console.log(data);
                    that.list=data
                    that.dis=true;
                },function(err){console.log(err)})
            
        },
        updated(){
            echo.init({
                offset: 0,//离可视区域多少像素的图片可以被加载
            　　 throttle: 0 ,//图片延时多少毫秒加载
                unload: false,
                callback: function (element, op) {
		         console.log(element, 'has been', op + 'ed')
		    }
            }); 
        }
            

    
    }
   
</script>

<style scoped>
    #content{
        display: block;
        background: #fff;
    }
   
    /* .list1 img{ 
　　　　width:90%; 
　　　　height: 200px; 
　　　　background: url("tool/img.gif") 50% no-repeat;
    }  */
     .jiazai{
            position: fixed;
            top:50%;
            left: 50%;
            transform: translate(-30px,-30px);
            
    }
    .abc{
          position: relative;  
    }
    .tuichu1{
        text-align: center;
        position: absolute;
        top:24px;
        color: #000;
        text-shadow: 0 0 0 #000;
        width: 35px;
        opacity: 0;
        
    }

    
</style>
