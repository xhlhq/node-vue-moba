<template>
  <div class="category-list">
      <el-card>
        <h1>分类列表</h1>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-select v-model="data.categoryId"
            placeholder="请选择"
             @change="search"
             >
              <el-option
                v-for="item in resData.categoryList"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input
            placeholder="请输入搜索内容"
            v-model="data.search"
            @keyup.native.enter="search">
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-table :data="resData.items">
          <el-table-column prop="_id" label="ID" width="240"></el-table-column>
          <el-table-column prop="parent.name" label="上级分类"></el-table-column>
          <el-table-column prop="name" label="分类名称" ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
          <template slot-scope="scope">
                <el-button type="primary" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
                <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
          </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="resData.count"
          style="margin: 2rem auto">
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            resData: {},//响应值
            currentPage: 1,
            data: {       //请求值
              page: 1,
              limit: 10,
              search: '',
              categoryId: '',//select值
            },
        }
    },
    created(){
        this.fetch()
    },
    methods: {
        async fetch(){
            const res = await this.$http.get('rest/categories',{
              params: this.data
            })
            // console.log('res:',res)
            this.resData = res.data
        },
        async remove(row){
          this.$confirm(`是否确定要删除分类：${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/categories/${row._id}`)
          if(res.data.success){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //重载
          this.fetch()
          }
        })
      },
      //搜索
      search(){
        this.fetch()
      },
      //重置
      reset(){
        this.data.search = '',
        this.fetch()
      },
      //分页
        handleSizeChange(val) {
          this.data.limit = val
          this.fetch()
        },
        handleCurrentChange(val) {
          this.currentPage = val
          this.data.page = val
          this.fetch()
        }
    }
}
</script>

<style>

</style>