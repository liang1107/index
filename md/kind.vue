<template>
   <div class="flex">
        <header class="header">
            <div class="commonHeader">
                <div class="back"><router-link to="/home">首页</router-link></div>
                <div class="title" @click="show()">ENJOY
                    <span class="iconfont">{{chengshi}} &#xe610;</span>
                </div>
                <div class="moreInfo">
                    <span><router-link to="login">登录</router-link></span>
                    <span class="iconfont"  @click="show11()">&#xe642;</span>
                </div>
            </div>
             <div class="saosuo" v-show="show1">
                <div class="sou1">
                    <input type="text" placeholder="搜索本地精选 / 快递到家" />
                    <span>搜索</span>
                    <div class="jiao"></div>
                </div>
            </div>
        </header>
        <div id="content">
            <img v-if="!dis" class="jiazai" src="tool/img.gif"/>
            <table v-for="it in list" v-if="dis">
                <caption>{{it.name}}</caption>
                <tbody>
                    <tr>
                        <td v-for="a in it.sub_category_list" @click="kinds(a.id)">{{a.name}}</td>
                    </tr>
                </tbody>
            </table>
            
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
</template>


<script>
import Ajax from "./../tool/MyAjax"
import "./../scss/kind.scss";

    export default {
        data(){
            return {
               list:[],
               length:"",
               show1:false,
               cityid:104,
               ishow:false,
               city:[{104:"上海"},{140:"北京"},{144:"南京"},{185:"天津"},{216:"广东"},{235:"成都"},
               {260:"杭州"},{299:"深圳"},{347:"苏州"},{362:"西安"},{388:"重庆"},{401:"长沙"}],
               chengshi:"",
               dis:false
            }
        },
        mounted(){
            //城市
             if(localStorage.getItem("city")){
                    var arr=this.city;
                    for(var it of arr){
                       
                        for(var i in it){
                            
                            if(i==localStorage.getItem("city")){
                               
                                this.chengshi=it[i]
                            }
                        }
                    }
                }else{
                    localStorage.setItem("city",this.cityid);
                    var arr=this.city;
                    for(var it of arr){
                       
                        for(var i in it){
                            if(i==localStorage.getItem("city")){
                                this.chengshi=it[i]
                            }
                        }
                    }
                }

           var url1="https://api.ricebook.com/hub/home/v1/virtual/category.json?city_id="+this.cityid+"&is_new_local=true"
            var that=this;
            Ajax.vueJson(url1,function(data){
                console.log(data);
                that.list=data;
               that.dis=true;
            },function(err){console.log(err)})


        },
        watch:{
            cityid(new1,old){
                // console.log(new1,old)
                 var url1="https://api.ricebook.com/hub/home/v1/virtual/category.json?city_id="+new1+"&is_new_local=true"
                    var that=this;
                    Ajax.vueJson(url1,function(data){
                        // console.log(data);
                        that.list=data;
                         that.dis=true;
                    },function(err){console.log(err)})
            }
        },
        methods:{
            kinds(id){
                console.log(id);
                this.$router.push({
                    path:"kinds",
                    query:{
                        id:id
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
              
                    
            }
        }
    }
</script>

<style scoped>
#content .jiazai{
            position: fixed;
            top:50%;
            left: 50%;
            transform: translate(-30px,-30px);
            
    }
   
</style>
