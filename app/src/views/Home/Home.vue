<template>
  <div id="home">
      <!-- banner satrt-->
    <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide>
            <img src="~@/assets/image/banner/banner1.jpg" class="w-100" alt="">
        </swiper-slide>
        <swiper-slide>
            <img src="~@/assets/image/banner/banner2.jpg" class="w-100" alt="">
        </swiper-slide>
        <swiper-slide>
            <img src="~@/assets/image/banner/banner3.jpg" class="w-100" alt="">
        </swiper-slide>
        <swiper-slide>
            <img src="~@/assets/image/banner/banner4.jpg" class="w-100" alt="">
        </swiper-slide>
        <div class="swiper-pagination home-pagination text-right px-1" slot="pagination"></div>
    </swiper>
    <!-- banner end -->

    <!-- nav start -->
    <div class="nav-icons bg-white m-t-3  text-center p-t-3">
        <div class="d-flex flex-wrap">
            <div class="nav-icon m-b-3 text-dark" v-for="i in 10" :key="i">
                <i class="sprite sprite-news"></i>
                <div class="py-2">新闻</div>
            </div>
        </div>
        <div class="py-2 bg-light font-size-sm">
            <i class="sprite sprite-up mx-1"></i>
            <span>收起</span>
        </div>
    </div>
    <!-- nav end -->

    <!-- news start -->
    <my-list-card title="新闻资讯" icon="news" :categories="newsList">
       <template #item = scoped>
           <router-link
            tag="div" :to="'/articles/' + item._id"
            class="py-2 d-flex" v-for="(item,Key) in scoped.category.newsList" :key="Key">
                <span class="text-gray-1">[{{item.categoryName}}]</span>
                <span class="mx-1">|</span>
                <span class="flex-1 ellipsis">{{item.title}}</span>
                <span class="text-gray-1">{{item.createdAt | date}}</span>
           </router-link>
       </template>
    </my-list-card>
    <!-- news end -->

    <!-- hero start -->
    <my-list-card title="英雄列表" icon="account" :categories="heroList">
       <template #item = scoped>
           <div
           class="py-2 d-flex flex-wrap" 
           style="margin: 0 -0.4rem">
                <router-link 
                tag="div" :to="'/hero/' + hero._id"
                style="width: 20%" class="p-2 text-center font-size-xm" v-for="(hero,Key) in scoped.category.heroList" :key="Key">
                    <img class="w-100" :src="hero.avatar" alt="">
                    <div class="font-size-sm">{{hero.name}}</div>
                </router-link>
           </div>
       </template>
    </my-list-card>
    <!-- hero end -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    data(){
        return {
            swiperOptions: {
                pagination: {
                    el: '.home-pagination'
                },
                // Some Swiper option/callback...
            },
            newsList: [],
            heroList: [],
        }
    },
    created(){
        this.fetchNewsList()
        this.fetchHeroList()
    },
    mounted() {
    //   console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    },
    filters: {
        date(val){
            return dayjs(val).format('MM/DD')
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    methods: {
        async fetchNewsList(){
            const res = await this.$http.get('/news/list')
            this.newsList = res.data
        },
        async fetchHeroList(){
            const res = await this.$http.get('/heroes/list')
            this.heroList = res.data
            // console.log('hero:',this.heroList)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variable.scss';
#home {
.home-pagination {
    .swiper-pagination-bullet {
        opacity: 1;
        background-color: map-get($colors,'white');
        &.swiper-pagination-bullet-active {
            background-color: map-get($colors , 'info');
        }
    }
}
.nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-icon {
        width: 25%;
        border-right: 1px solid $border-color;
        &:nth-child(4n+1){
            border-right: none;
        }
    }
}
.sprite {
    background: url(../../assets/icon/nav-icon.png) no-repeat 0 0;
    background-size: 28.8462rem;
    display: inline-block;
    &.sprite-news {
        background-position: 63.3% 0.927%;
        width: 1.8462rem;
        height: 1.5385rem;
    }
    &.sprite-up {
        background-position: 38.577% 52.076%;
        width: 0.7692rem;
        height: 0.7692rem;
    }
}

}
</style>