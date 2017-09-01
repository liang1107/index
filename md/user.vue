<template>
    <div class="flex">
        <div id="userid">
            <div class="userhead">
                <div class="username">
                    <img src="https://image.ricebook.com/avatar/1?imageView2/1/w/140/h/140"><br/>
                        {{name}}
                </div>
            </div>
            <div class="xian"></div>
            <div class="quan">
                <div class="left">Code 消费码</div>
                <div class="right">></div>
            </div>
            <div class="xian"></div>
            <div class="quan">
                <div class="left">我的礼券</div>
                <div class="right">></div>
            </div>
            <div class="xian"></div>
            <div class="quan">
                <div class="left">地址管理</div>
                <div class="right">></div>
            </div>
        </div>
    </div>
</template>


<script>
import "./../scss/user.scss"

    export default {
        data(){
            return {
                 name:""
            }
        },
        mounted(){
            if(localStorage.getItem("user")){
                 this.name=JSON.parse(localStorage.getItem("user"))
            }else{
               
                this.$router.push({
                    path:"login"
                })
            }
          
        }
    }
</script>

<style scoped>

</style>
