<template>

    <div class="flex">
        <header class="header">

            <div class="commonHeader">
                <div class="back"><router-link :to="{name:'home'}">首页</router-link></div>
                <div class="title">ENJOY
                    <span class="iconfont" :cityid="cityid">{{chengshi}} &#xe610;</span>
                </div>
                <div class="moreInfo">
                    <span>登录</span>
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
            <div id="discontent" v-if="dis">
                 <div class="jin">
                     <h1>{{list[0].data.group_section.title}} </h1>
                    <div class="des">{{list[0].data.group_section.desc}}</div> 
                </div>  
                <div class="disbanner">
                    <div class="swiper-container" id="disbanner1">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(it,index) in list[0].data.tabs" :key="index">
                                <img :src="it.url"/>
                                <div class="red">{{it.tag}} </div>
                                <h4>{{it.title}} </h4>
                                <div class="detail">{{it.desc}} </div>
                            </div>
                           
                        </div>
                        <div class="swiper-pagination" id="dispint"></div>
                    </div>
                </div>
                <div class="riben">
                    <div class="swiper-container" id="riben1">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide dong" v-for="(it,index) in list[1].data.tabs" :key="index" >
                                <div class="ri " @click="dislist(it.enjoy_url)">
                                    <p>
                                        {{it.title}}<br/>
                                        {{it.desc}}
                                    </p>
                                </div>
                            </div>
                           
                        </div>           
                    </div>
                </div>
                <div class="more" v-for="(i ,index) in list" :key="index" v-if="index > 1">
                  
                        <div class="more1">
                            <div class="left">
                                <h5>{{i.data.group_section.title}} </h5>
                                <div class="doc">{{i.data.group_section.desc}}  </div>
                            </div>
                            <div class="right" @click="dislist(i.data.group_section.enjoy_url)">{{i.data.group_section.enjoy_url_text}}</div>
                        </div>
                        <div class="imgs">
                            <img v-for="(its,ind) in i.data.tabs" :key="ind" :src="its.url"  @click="delate(its.enjoy_url)"  />
                        </div>
                   
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
import "./../scss/dis.scss";
import Ajax from "./../tool/MyAjax";
Vue.use(VueRouter)
    var router=new VueRouter({
   
        }) 
    export default {
        
        data(){
            return {
               show1:false,
               cityid:104,
               list:[],
                num:0,
                city:[{104:"上海"},{140:"北京"},{144:"南京"},{185:"天津"},{216:"广东"},{235:"成都"},
               {260:"杭州"},{299:"深圳"},{347:"苏州"},{362:"西安"},{388:"重庆"},{401:"长沙"}],
               chengshi:"",
               xuan1:[],
               dis:false
              
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
            dislist(data){
                console.log(data)
                var arr=data.split("?")[1]
                console.log(arr);
                router.push({
                    path:"dislist",
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
            console.log(111)
            var swiper = new Swiper('#disbanner1', {
                pagination: '#dispint',
                slidesPerView: 'auto',
                centeredSlides: true,
                paginationClickable: true,        
                paginationType : 'fraction'
            })
             var swiper = new Swiper('#riben1', {       
                slidesPerView: 'auto',
                paginationClickable: true,
                slidesPerView: 2,
               spaceBetween: 20
               
            })
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
              var cityid=this.cityid;
              console.log(this.$route)
             
                var that =this
                var url="https://api.ricebook.com/hub/home/v1/web/explore.json?city_id="+cityid
                Ajax.vueJson(url,function(data){
                    console.log(data);
                    that.list=data;
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
