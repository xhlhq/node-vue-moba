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
            <slot></slot>
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
        }

    }
}
</script>

<style>

</style>