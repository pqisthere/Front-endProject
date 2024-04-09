<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>天知道示例</title>
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/index.css" />
</head>

<body>
  <div class="wrap" id="app">
    <div class="search_form">
      <div class="logo"><img src="img/logo.png" alt="logo" /></div>
      <div class="form_group">
        <input type="text" class="input_txt" placeholder="请输入查询的城市" v-model="city" @keyup.enter="queryWeather" />
        <button class="input_sub" @click="queryWeather">
          搜 索
        </button>
      </div>
      <div class="hotkey">
        <a href="javascript:;" v-for="city in hotCitys" @click="clickSearch(city)">{{ city }}</a>
      </div>
    </div>
    <ul class="weather_list">
      <li v-if="weatherData" v-for="(day, index) in weatherData" :key="index">
        <div class="info_type">
          <span class="iconfont">{{ day.textDay }}</span>
        </div>
        <div class="info_temp">
          <b>{{ day.tempMax }}</b> ~ <b>{{ day.tempMin }}</b> °C
        </div>
        <div class="info_date">
          <span>{{ day.fxDate }}</span>
        </div>
      </li>
    </ul>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    new Vue({
      el: "#app",
      data: {
        city: "北京",
        weatherData: null,
        hotCitys: ["北京", "上海", "广州", "深圳"]
      },
      methods: {
        queryWeather() {
          axios
            .get(`https://geoapi.qweather.com/v2/city/lookup?key=a746068391a84838a3b7f28b11349149&location=${encodeURIComponent(this.city)}`)
            .then(res => {
              const locationData = res.data.location[0];
              const cityId = locationData.id;
              this.fetchWeatherData(cityId);
            })
            .catch(err => {
              console.log(err);
            });
        },
        fetchWeatherData(cityId) {
          axios
            .get(`https://devapi.qweather.com/v7/weather/3d?key=a746068391a84838a3b7f28b11349149&location=${cityId}`)
            .then(res => {
              console.log(res);
              this.weatherData = res.data.daily;
            })
            .catch(err => {
              console.log(err);
            });
        },
        clickSearch(city) {
          this.city = city;
          this.queryWeather();
        }
      }
    });
  </script>
</body>

</html>
