<template>
  <div class="category-edit">
      <h1>{{id ? '编辑' : '新建'}}</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="所属分类">
              <el-select v-model="data.categories" multiple>
                  <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="标题">
              <el-input v-model="data.title"></el-input>
          </el-form-item>
          <el-form-item label="详情">
              <vue-editor v-model="data.body"
              useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" native-type="sumbit">保存</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
export default {
    props: {
        id: {type: String}
    },
    components: {
      VueEditor  
    },
    data(){
        return {
            data:{
                categories: [],
                title: '',
                body: '',
            },
            categories: [],//所属分类数组
        }
    },
    created(){
        this.id && this.fetch()
        this.fetchcategories()
    },
    methods: {
        //保存
        async save(){
            // this.$http.post()
            let res
            if(this.id){
                //更新
                res = await this.$http.put(`rest/articles/${this.id}`,this.data)
            }else{
                //创建
                res = await this.$http.post('rest/articles',this.data)
            }
            console.log(res)
            this.$router.push('/articles/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            }) 
        },
        //编辑分类
        async fetch(){
            const res = await this.$http.get(`rest/articles/${this.id}`)
            this.data = res.data
        },
        async fetchcategories(){
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        },
        //文章图片上传
        handleImageAdded: async function(file, Editor, cursorLocation, resetUploader) {
            
            const formData = new FormData();
            formData.append("file", file);

            const res = await this.$http.post('upload',formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        }
    }
}
</script>

<style>

</style>