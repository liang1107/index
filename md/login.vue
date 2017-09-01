<template>
    <div class="flex">
       <div id="login">
            <div class="logo">
                <router-link to="home">ENJOY</router-link>
            </div>
            <input class="phone" type="text" placeholder="手机号码"/>
            <div class="zheng">
                <input class="yanzheng" type="text" placeholder="验证码"/>
                <div class="yan" @click="ma()">{{yanzheng}}</div>
            </div>
            <div class="deng" @click="log()">登录</div>
            <div class="xieyi">
                <p>未注册的用户登录后自动创建账户</p>
                <p> 登录即表示您同意"用户协议"</p>
            </div>
       </div>
       
    </div>
</template>


<script>
import "./../scss/login.scss"
import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                num:['123','321','745','227','578'],
                yanzheng:"验证码"
            }
        },
        methods:{
            log(){
                
                var phone=$(".phone").val();
                var yanzheng=$(".yanzheng").val(); 
                console.log(phone,yanzheng)
                if(phone=="" || yanzheng==""){
                    Toast('信息填写不完整');
                }else{
                        // console.log(yanzheng==$(".yan").text())
                        // console.log(yanzheng,$(".yan").text())
                        // console.log(typeof yanzheng)
                        // console.log(typeof $(".yan").text())
                    if(yanzheng==$(".yan").text()){
                        localStorage.setItem('user',phone)
                        $(".phone").val("");
                        $(".yanzheng").val('');
                        this.$router.push({
                            path:"home"
                        })
                    }else{
                         Toast('验证码不正确');
                    }
                    
                }
            },
             ma(){
                var num=Math.floor(Math.random()*5);
                console.log(num)
                this.yanzheng=this.num[num]
             }
        }
    }
</script>

<style scoped>

</style>
