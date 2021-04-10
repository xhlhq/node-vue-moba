<template>
    <el-container style="height: 100vh;">
        <el-aside width="auto" style='background-color:#343E3D'>
            <el-menu router
             unique-opened 
             :default-active="$route.path" 
             :collapse="isCollapse"
             background-color="#343E3D"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-s-order"></i><span v-show="!isCollapse">内容管理</span></template>
                <el-menu-item-group>
                <template slot="title">物品</template>
                <el-menu-item index="/items/create">新建物品</el-menu-item>
                <el-menu-item index="/items/list">物品列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                <template slot="title">人物</template>
                <el-menu-item index="/heroes/create">新建人物</el-menu-item>
                <el-menu-item index="/heroes/list">人物列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                <template slot="title">文章</template>
                <el-menu-item index="/articles/create">新建文章</el-menu-item>
                <el-menu-item index="/articles/list">文章列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-s-help"></i><span v-show="!isCollapse">运营管理</span></template>
                <el-menu-item-group>
                <template slot="title">广告</template>
                <el-menu-item index="/ads/create">新建广告</el-menu-item>
                <el-menu-item index="/ads/list">广告位列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-s-tools"></i><span v-show="!isCollapse">系统设置</span></template>
                <el-menu-item-group>
                <template slot="title">分类</template>
                <el-menu-item index="/categories/create">新建分类</el-menu-item>
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                <template slot="title">管理员</template>
                <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header class="header"  style="background-color: #3498db">
              <div>
                  <i 
                  :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}"
                  @click="isCollapse=!isCollapse"></i>
                  <span>我的博客管理页面</span>
              </div>
              <el-dropdown>
                  <div class="avatar-wrap">
                      <img :src="user.photo" alt="">
                      <span>{{user.name}}</span>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item @click.native='onLogout'>退出</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </el-header>
            
            <el-main>
            <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          photo: '../assets/logo.png',
          name: '用户名'
        },
        isCollapse: false
      }
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .header {
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
  .header .avatar-wrap {
        display: flex;
        align-items: center;
  }
  .header .avatar-wrap img {
      width: 32px;
      height: 32px;
      margin-right: 3px;
      border-radius: 50%;
  }
</style>