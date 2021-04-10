<template>
  <div class="category-list">
      <h1>物品列表</h1>
      <el-table :data="resData.items">
          <el-table-column prop="_id" label="ID" width="240"></el-table-column>
          <el-table-column prop="name" label="物品名称" ></el-table-column>
          <el-table-column prop="icon" label="图标" >
              <template slot-scope="scope">
                <img :src="scope.row.icon" style="height:3rem">
              </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
          <template slot-scope="scope">
                <el-button type="primary" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
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
            resData: {},
            currentPage: 1,
            data: {
              page: 1,
              limit: 10
            }
        }
    },
    created(){
        this.fetch()
    },
    methods: {
        async fetch(){
            const res = await this.$http.get('rest/items',{
              params: this.data
            })
            this.resData = res.data
        },
        async remove(row){
          this.$confirm(`是否确定要删除分类：${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/items/${row._id}`)
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