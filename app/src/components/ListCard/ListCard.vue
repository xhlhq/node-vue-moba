<template>
  <div class="card">
    <div class="card bg-white m-t-3 p-3">
        <div class="card-header d-flex flex-ai-center">
            <i class="iconfont m-r-1" :class="[`icon-${icon}`]"></i>
            <span class="flex-1">{{title}}</span>
            <i class="iconfont icon-elipsis">
</i>
        </div>
        <div class="card-body p-t-3">
            <div class="nav flex-jc-between">
            <div class="nav-item" :class="{active: isActive === index}"
            @click="$refs.list.$swiper.slideTo(index)" 
            v-for="(category,index) in categories" :key='index'>
                <div class="nav-link">{{category.name}}</div>
            </div>
            </div>
            <swiper ref="list" @slide-change="swiperSlide" :options="{autoHeight: true}">
                <swiper-slide v-for="(category,index) in categories" :key="index">
                    <slot name="item" :category="category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title:{
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            isActive: 0
        }
    },
    methods: {
        swiperSlide(){
            // console.log(this.$refs.list.$swiper.realIndex)
            this.isActive = this.$refs.list.$swiper.realIndex
        }
    }
}
</script>

<style>

</style>