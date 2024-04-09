new Vue({
    el: "#app",
    data: {
      city: "北京",
      weatherData: null,
      hotCitys: ["北京", "上海", "广州", "深圳"],
      apiKey: "a746068391a84838a3b7f28b11349149" // 直接将 API 密钥硬编码到 JavaScript 中
    },
    methods: {
      queryWeather() {
        axios
          .get(`https://geoapi.qweather.com/v2/city/lookup?key=${this.apiKey}&location=${encodeURIComponent(this.city)}`)
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
          .get(`https://devapi.qweather.com/v7/weather/3d?key=${this.apiKey}&location=${cityId}`)
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