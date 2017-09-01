<template>
    <div class="flex">
        <header class="header">
            <div class="commonHeader">
                <div class="back"><router-link :to="{name:'home'}">首页</router-link></div>
                <div class="title">ENJOY
                    <span class="iconfont" :cityid="cityid">{{chengshi}} &#xe610;</span>
                </div>
                <div class="moreInfo">
                    <span><router-link to="login">登录</router-link></span>
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
        <div id="content">
             <img v-if="!dis" class="jiazai" src="tool/img.gif"/>
            <div class="discontent" v-if="dis">
                <div class="tou">
                    <img  :src="list.list[0].data.url"/>
                    <div class="wen">
                        <div class="block">{{list.group_section.title}}</div>
                        <br/>{{list.group_section.desc}}
                    </div>
                </div>
                <div class="tou1">
                    <span class="hes" v-for="(i,index) in list.columns" :key="index" @click="bian(i.alias,index)">
                        {{i.text}}
                    </span>
                </div>
                <div v-for="(it,index) in list.list" :key="index" @click="delate(it.data.enjoy_url)">
                    <div class="dlist" >
                        <div class="left">
                            <div class="title">{{it.data.title}} </div>
                            <div class="detail">{{it.data.desc}} </div>
                            <div class="zi">
                                <span> {{it.data.price}}</span>
                                <span> {{it.data.original_price}}</span>
                            </div>
                        </div>
                        <div class="right">
                            <img :src="it.data.url" >
                        </div>
                    </div>
                    <div class="as" v-if="it.data">
                        <span v-for="(is,ind) in it.data.ext.display_prop" :key="ind">
                            {{is.name}}
                        </span>
                    </div>
                    <div class="xian"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Vue from "vue";
import VueRouter from "vue-router";
import { Toast } from 'mint-ui';
import "./../scss/main.scss";
import "./../scss/dislist.scss";
import Ajax from "./../tool/MyAjax";
Vue.use(VueRouter)
    var router=new VueRouter({
   
        }) 
    export default {
        
        data(){
            return {
               show1:false,
               cityid:104,
               list:{},
                num:0,
                city:[{104:"上海"},{140:"北京"},{144:"南京"},{185:"天津"},{216:"广东"},{235:"成都"},
               {260:"杭州"},{299:"深圳"},{347:"苏州"},{362:"西安"},{388:"重庆"},{401:"长沙"}],
               chengshi:"",
               xuan1:[],
               dis:false,
               choice:"choice"
              
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
            bian(data,as){
                console.log(data,as);
                $(".hes").eq(as).css({
                    color:"#000"
                }).siblings().css({
                    color:"#bbb"
                })
                this.list=[]
                var word=this.$route.query.url.split("&")[2]
                var that=this;
                this.choice=data
                var url="https://api.ricebook.com/hub/home/v1/web/category_detail.json?city_id="
                +this.cityid+"&"+word+"&type="+this.choice+"&page=0";
                console.log(url)
                Ajax.vueJson(url,function(data){
                    console.log(data);
                   that.list=data
                    that.dis=true;
                },function(err){console.log(err)});

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
           
             show11(){
                if(this.show1){
                    this.show1=false;
                }else{
                    this.show1=true;
                }

            }
        
           
        },
        updated(){
        },
        mounted(){
           
             
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
              
              console.log(this.$route.query.url)
             var word=this.$route.query.url.split("&")[2]
             console.log(word)
                var that =this
                var url="https://api.ricebook.com/hub/home/v1/web/category_detail.json?city_id="
                +this.cityid+"&"+word+"&type="+this.choice+"&page=0";
                console.log(url)
                Ajax.vueJson(url,function(data){
                    console.log(data);
                   that.list=data
                    that.dis=true;
                },function(err){console.log(err)});
                
        }
            

    
    }
   
</script>

<style scoped>
    #content{
        display: block;
        background: #fff;
    }
    #content .jiazai{
            position: fixed;
            top:50%;
            left: 50%;
            transform: translate(-30px,-30px);
            
    }
    
</style>
