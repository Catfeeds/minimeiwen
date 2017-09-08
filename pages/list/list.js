var app = getApp();
//引入这个插件，使html内容自动转换成wxml内容
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    // text:"这是一个页面"
    datas:[],
    currSize:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var noteId = options.noteId;
    var that = this;
    console.log(options)
    wx.request({
        url: app.d.ceshiUrl + '/Api/Notes/detail',
        method: 'post',
        data: {
            note_id: noteId,
        },
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        success: function (res) {
            console.log(res.data);
            //--init data 
            var status = res.data.status;
            if (status == 1) {
                var content = res.data.content;
                WxParse.wxParse('content', 'html', content, that, 8);
                that.setData({
                   
                });
                console.log(that.data.prodetail2);
            } else {
                wx.showToast({
                    title: "没有数据",
                    duration: 2000,
                });
            }
        },
        error: function (e) {
            wx.showToast({
                title: '网络异常！',
                duration: 2000,
            });
        },

    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clickShowContent:function(event){
    console.log("====="+event.target.id);
     wx.navigateTo({url:"../content/content?data="+event.target.id});
  }
})