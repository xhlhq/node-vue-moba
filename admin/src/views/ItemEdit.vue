<template>
  <div class="category-edit">
      <h1>{{id ? '编辑' : '新建'}}物品</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="名称">
              <el-input v-model="data.name"></el-input>
          </el-form-item>
           <el-form-item label="图标">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :headers="getAuthHeaders()"
                :on-success="afterUpload"
                >
                <img v-if="data.icon" :src="data.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            data:{},//分类
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
                res = await this.$http.put(`rest/items/${this.id}`,this.data)
            }else{
                //创建
                res = await this.$http.post('rest/items',this.data)
            }
            console.log(res)
            this.$router.push('/items/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            }) 
        },
        //编辑分类
        async fetch(){
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.data = res.data
        },
        //图片上传完成后
        afterUpload(res){
            // console.log('afterUpload',res)
            // this.data.icon = res.url
            //当为对象赋一个它原本不存在的属性时，最好使用 this.$set
            this.$set(this.data,'icon',res.url)
        }
    }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>