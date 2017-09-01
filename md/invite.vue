<template>
    <div class="flex">
        <img v-if="!show" class="jiazai" src="tool/img.gif"/>
        <div class="yao" v-if="show">
            
            <img src="https://image.ricebook.com/business/21405298623398?imageView2/2/w/750/h/246"/>
            <div class="you">
                
                邀请好友加入ENJOY，给TA发放价值50元礼券。好友完成首单消费后，你亦可获得价值50元礼券。
  
            </div>
            <div class="jike">即刻邀请</div>
            <div class="xian"></div>
            <p>奖励明细</p>
           <div class="ps">
                <div class="left">5人</div>
                <div class="right">额外奖励&nbsp; &nbsp;&nbsp;100元 </div>
            </div>
            <div class="ps">
                <div class="left">10人</div>
                <div class="right">额外奖励&nbsp; &nbsp;&nbsp;100元 </div>
            </div>
            <div class="ps">
                <div class="left">25人</div>
                <div class="right">额外奖励&nbsp; &nbsp;&nbsp;750元 </div>
            </div>
           
            <div class="ps">
                <div class="left">50人</div>
                <div class="right">额外奖励&nbsp; &nbsp;&nbsp;2000元 </div>
            </div>

        </div>
    </div>
</template>


<script>
import "./../scss/invite.scss";
import Ajax from "./../tool/MyAjax";
    export default {
        data(){
            return {
                show:false
            }
        },
        mounted(){
            var that=this;
             
            if(localStorage.getItem("user")){
                 this.name=localStorage.getItem("user")
            }else{
               
                this.$router.push({
                    path:"login"
                })
            }
          
    
           setTimeout(function(){
               that.show=true
               console.log(1)
           },500)         
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
