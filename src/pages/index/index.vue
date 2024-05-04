<template>
  <view class="all-page-bg">
    <view class="text-area">
      <text class="title">Hi ! {{ title }}</text>
      <t-button>test</t-button>
    </view>
  </view>
</template>

<script lang="js" setup>
import { ref, onMounted, computed } from "vue";
import { http } from '../../api/http.js'
import { weatherKey } from "../../static/weatherKey.js"

import { useUserStore } from "../../store/modules/index.store.js"

let indexStore = useUserStore();

let title = computed(() => { return indexStore.GET_NAME});
const weatherData = ref([]);
async function getWeather() {
  indexStore.SET_NAME('zhangc')
  console.log(indexStore.GET_NAME);

  let params = {
    location:'101040100',
    key: weatherKey,
  };
  let res = await http.get('/weather/now', params);
  console.log('天气数据',res);
}
onMounted(() => {
  getWeather();
})
</script>

<style scoped>
.all-page-bg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
