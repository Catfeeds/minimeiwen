var app = getApp();
Page({
  data:{
    datas:[]


  },
  onLoad:function(options){
      
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
      var that = this;
      wx.request({
          url: app.d.ceshiUrl + '/Api/Index/index',
          method: 'post',
          data: {

          },
          header: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },

          success: function (res) {
              console.log(res.data);
              that.setData({
                  datas: res.data.notes
              });
          },
          error: function (e) {
              wx.showToast({
                  title: '网络异常！',
                  duration: 2000,
              });
          },

      });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clickShowList:function(event){
      console.log(event)
    wx.navigateTo({url:"../list/list?noteId="+event.currentTarget.dataset.id});
  },
  getzan:function(e){
    var that = this; 
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.request({
        url: app.d.ceshiUrl + '/Api/Notes/getzan',
        method: 'post',
        data: {
            id:id
        },
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        success: function (res) {
            if(res.data.status == 1){
                wx.showToast({
                    title: res.data.err,
                });
            that.onShow();
            }else{
                wx.showToast({
                    title: res.data.err,
                })
            }
           
        },
        error: function (e) {
            wx.showToast({
                title: '网络异常！',
                duration: 2000,
            });
        },

    });
  }
})