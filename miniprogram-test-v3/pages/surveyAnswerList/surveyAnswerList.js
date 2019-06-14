// pages/surveyAnswerList/surveyAnswerList.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idOfSurvey: null,
    answersOfsurvey: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = parseInt(options.id);
    wx.request({
      url: 'http://lynb.cn1.utools.club/surveyAnswerList/',
      method: 'POST',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let that = this;
        let answersOfsurvey = that.data.answersOfsurvey;
        answersOfsurvey = res.data;
        that.setData({
          answersOfsurvey: answersOfsurvey,
          idOfSurvey: id
        });
        console.log(that.data)
      }
    })
  },

  
  stopSurvey: function (e) {
    let that = this;
    let idOfSurvey = that.data.idOfSurvey;
    wx.request({
      url: 'http://lynb.cn1.utools.club/stopSurvey/',
      method: 'POST',
      data: {
        id: idOfSurvey
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

  nvigateToAnswerDetail: function (e) {
    let that = this;
    let index = parseInt(e.target.id);
    let survey = that.data.answersOfsurvey[index];
    console.log(survey)
    wx.navigateTo({
      url: '/pages/surveyAnswerDetail/surveyAnswerDetail?survey=' + JSON.stringify(survey)
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