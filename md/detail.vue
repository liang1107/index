<template>
    <div class="flex">
        <header class="header">
            <div class="commonHeader">
                <div class="back">
                    <router-link :to="{name:'home'}">首页</router-link>
                </div>
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
                    <span>搜索</span>
                    <div class="jiao"></div>
                </div>
            </div>
        </header>
        <img v-if="!si" class="jiazai" src="tool/img.gif"/>
        <div id="content" v-if="si">
            
            <div class="banner">
                <div class="swiper-container" id="banner">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="it in obglist.product_images">
                            <img :src="it.img_url" />
                        </div>
                    </div>
                    <div class="swiper-pagination" id="bannerpint"></div>
                </div>
            </div>
            <h2>{{obglist.name}}</h2>
            <p>{{obglist.description}}</p>
            <p>
                <span>{{obglist.price/100}}元/{{obglist.show_entity_name}}</span>
                <span>￥{{obglist.origin_price/100}}</span>

            </p>
            <div class="xian"></div>

            <div class="tebie" v-if="zai">
                <h1>商家信息</h1>
                <h2>{{dizhi[0+cou].data.restaurants[0].restaurant_name}}</h2>
                <div class="di">{{dizhi[0+cou].data.restaurants[0].restaurant_address}}</div>
                <div class="di di1">{{dizhi[0+cou].data.restaurants[0].restaurant_phone_numbers[0]}}</div>
                <div class="xian"></div>
                <h1>MENU</h1>
                <div class="hei" v-for="i in dizhi[1+cou].data.contents">{{i.sub_title}}
                    <div class="he" v-for="it in i.text"> {{it}}</div>
                </div>
                <div class="xian"></div>
            </div>
            <div class="tebie" v-if="!zai">
                <h1>商品详情</h1>
                <ul>
                    <li v-for="it in dizhi[0+cou].data.attributes">
                        <span>{{it.key}} </span>
                        <span>{{it.value}} </span>
                    </li>
                    <li v-for="it in dizhi[0+cou].data.menu_attributes">
                        <span>{{it.key}} </span>
                        <div class="p">{{it.value}} </div>
                    </li>
                </ul>
                <div class="xian"></div>
            </div>

            <h1>亮点</h1>
            <div class="liang" v-for=" it in dizhi[zainum+cou].data.lights">
                <img :src="it.img_url" />
                <div class="hei">{{it.title}} </div>
                <div class="he">{{it.content}} </div>
            </div>
            <div class="xian"></div>
            <h1>使用说明</h1>
            <ul v-for="it in dizhi[zainum+1+cou].data.contents">
                <li>{{it.text}}</li>
            </ul>
            <div class="xian"></div>
            <h1>猜你喜欢</h1>
            <div class="list2" v-for=" it in dizhi[zainum+2+cou].data.recommend" @click="delate(it.enjoy_url)">
                <div class="img"><img :src="it.product_image_url" /></div>
                <div class="fe">
                    <p>{{it.product_name}} </p>
                    <div class="red">{{it.price/100}}元/{{it.show_entity_name}}</div>
                </div>
            </div>
        </div>

        <div class="detilfooter">
            <ul>
                <li class="iconfont ding" @click="tiaocat()">&#xe604;
                    <span class="red" v-if="jia1">+{{xuannum}} </span>
                </li>
                <li @click="gowu()">加入购物车</li>
                <li>即可购买</li>
            </ul>
            <div class="ul1" @click="queding()">确定</div>
            <div class="liang">
                <div class="yi">以选择：{{obglist.spec}}({{xuannum}}份)
                    <div class="right" @click="xia($event)">切换商品</div>
                </div>
                <div class="yi1">
                    <p>{{obglist.spec}}</p>
                    <p>
                        <span>{{obglist.price/100}}元/{{obglist.show_entity_name}}</span>
                        <span>￥{{obglist.origin_price/100}}</span>
                    </p>

                </div>
                <div class="yi2">
                    选择数量
                    <div class="right">
                        <span @click="jian()">-</span>
                        <span>{{xuannum}}</span>
                        <span @click="jia()">+</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Ajax from "./../tool/MyAjax";
import "./../scss/detail.scss";
import Vue from "vue"
import VueRouter from "vue-router";
Vue.use(VueRouter)
var router = new VueRouter({

})
export default {
    data() {
        return {
            city: [{ 104: "上海" }, { 140: "北京" }, { 144: "南京" }, { 185: "天津" }, { 216: "广东" }, { 235: "成都" },
            { 260: "杭州" }, { 299: "深圳" }, { 347: "苏州" }, { 362: "西安" }, { 388: "重庆" }, { 401: "长沙" }],
            chengshi: "",
            show1: false,
            cityid: 104,
            obglist: {},
            dizhi: [],
            si: false,
            xuannum: 1,
            zai: true,
            zainum: 2,
            jia1:false,
            id:0,
            cou:0
           

        }
    },
    methods: {
        queding(){
            console.log("queding")
            $(".liang .right").html("切换商品")
                $(".liang").animate({
                    bottom: -60
                })

                $(".ul1").animate({
                    opacity: 0
                }, function () {
                    $(".ul1").css({
                        display: "none",
                        zIndex:-111
                    })
                })
        },
        gowu(){
            console.log("购物")
            
            this.jia1=true;
            var that =this
            setTimeout(function(){
               
                $(".ding .red").animate({
                    opacity:0
                },function(){
                     that.jia1=false;
                })

               
            },500);
            if(localStorage.getItem("goods") && JSON.parse(localStorage.getItem("goods")).length!=0){
                console.log("第2次添加")
                var arr=JSON.parse(localStorage.getItem("goods"));
                var id=arr[arr.length-1].id+1;
                var obg={url:this.$route.query.url,num:this.xuannum,id:id}
                var kai=0
                for(var i in arr){
                    if(arr[i].url==this.$route.query.url){
                        console.log("相同商品")
                        arr[i].num=arr[i].num+this.xuannum;
                        var kai=1;
                    }
                }
                if( kai==0 ){
                    arr.push(obg);
                }
                
                localStorage.setItem("goods",JSON.stringify(arr))
            }else{
                console.log("第一次添加")
                var obg=[{url:this.$route.query.url,num:this.xuannum,id:this.id}]
                localStorage.setItem("goods",JSON.stringify(obg))
            }

        },
        tiaocat(){
            console.log(this.$route.query.url,this.xuannum,"数据");
            
            this.$router.push({
                path:"cart",
                query:{
                    url:this.$route.query.url,
                    num:this.xuannum
                }
            })
        },
        xia(even) {
            console.log(even.target.innerHTML)

            if (even.target.innerHTML == "切换商品") {
                
                even.target.innerHTML = "关闭"
                $(".liang").animate({
                    bottom: 60
                })
                $(".ul1").css({
                    display: "block",
                    zIndex:9999
                })
                $(".ul1").animate({
                    opacity: 1
                })
            } else {
                 
                even.target.innerHTML = "切换商品"
                $(".liang").animate({
                    bottom: -60
                })

                $(".ul1").animate({
                    opacity: 0
                }, function () {
                    $(".ul1").css({
                        display: "none",
                        zIndex:-111
                    })
                })
            };

        },
        jia(){
            this.xuannum++
        },
        jian(){
            this.xuannum--
            if(this.xuannum<=1){
                this.xuannum=1
            }
        },
        delate(data) {

            var arr = data.split("?")[1]
            console.log(arr);
            // window.location.reload()
            router.push({
                path: "detail",
                query: {
                    url: arr
                }
            })

        },
        show11() {
            if (this.show1) {
                this.show1 = false;
            } else {
                this.show1 = true;
            }

        }
    },
    created() {
        console.log(1111)
    }
    ,
    updated() {
        //分页符不动的代码
        $(function () {
            var swiper1, swiper2;

            var index = $(this).index();
            $("body").find('.wrap-container').eq(index).show().siblings('.wrap-container').hide();
            if (index === 0 && swiper1 === undefined) {
                swiper1 = createSwiper(1);
            } else if (index === 1 && swiper2 === undefined) {
                swiper2 = createSwiper(2);
            }

        });

        function createSwiper(index) {
            var swiper = new Swiper('.swiper' + index, {
                pagination: '.pagination' + index,
                paginationClickable: true,
                loop: true,
                observer: true,
                observerParents: true,
                paginationBulletRender: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                }
            });
            return swiper;
        }
        var swiper = new Swiper('#banner', {
            pagination: '#bannerpint',
            paginationClickable: true,
            observer: true,
            observerParents: true,
            autoplay: 2000
        });
    },
    watch: {
        $route(re, re1) {
            console.log(re, re1);
            var word = re.query.url
            //  https://api.ricebook.com/product/info/product_detail.json?product_id=1038542
            var url = "https://api.ricebook.com/product/info/product_detail.json?product_" + word;
            console.log(url)
            var that = this;
            Ajax.vueJson(url, function (data) {
                console.log(data.modules);
                that.obglist = data.basic
                that.dizhi = data.modules
                that.si = true
                if (!data.modules[4]) {
                    that.zai = false;
                    that.zainum = 1
                }
            }, function (err) { console.log(err) })
            window.history.go(0)
        }
    },
    mounted() {
        console.log(this.$route.query.url)
        var word = this.$route.query.url
        //  https://api.ricebook.com/product/info/product_detail.json?product_id=1038542
        var url = "https://api.ricebook.com/product/info/product_detail.json?product_" + word;
        console.log(url)
        var that = this;
        Ajax.vueJson(url, function (data) {
            console.log(data);
            that.obglist = data.basic
            that.dizhi = data.modules;
            console.log(that.dizhi)
            console.log(data.modules[4], "aaa")
            if (!data.modules.length==4 && !data.modules.length==5 && !data.modules.length==6) {
                console.log("bbbbb")
                that.zai = false;
                that.zainum = 1
            }else if(data.modules.length==5){
                console.log("5555")
                that.cou=1;
                that.zai = false;    
                 that.zainum = 1            
            }else if(data.modules.length==6){
                    console.log(66666)
                    that.cou=1;
            }else if(data.modules.length==4){
                 console.log("4444")
                that.zai = false;
                that.zainum = 1
            }
            that.si = true
        }, function (err) { console.log(err) })



        if (localStorage.getItem("city")) {
            var arr = this.city;
            for (var it of arr) {

                for (var i in it) {

                    if (i == localStorage.getItem("city")) {

                        this.chengshi = it[i]
                    }
                }
            }
        } else {
            localStorage.setItem("city", this.cityid);
            var arr = this.city;
            for (var it of arr) {

                for (var i in it) {
                    if (i == localStorage.getItem("city")) {
                        this.chengshi = it[i]
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
    .ding{
        position: relative;
    }
    .iconfont .red{
        color:#f66;font-size: 12px;
        position: absolute;width: 100%;height: 100;
        line-height:40px;
        text-align: center;
        top:0;left:0;
    }
</style>
