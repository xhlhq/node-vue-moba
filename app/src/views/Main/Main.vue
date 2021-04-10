<template>
  <div id="main" class="bg-gray">
      <div class="topbar bg-black px-3 py-2 d-flex flex-ai-center">
          <img src="../../assets/icon/apple-touch-icon.png" height="35" alt="icon">
          <div class="px-2 flex-1">
              <div class="text-white">网站</div>
              <div class="font-size-xs text-gray-1">基于vue cli4</div>
          </div>
          <button class="btn bg-primary">立即下载</button>
      </div>
      <div class="bg-primary py-2">
          <div class="nav-inverse flex-jc-around text-white">
              <div class="nav-item active">
                  <router-link class="nav-link" to="" tag="div">首页</router-link>
              </div>
               <div class="nav-item">
                  <router-link class="nav-link" to="" tag="div">攻略中心</router-link>
              </div>
               <div class="nav-item">
                  <router-link class="nav-link" to="" tag="div">赛事中心</router-link>
              </div>
          </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#main {
    .topbar {
        position: sticky;
        top: 0;
        z-index: 999;
    }
}
</style>