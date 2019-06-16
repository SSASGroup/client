// pages/resumeAnswerList/resumeAnswerList.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idOfResume: null, //两个用处，一是用来找到resume并停止它继续接受回答，二是根据这个id获取id为这个的简历的答案
    answersOfresume: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let idOfResume = parseInt(options.id);
    wx.request({
      url: app.globalData.HOST + 'resumeAnswerList/',
      method: 'POST',
      data: {
        idOfResume: idOfResume
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let that = this;
        let answersOfresume = that.data.answersOfresume;
        answersOfresume = res.data;
        that.setData({
          answersOfresume: answersOfresume,
          idOfResume: idOfResume
        });
        // console.log(that.data)
      }
    })
  },

  /**
   * 简历不再接受回答
   */
  stopResume: function() {
    let that = this;
    let idOfResume = that.data.idOfResume;
    wx.request({
      url: 'http://lynb.cn1.utools.club/stopResume/',
      method: 'POST',
      data: {
        idOfResume: idOfResume
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        $Toast({
          content: '已停止',
          type: 'success'
        });
      }
    })
  },

  /**
   * 
   */
  nvigateToAnswerDetail: function(e) {
    let that = this;
    let index = parseInt(e.target.id);
    let resume = that.data.answersOfresume[index];
    console.log(resume)
    wx.navigateTo({
      url: '/pages/resumeAnswerDetail/resumeAnswerDetail?resume=' + JSON.stringify(resume)
    })
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