const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = 'a746068391a84838a3b7f28b11349149'; // 替换为你的天气 API 密钥

// 创建一个路由来代理 API 请求
app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;
    // 使用 axios 向天气 API 发送请求
    const geoResponse = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?key=${apiKey}&location=${encodeURIComponent(city)}`);
    const cityId = geoResponse.data.location[0].id;
    const weatherResponse = await axios.get(`https://devapi.qweather.com/v7/weather/3d?key=${apiKey}&location=${cityId}`);
    // 将 API 响应发送给客户端
    res.send(weatherResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
