<template>
  <div class="category-edit">
      <h1>{{id ? '编辑' : '新建'}}广告</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="广告名称">
              <el-input v-model="data.name"></el-input>
          </el-form-item>
          <el-form-item label="">
              <el-button type="text" @click="data.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
                  <el-row type="flex" style="flex-wrap:wrap;">
                      <el-col :md="12" v-for="(item,index) in data.items" :key="index">
                          <el-form-item label="广告地址">
                              <el-input v-model="item.url"></el-input>
                          </el-form-item>
                          <el-form-item label="图像" style="margin-top: 1rem">
                            <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false"
                                :headers="getAuthHeaders()"
                                :on-success="res => $set(item,'image',res.url)"
                                >
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="danger" size="small" @click="data.items.splice(index,1)">删除</el-button>
                          </el-form-item>
                      </el-col>
                  </el-row>
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
                res = await this.$http.put(`rest/ads/${this.id}`,this.data)
            }else{
                //创建
                res = await this.$http.post('rest/ads',this.data)
            }
            console.log(res)
            this.$router.push('/ads/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            }) 
        },
        //编辑分类
        async fetch(){
            const res = await this.$http.get(`rest/ads/${this.id}`)
            // this.data = res.data
            this.data = Object.assign({},this.data,res.data)
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
    min-width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    min-width: 5rem;
    height: 5rem;
    display: block;
  }
</style>