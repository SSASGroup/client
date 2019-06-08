// pages/surveydetail/surveydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    survey: {
      numOfQustions: 5,
      idOfUploader: 123,
      current: '1',
      questions: [
        { title: '问题1', 
          Radio: true,
          current: '1',
          choices: [
          '1', '2', '3', '4'
        ]},
        { title: '问题2', 
          Radio: false,
          current: '5', 
          choices: [
          '5', '6', '7'
        ]}
      ]
    }
  },

  handleChange: function(e) {
    var that = this
    var id = e.target.id
    // console.log(id)
    let survey = that.data.survey
    // console.log(new_survey)
    // console.log(survey.questions[0])
    survey.questions[id].current = e.detail.value
    that.setData({
      survey
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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