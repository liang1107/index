



import "./scss/main.scss";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(MintUI)

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

import VueResource from "vue-resource";
Vue.use(VueResource)


import App from "./md/App.vue"
import Home from "./md/main.vue"
import Kind from "./md/kind.vue"
import Cart from "./md/cart.vue"
import User from "./md/user.vue"
import Mainfooter from "./md/mainfooter.vue"
import detail from "./md/detail.vue"
import search from "./md/search.vue"
import kinds from "./md/kinds.vue"
import discovery from "./md/discovery.vue"
import dislist from "./md/dislist.vue"
import login from "./md/login.vue"
import invite from "./md/invite.vue"
import pay from "./md/pay.vue"
var routes=[
    {path:"/detail",components:{
        default:detail
        
    }},
    {path:"/pay",components:{
        default:pay
        
    }},
    {path:"/invite",components:{
        default:invite,
        footer:Mainfooter
        
    }},
    {path:"/login",components:{
        default:login
        
    }},
     {path:"/dislist",components:{
        default:dislist
        
    }},
    {path:"/discovery",components:{
        default:discovery,
        footer:Mainfooter
    }},
    {path:"/kinds",components:{
        default:kinds
    }},
    {path:"/search",components:{
        default:search
    }},
    {path:"/",components:{
        default:Home,
        footer:Mainfooter
    }},
    {path:"/home",name:"home",components:{
         default:Home,
        footer:Mainfooter
    }},
    {path:"/kind",name:"kind",components:{
        default:Kind
    }},
   
    {path:"/cart",components:{
        default:Cart
        
    }},
    {path:"/user",components:{
        default:User,
        footer:Mainfooter

    }}
]

var router=new VueRouter({
    routes
})

var vu= new Vue({
    el:"#app",
    router:router,
    data:{

    },
    components:{
        "v-app": App
    }

})