<script setup lang="ts">
interface Props {
  percent: number
  colorType: 'green' | 'blue'
}
const props = defineProps<Props>()

// 渐变配色匹配原图
const getGradient = () => {
  if (props.colorType === 'green') {
    return 'linear-gradient(90deg, #24e8b6, #46e2f1)'
  } else {
    return 'linear-gradient(90deg, #0ec7e9, #b2f1ff)'
  }
}
</script>

<template>
  <!-- 底层轨道 -->
  <div class="progress-track">
    <!-- 填充进度 -->
    <div
      class="progress-fill"
      :style="{
        width: `${props.percent}%`,
        background: getGradient()
      }"
    ></div>
  </div>
</template>

<style scoped>
/* 轨道粗度调整，和原图一致 */
.progress-track {
  width: 100%;
  height: 86px;
  background: rgba(0, 18, 48, 0.7);
  border: 1px solid rgba(80, 190, 255, 0.25);
  border-radius: 13px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 13px;
  transition: width 0.6s ease-out;
  /* 外发光大屏光效 */
  box-shadow: 0 0 10px rgba(70, 226, 241, 0.55);
}
</style>