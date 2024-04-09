import axios from 'axios';

axios.get('/weather').then(() => {
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
                    .get('/weather', {
                        params: {
                            city: this.city
                        }
                    })
                    .then(res => {
                        this.weatherData = res.data;
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
});
