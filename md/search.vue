<template>
    <div class="flex" @scroll="top($event)">
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
                    <span>搜索</span>
                    <div class="jiao"></div>
                </div>
            </div>
        </header>
        <img v-if="!dis" class="jiazai" src="tool/img.gif"/>
        <div class="searchcontent"  v-if="dis">
            <ul class="shang">
                <li @click="change($event)" class="ben">本地服务</li>
                <li @click="change($event)" class="quan">全国送</li>
            </ul>
            <div class="geng">根据您的关键词{{word}}为您推荐以下商品</div>
            <div class="list2" v-for=" it in list" @click="delate(it.enjoy_url)">
                <div class="img"><img :src="it.product_image"/></div>
                <div class="fe">
                    <p>{{it.name}} </p>
                    <div class="red">{{it.price/100}}元/份<span v-if="it.original_price">￥{{it.original_price/100}}</span></div>
                </div>
              </div>
        </div>
    </div>
</template>


<script>
import "./../scss/search.scss";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
var router=new VueRouter({

})
import Ajax from "./../tool/MyAjax";
    export default {
        data(){
            return {
                 city:[{104:"上海"},{140:"北京"},{144:"南京"},{185:"天津"},{216:"广东"},{235:"成都"},
               {260:"杭州"},{299:"深圳"},{347:"苏州"},{362:"西安"},{388:"重庆"},{401:"长沙"}],
                cityid:104,
                 chengshi:"",
                show1:false,
                word:"",
                list:[],
                num:0,
                url:'',
                dis:false
            }
        },
        methods:{
            change(event){
                this.list=[]
                this.num=0
                if(event.target.innerHTML=="本地服务"){
                    $(".ben").css({
                        borderBottom:"2px solid #000",
                        color:"#000"
                    })
                     $(".quan").css({
                        borderBottom:"0px solid #000",
                        color:"#969696"
                    })
                    this.url="https://api.ricebook.com/3/enjoy_product/search.json?city_id="
            +localStorage.getItem("city")+"&keyword="+this.$route.query.query_k+"&page=";
                    var url=this.url+this.num;
                    var that=this;
                    Ajax.vueJson(url,function(data){
                        console.log(data)
                    that.list=data.products
                    },function(err){console.log(err)})
                }else{
                     $(".ben").css({
                        borderBottom:"0px solid #000",
                        color:"#969696"
                    })
                     $(".quan").css({
                        borderBottom:"2px solid #000",
                        color:"#000"
                    })
                    this.url="https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword="
                    +this.$route.query.query_k+"&page="
                     var url=this.url+this.num;
                    var that=this;
                    Ajax.vueJson(url,function(data){
                        console.log(data)
                    that.list=data.products
                    },function(err){console.log(err)})
                }
            },
             show11(){
                if(this.show1){
                    this.show1=false;
                }else{
                    this.show1=true;
                }

            },
             delate(data){
                
                var arr=data.split("?")[1]
                console.log(arr);
                // window.location.reload()
                router.push({
                    path:"detail",
                    query:{
                        url:arr
                    }
                })
                
            },
             top(event){
                    var sh=event.target.scrollHeight;
                    var h=event.target.offsetHeight;
                    var t=event.target.scrollTop;
                    
                    var that=this;
                    // console.log(sh,h,t,this)
                    if(sh==h+t-17 ){
                        console.log("加载");
                        this.num++;
                        // console.log(this.num);
                        var url = this.url+this.num
                        console.log(url)
                            Ajax.vueJson(url,function(data){
                                console.log(data);
                                for(var itm of data.products){
                                    that.list.push(itm)
                                }
                                
                            },function(err){console.log(err)})
                    }
                
                
            }
        
        },
        mounted(){
            console.log(this.$route.query.query_k)
            this.word=this.$route.query.query_k;
            var url ="https://api.ricebook.com/3/enjoy_product/search.json?city_id="
            +localStorage.getItem("city")+"&keyword="+this.$route.query.query_k+"&page=0";
            this.url="https://api.ricebook.com/3/enjoy_product/search.json?city_id="
            +localStorage.getItem("city")+"&keyword="+this.$route.query.query_k+"&page="
            var that=this;
            Ajax.vueJson(url,function(data){
                console.log(data)
               that.list=data.products
               that.dis=true
            },function(err){console.log(err)})



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
        }
    }
</script>

<style scoped>
    .jiazai{
            position: fixed;
            top:50%;
            left: 50%;
            transform: translate(-30px,-30px);
            
    }
</style>
