<template>
  <div class="category-edit">
      <h1>{{id ? '编辑' : '新建'}}管理员</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="用户名">
              <el-input v-model="data.username"></el-input>
          </el-form-item>
           <el-form-item label="密码">
              <el-input v-model="data.password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" native-type="sumbit">保存</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    props: {
        id: {type: String}
    },
    data(){
        return {
            data:{
                username: '',
                password: '',
            },//分类
        }
    },
    created(){
        this.id && this.fetch()
    },
    methods: {
        //保存
        async save(){
            // this.$http.post()
            let res
            if(this.id){
                //更新
                res = await this.$http.put(`rest/admin_users/${this.id}`,this.data)
            }else{
                //创建
                res = await this.$http.post('rest/admin_users',this.data)
            }
            console.log(res)
            this.$router.push('/admin_users/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            }) 
        },
        //编辑分类
        async fetch(){
            const res = await this.$http.get(`rest/admin_users/${this.id}`)
            this.data = res.data
        },
    }
}
</script>

<style>

</style>