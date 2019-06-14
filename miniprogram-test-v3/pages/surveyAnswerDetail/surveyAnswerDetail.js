// pages/surveyAnswerDetail/surveyAnswerDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    survey: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let survey = that.data.survey;
    survey = JSON.parse(options.survey)
    that.setData({
      survey
    })
    console.log(that.data)
  },

  /**
   * 选项不可变
   */
  handleRadioChange: function(e) {
    // var that = this;
    // var id = e.target.id;
    // let survey = that.data.survey;
    // survey.questions[id].current = e.detail.value;
    // that.setData({
    //   survey
    // });
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