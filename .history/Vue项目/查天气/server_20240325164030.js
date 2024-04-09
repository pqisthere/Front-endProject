// server.js

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;
    const apiKey = process.env.API_KEY; // 从环境变量中获取 API 密钥
    const locationRes = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?key=${apiKey}&location=${encodeURIComponent(city)}`);
    const locationData = locationRes.data.location[0];
    const cityId = locationData.id;
    const weatherRes = await axios.get(`https://devapi.qweather.com/v7/weather/3d?key=${apiKey}&location=${cityId}`);
    res.json(weatherRes.data.daily);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
