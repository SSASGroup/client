// pages/resumeAnswerDetail/resumeAnswerDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resume: null //其实是带答案的简历
  },

  /**
   * 生命周期函数--监听页面加载
   * 获取从resumeAnswerList传来的数据
   */
  onLoad: function (options) {
    let that = this;
    let resume = that.data.resume;
    resume = JSON.parse(options.resume);
    resume.imgSrc = app.globalData.HOST + resume.imgSrc.substr(1, resume.imgSrc.length);
    that.setData({
      resume
    })
    console.log(that.data)
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