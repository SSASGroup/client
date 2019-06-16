// pages/myResume/myResume.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.HOST + 'myResume/',
      // url: 'http://localhost:8000/mySurvey/',
      method: 'POST',
      data: {
        id: app.globalData.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let that = this;
        let resumes = that.data.resumes;
        resumes = res.data;
        console.log(resumes);
        that.setData({
          resumes
        })
      },
      fail: (res) => {
        
      },
      complete: (res) => {
        
      }
    })
  },

  /**
   *跳转至简历的答案列表页面 
   */
  nvigateToAnswerList: function(e) {
    let that = this;
    let id = e.target.id;
    wx.navigateTo({
      url: '/pages/resumeAnswerList/resumeAnswerList?id=' + that.data.resumes[id].id
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