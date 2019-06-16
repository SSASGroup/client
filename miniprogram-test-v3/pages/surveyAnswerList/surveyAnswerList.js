// pages/surveyAnswerList/surveyAnswerList.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idOfSurvey: null, //两个用处，一是用来找到survey并停止它继续接受回答，二是根据这个id获取id为这个的问卷的答案
    answersOfsurvey: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let idOfSurvey = parseInt(options.id);
    wx.request({
      url: app.globalData.HOST + 'surveyAnswerList/',
      method: 'POST',
      data: {
        idOfSurvey: idOfSurvey
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
          idOfSurvey: idOfSurvey
        });
        console.log(that.data)
      }
    })
  },

  /**
   * 问卷不再接受回答
   */
  stopSurvey: function (e) {
    let that = this;
    let idOfSurvey = that.data.idOfSurvey;
    wx.request({
      url: app.globalData.HOST + 'stopSurvey/',
      method: 'POST',
      data: {
        idOfSurvey: idOfSurvey
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