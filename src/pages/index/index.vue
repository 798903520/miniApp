<template>
  <view class="all-page-bg">
    <view class="text-area">
      <text class="title">Hi ! {{ title }}</text>
      <text>当前天气：{{weatherData}} </text>
      <text>{{ weatherData.text+weatherData.temp+'`'   }}</text>
      <text>{{ weatherData.windDir+weatherData.windScale+'`' +weatherData.windSpeed+'m/s'   }}</text>
      <span>相对湿度:{{ weatherData.humidity }}</span>
      <span>体感温度:{{ weatherData.feelsLike }}</span>
      <span>能见度:{{ weatherData.vis }}</span>
      <span>大气压:{{ weatherData.pressure }}</span>
      <span>更新时间:{{ weatherData.obsTime }}</span>
      <uniCombox :candidates="objArr" @delete="getallData" @change="selectData" @input="getData($event, 'input')"></uniCombox>
      <t-button size="small" t-id="getWeather" @tap="getWeather()">获取天气</t-button>
    </view>
  </view>
</template>

<script lang="js" setup>
import { ref, onMounted, computed } from "vue";
import { http } from '../../api/http.js'
import { weatherKey } from "../../static/weatherKey.js"

import { useUserStore } from "../../store/modules/index.store.js"
import uniCombox from './uni-combox.vue'

let indexStore = useUserStore();

let objArr = ref([]);
setTimeout(() => {
  objArr.value = [{ label: '1234', value: '1', key: '1' }, { label: '2345', value: '2', key: '2' }, { label: '3456', value: '2', key: '2' }];
}, 1000);

let title = computed(() => { return indexStore.GET_NAME});
//当前天气
const weatherData = ref({});
//week天气
const weatherList = ref([]);
async function getWeather() {
  indexStore.SET_NAME('zhangc')
  console.log(indexStore.GET_NAME);

  let params = {
    location:'101040100',
    key: weatherKey,
  };
  let res = await http.get('/weather/now', params);
  if (res.code == 200) { 
    weatherData.value = res.now;
  }
  let resList = await http.get('/weather/7d', params);
  if (resList.code == 200) {
    weatherList.value = resList.daily;
  }
}

function getData(e, type=null){ 
  console.log('e', e, type);
}
function getallData () { 
  console.log('是时候获取所有数据了');
}
function selectData(params) {
  console.log('params', params);
}
onMounted(() => {
  // getWeather();
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
