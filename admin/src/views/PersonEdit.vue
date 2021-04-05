<template>
  <div class="category-edit">
      <h1>{{id ? '编辑' : '新建'}}人物</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-tabs value="skills" type="border-card">
              <el-tab-pane label="基本信息" name="basic">
                <el-form-item label="名字">
                    <el-input v-model="data.name"></el-input>
                </el-form-item>
                <el-form-item label="称号">
                    <el-input v-model="data.title"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="data.categories" multiple>
                        <el-option v-for="item in categories" 
                        :key="item._id" :value="item._id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="难度">
                    <el-rate :max="10" show-score style="margin-top:0.7rem;" v-model="data.scores.difficult"></el-rate>
                </el-form-item>
                <el-form-item label="技能">
                    <el-rate :max="10" show-score style="margin-top:0.7rem;" v-model="data.scores.skill"></el-rate>
                </el-form-item>
                <el-form-item label="攻击">
                    <el-rate :max="10" show-score style="margin-top:0.7rem;" v-model="data.scores.attack"></el-rate>
                </el-form-item>
                <el-form-item label="生存">
                    <el-rate :max="10" show-score style="margin-top:0.7rem;" v-model="data.scores.survive"></el-rate>
                </el-form-item>
                <el-form-item label="携带物品">
                    <el-select v-model="data.items1" multiple>
                        <el-option v-for="item in items" 
                        :key="item._id" :value="item._id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="携带食物">
                    <el-select v-model="data.items2" multiple>
                        <el-option v-for="item in items" 
                        :key="item._id" :value="item._id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="使用技巧">
                    <el-input type="textarea" v-model="data.usageTips"></el-input>
                </el-form-item>
                <el-form-item label="对抗技巧">
                    <el-input type="textarea" v-model="data.battleTips"></el-input>
                </el-form-item>
                <el-form-item label="团战思路">
                    <el-input type="textarea" v-model="data.teamTips"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :on-success="afterUpload"
                        >
                        <img v-if="data.avatar" :src="data.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="技能" name="skills">
                  <el-button type="text" @click="data.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                  <el-row type="flex" style="flex-wrap:wrap;">
                      <el-col :md="12" v-for="(item,index) in data.skills" :key="index">
                          <el-form-item label="技能名称">
                              <el-input v-model="item.name"></el-input>
                          </el-form-item>
                          <el-form-item label="技能描述">
                            <el-input type="textarea" v-model="item.description"></el-input>
                          </el-form-item>
                          <el-form-item label="图像">
                            <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false"
                                :headers="getAuthHeaders()"
                                :on-success="res => $set(item,'icon',res.url)"
                                >
                                <img v-if="item.icon" :src="item.icon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                          </el-form-item>
                          <el-form-item label="提示">
                            <el-input v-model="item.tips"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="danger" size="small" @click="data.skills.splice(index,1)">删除</el-button>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </el-tab-pane>
          </el-tabs>
          <el-form-item style="margin-top: 1rem">
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
                name:'',
                avatar:'',
                title: '',
                categories: [],
                scores: {
                    difficult: 0,
                    skill: 0,
                    attack: 0,
                    survive: 0
                },
                skills: [],
                items1: [],
                items2: [],
                usageTips: '',
                battleTips: '',
                teamTips: '',
                partners: []
            },
            categories: [],
            items: []
        }
    },
    created(){
        this.id && this.fetch()
        this.fetchCategories()
        this.fetchItems()
    },
    methods: {
        //保存
        async save(){
            // this.$http.post()
            let res
            if(this.id){
                //更新
                res = await this.$http.put(`rest/persons/${this.id}`,this.data)
            }else{
                //创建
                res = await this.$http.post('rest/persons',this.data)
            }
            console.log(res)
            this.$router.push('/persons/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            }) 
        },
        //编辑分类
        async fetch(){
            const res = await this.$http.get(`rest/persons/${this.id}`)
            // this.data = res.data
            this.data = Object.assign({},this.data,res.data)
        },
        //图片上传完成后
        afterUpload(res){
            // console.log('afterUpload',res)
            this.data.avater = res.url
            //当为对象赋一个它原本不存在的属性时，最好使用 this.$set
            // this.$set(this.data,'avatar',res.url)
        },
        //获取分类数据
        async fetchCategories(){
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        },
        //获取物品数据
        async fetchItems(){
            const res = await this.$http.get(`rest/items`)
            this.items = res.data
        },
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>