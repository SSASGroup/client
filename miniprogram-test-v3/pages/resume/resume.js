// pages/home/home.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumes: [],
    resOfAnswer: 0,  //用于填写完简历之后返回的操作
  },

  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  wxSearchInput() {
    this.search()
  },

  /*
  跳转至简历详情页面
  */
  nvigateToDetail: function(e) {
    let id = parseInt(e.target.id);
    let that = this;
    // console.log(id);
    // console.log(that.data)
    let resume = that.data.resumes[id]
    // console.log(resume)
    console.log(JSON.stringify(resume))
    wx.navigateTo({
      url: '/pages/resumedetail/resumedetail?data=' + JSON.stringify(resume),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.HOST + 'resume/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        idOfUser: app.globalData.openid
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          resumes: res.data
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 从简历详情页面返回时在Toast提示填写的结果
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
    let that = this;
    wx.request({
      url: app.globalData.HOST + 'resume/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        idOfUser: app.globalData.openid
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          resumes: res.data
        })
        wx.stopPullDownRefresh()
      }
    })
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