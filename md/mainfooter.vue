

<template>
  <footer class="footer">
      <ul>
          <li><router-link to="/home" class="iconfont active">&#xe613;</router-link></li>
          <li><router-link to="/discovery" class="iconfont">&#xe605;</router-link></li>
          <li><router-link to="/invite" class="iconfont">&#xe607;</router-link></li>
          <li><router-link to="/user" class="iconfont">&#xe60c;</router-link></li>
          
      </ul>
  </footer>
</template>


<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>

<style scoped>
    .router-link-exact-active.router-link-active{
        color:#000;
    }
    ul li a{
        font-size:20px;
    }
    .active{
        color:#000;
    }
    ul{
        border-top:1px solid #eee;
    }
</style>
