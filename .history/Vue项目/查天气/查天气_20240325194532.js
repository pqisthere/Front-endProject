new Vue({
    el: "#app",
    data: {
        city: "北京",
        weatherData: null,
        airQualities: [] // 存储空气质量数据的数组
        hotCitys: ["北京", "上海", "广州", "深圳"],
        apiKey: "a746068391a84838a3b7f28b11349149" 
    },
    methods: {
        queryWeather() {
            axios
                .get(`https://geoapi.qweather.com/v2/city/lookup?key=${this.apiKey}&location=${encodeURIComponent(this.city)}`)
                .then(res => {
                    const locationData = res.data.location[0];
                    const cityId = locationData.id;
                    this.fetchWeatherData(cityId);
                    this.fetchAirQuality(cityId); // 获取空气质量数据
                })
                .catch(err => {
                    console.log(err);
                });
        },
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
        fetchAirQuality(cityId) {
            axios
                .get(`https://devapi.qweather.com/v7/air/now?key=${this.apiKey}&location=${cityId}`)
                .then(res => {
                    this.airQuality = res.data.now; // 存储空气质量数据
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
