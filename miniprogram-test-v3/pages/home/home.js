// pages/home/home.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    resOfAnswer: 0,  //用于填写完问卷之后返回的操作
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    surveys: [
      // { id: 1, title: 'task1', description: '问卷1' },
      // { id: 2, title: 'taks2', description: '问卷2' },
      // { id: 3, title: 'taks3', description: '问卷3' }
    ]
  },

  search () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  wxSearchInput () {
    this.search()
  },

  /*
  跳转至问卷详情页面
  */
  nvigateToDetail: function(e) {
    console.log(e)
    let id = e.target.id;
    let that = this;
    let survey = that.data.surveys[id]
    wx.navigateTo({
      url: '/pages/surveydetail/surveydetail?data=' + JSON.stringify(survey)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     if (app.globalData.userInfo) {
      console.log(1)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(2)
      app.userInfoReadyCallback = res => {
        console.log(5)
        app.globalData.userInfo = res.userInfo
        this.login()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log(3)
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },

  getUserInfo: function(e) {
    // console.log(4)
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.login()
  },

  /**
   * 
   */
  login: function () {
    let that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          url: 'http://lynb.cn1.utools.club/login/',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code,
            // nickName: app.globalData.userInfo.nickName,
            // avatarUrl: app.globalData.userInfo.avatarUrl,
          },
          success: function(res1) {
            // console.log(res1);
            app.globalData.openid = res1.data;
            that.setData({
              login: true
            });
            console.log(res1)
            // 向后台请求问卷
            let surveys = that.data.surveys;
            wx.request({
              url: 'http://lynb.cn1.utools.club/home/',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                idOfReleaser: res1.data
              },
              success: function(res) {
                console.log(res.data)
                surveys = res.data;
                that.setData({
                  surveys
                })
              }
            })  
          },
          fail: function(error) {console.log('fail')}
        })
      }
    });
    // console.log(app.globalData)
    // let surveys = that.data.surveys;
    // wx.request({
    //   url: 'http://lynb.cn1.utools.club/home/',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     idOfReleaser: app.globalData.openid
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //     surveys = res.data;
    //     that.setData({
    //       surveys
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    console.log(that.data.resOfAnswer)
    if(that.data.resOfAnswer == 'payed') {
      $Toast({
        content: 'You get paid！',
        type: 'success'
      });
      that.setData({
        resOfAnswer: 0
      })
    }else if(that.data.resOfAnswer == 'bad') {
      $Toast({
        content: '发布者余额不足',
        type: 'warning'
      });
      that.setData({
        resOfAnswer: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})