/*
  1:歌曲搜索接口
    请求地址:https://dataiqs.com/api/netease/music
    请求方法:get
    请求参数:msg(歌曲名)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://dataiqs.com/api/netease/music
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址

*/
var app = new Vue({
    el: "#player",
    data: {
        // 查询关键字
        query: "",
        // 歌曲数组
        musicList: [],
        // 歌曲地址
        musicUrl: "",
        // 动画播放状态
        isPlaying: false,
        // 遮罩层的显示状态
        isShow: false,

    },
    methods: {

        //歌曲搜索
        searchMusic: function () {
            var that = this;
            axios.get("https://dataiqs.com/api/netease/music/?msg=" + this.query)
                .then(function (response) {
                    that.musicList = response.data.data;
                    console.log(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        //歌曲播放
        playMusic: function (musicId) {
            var that = this;
            axios.get("https://dataiqs.com/api/netease/music/?type=songid&id=" + musicId)
                .then(function (response) {
                    that.musicUrl = response.data.song_url;
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        },

        // 歌曲播放
        play: function () {
            // console.log("play");
            this.isPlaying = true;
        },

        // 歌曲暂停
        pause: function () {
            // console.log("pause");
            this.isPlaying = false;
        },

        // 隐藏
        hide: function () {
            this.isShow = false;
        }
    }
});
