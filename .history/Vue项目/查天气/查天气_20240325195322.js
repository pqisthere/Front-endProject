new Vue({
    el: "#app",
    data: {
        city: "北京",
        weatherData: null,
        airQualities: null, // 添加空气质量数据
        hotCitys: ["北京", "上海", "广州", "深圳"],
        apiKey: "a746068391a84838a3b7f28b11349149" // 直接将 API 密钥硬编码到 JavaScript 中
    },
    methods: {
        // 查询天气
        queryWeather() {
            axios
                .get(`https://geoapi.qweather.com/v2/city/lookup?key=${this.apiKey}&location=${encodeURIComponent(this.city)}`)
                .then(res => {
                    const locationData = res.data.location[0];
                    const cityId = locationData.id;
                    // 获取天气数据
                    this.fetchWeatherData(cityId);
                    // 获取空气质量数据
                    this.fetchAirQuality(cityId);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取天气数据
        fetchWeatherData(cityId) {
            axios
                .get(`https://devapi.qweather.com/v7/weather/3d?key=${this.apiKey}&location=${cityId}`)
                .then(res => {
                    this.weatherData = res.data.daily;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取空气质量数据
        fetchAirQuality(cityId) {
            axios
                .get(`https://devapi.qweather.com/v7/air/5d?key=${this.apiKey}&location=${cityId}`)
                .then(res => {
                    this.airQualities = res.data.daily;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 点击搜索
        clickSearch(city) {
            this.city = city;
            this.queryWeather();
        }
    }
});
