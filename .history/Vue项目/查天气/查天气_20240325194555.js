// 在 Vue 实例中添加一个数组属性用来存储每天的空气质量数据
data: {
    city: "北京",
    weatherData: null,
    hotCitys: ["北京", "上海", "广州", "深圳"],
    apiKey: "a746068391a84838a3b7f28b11349149",
    airQualities: [] // 存储空气质量数据的数组
},
methods: {
    // 查询天气
    queryWeather() {
        axios
            .get(`https://geoapi.qweather.com/v2/city/lookup?key=${this.apiKey}&location=${encodeURIComponent(this.city)}`)
            .then(res => {
                const locationData = res.data.location[0];
                const cityId = locationData.id;
                this.fetchWeatherData(cityId);
                this.fetchAirQuality(cityId); // 查询空气质量数据
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
                console.log(res);
                // 将获取的空气质量数据存储到对应的位置
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
    },
}
