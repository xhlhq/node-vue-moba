<template>
  <div id="hero" v-if="hero">
    <div class="topbar bg-black px-3 py-2 d-flex flex-ai-center">
        <img src="../../assets/icon/apple-touch-icon.png" height="35" alt="icon">
        <div class="text-white mx-2">王者荣耀</div>
        <div class="text-white flex-1">攻略站点</div>
        <div class="text-white font-size-sm">更多英雄 &gt;&gt;</div>
    </div>
    <div class="header" :style="{'backgroundImage': `url(${hero.bg})`}">
        <div class="introduce text-white p-3">
            <div class="font-size-xs">{{hero.title}}</div>
            <div>{{hero.name}}</div>
            <div class="font-size-xs">
                <span v-for="(item,index) in hero.categories" :key="index">{{item.name}}</span>
            </div>
        </div>
        <div class="bar text-white font-size-xs
        d-flex flex-jc-around flex-ai-center">
            <div class="flex-1 d-flex px-3">
                <span class="attr-name p-r-2">难度</span>
                <span class="hero-attr difficult"
                :style="{backgroundPosition:`-61px -${(hero.scores.difficult-1) * 20.5 + 0.5}px`}"></span>
                <span class="attr-name px-2">技能</span>
                <span class="hero-attr skill"
                :style="{backgroundPosition:`-20.5px -${(hero.scores.skill-1) * 20.5 + 1}px`}"></span>
                <span class="attr-name px-2">攻击</span>
                <span class="hero-attr attack"
                :style="{backgroundPosition:`-41px -${(hero.scores.attack-1) * 20.5 + 1}px`}"></span>
                <span class="attr-name px-2">生存</span>
                <span class="hero-attr survive"
                :style="{backgroundPosition:`-0px -${(hero.scores.survive-1) * 20.5 + 1}px`}"></span>
            </div>
            <div>皮肤 &gt;</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            hero: null
        }
    },
    created () {
        this.fecthHero()
    },
    methods: {
        async fecthHero(){
            const res = await this.$http.get(`hero/${this.id}`)
            this.hero = Object.assign({},this.hero,res.data)
        }
    }
}
</script>

<style lang="scss" scoped>
#hero{
    .header {
       height: 50vw;
       background-repeat: no-repeat;
       background-size: auto 100%; 
       position: relative;
       .introduce {
           position: absolute;
           bottom: 1rem;
       }
       .bar {
           width: 100%;
           height: 2rem;
           position: absolute;
           bottom: 0;
           background-color: rgba(0,0,0,0.3);
           .attr-name {
               
           }
           .hero-attr {
               width: 19px;
               height: 19px;
               display: block;
               background: url(../../assets/icon/hero-attrsp.png) no-repeat;
            background-size: 200px 225px;
           }
       }
    }
}
</style>