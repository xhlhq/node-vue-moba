<template>
  <div id="article">
      <div v-if="article">
          <div class="article-header d-flex flex-jc-around px-1 py-2 border-bottom">
          <i class="iconfont text-blue icon-icon_direction_leftoutlined"
          @click="$router.back(1)"></i>
          <div class="article-title text-blue flex-1 px-1 ellipsis">
              {{article.title}}
          </div>
          <div class="article-date text-gray-1 font-size-xs">
              {{article.createdAt | date}}
          </div>
      </div>
      <div class="article-body px-1 border-bottom" v-html="article.body">
      </div>
      <div class="article-related px-3">
          <div class="title py-2">
              <i class="iconfont icon-news m-r-1"></i>
              <span class="text-blue">相关资讯</span>
          </div>
          <div class="item font-size-sm">
              <router-link tag="div" 
              :to="'/articles/'+ item._id" v-for="(item,index) in article.related" 
              :key="index" class="ellipsis p-r-5 m-b-1"
              >{{item.title}}</router-link>
          </div>
      </div>
      </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    filters: {
      date(val){
          return dayjs(val).format('YYYY-MM-DD')
      }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            article: null,
        }
    },
    created () {
        this.fetchArticle()
    },
    watch: {
        // id: 'fetchArticle',
        id(){
            this.fetchArticle()
        }
    },
    methods: {
        async fetchArticle(){
            const res = await this.$http.get(`articles/${this.id}`)
            this.article = Object.assign({},this.article,res.data)
        }
    }
}
</script>
<style lang="scss" scoped>
#article {
    .article-body {
        p {
            img,iframe {
            max-width: 100%;
            height: auto;
            }
        }
    }
}
</style>