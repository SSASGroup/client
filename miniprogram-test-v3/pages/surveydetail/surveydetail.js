// pages/surveydetail/surveydetail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    survey: {
      title: 'title',
      description: '',
      numOfQustions: 2,
      id: 123,
      idOfUploader: 123,
      questions: [
        { title: '问题1', 
          radio: true,
          current: null,
          choices: [
          '1', '2', '3', '4'
        ]},
        { title: '问题2', 
          radio: true,
          current: null, 
          choices: [
          '5', '6', '7'
        ]}
      ]
    }
  },
  
  /*
  单选题的Change事件
  */
  handleRadioChange: function(e) {
    var that = this;
    var id = e.target.id;
    // console.log(id)
    let survey = that.data.survey;
    // console.log(new_survey)
    // console.log(survey.questions[0])
    survey.questions[id].current = e.detail.value;
    that.setData({
      survey
    });
  },

  /*
  多选题的Change事件
  */
  handleCheckboxChange: function(e) {
    var that = this;
    var id = e.target.id;
    let survey = that.data.survey;
    const index = survey.questions[id].current.indexOf(e.detail.value);
    index === -1 ? survey.questions[id].current.push(e.detail.value) : survey.questions[id].current.splice(index, 1);
    that.setData({
      survey
    });
    // console.log(survey.questions[id].current)
  },

  /*
  提交问卷
  */
  handleSubmitClick: function(e) {
    console.log(this.data.survey);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let survey = that.data.survey;
    if(app.globalData.surveys.length > 0)
      survey = app.globalData.surveys[0];
    that.setData({
      survey
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