// pages/releaseSurvey/releaseSurvey.js
const { $Toast } = require('../../dist/base/index');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showQuestion: false,
    temQuestion: {
      title: null,
      radio: true,
      current: null,
      choices: [null, null, null, null]
    },
    survey: {
      title: null,
      description: null,
      numOfQustions: 0,
      id: 123,
      idOfUploader: 123,
      questions: [
        // {
        //   title: '1',
        //   radio: true,
        //   current: null,
        //   choices: ['1', '2', '3', '4']
        // }
      ]
    }
  },

  /**
   * 
   */
  handleTitleChange: function(e) {
    let that = this;
    let survey = that.data.survey;
    survey.title = e.detail.detail.value;
    that.setData({
      survey
    })
  },

  /**
   * 
   */
  handleDescriptionChange: function(e) {
    let that = this;
    let survey = that.data.survey;
    survey.description = e.detail.detail.value;
    that.setData({
      survey
    })
  },

  /**
   * 添加问题
   */
  addQuestion: function(e) {
    let that = this;
    that.setData({
      showQuestion: true
    });
  },

  /**
   * 添加问题时的问题名称handle事件
   */
  handleQuetionTitleChange: function(e) {
    console.log(e);
    let that = this;
    let temQuestion = that.data.temQuestion;
    temQuestion.title = e.detail.detail.value;
    that.setData({
      temQuestion
    })
  },

  /**
   * 添加问题时选项1的handle事件
   */
  handleChoice1Change: function(e) {
    console.log(e)
    let that = this;
    let temQuestion = that.data.temQuestion;
    temQuestion.choices[0] = e.detail.detail.value;
    that.setData({
      temQuestion
    })
  },

  /**
   * 添加问题时选项2的handle事件
   */
  handleChoice2Change: function (e) {
    console.log(e)
    let that = this;
    let temQuestion = that.data.temQuestion;
    temQuestion.choices[1] = e.detail.detail.value;
    that.setData({
      temQuestion
    })
  },

  /**
   * 添加问题时选项3的handle事件
   */
  handleChoice3Change: function (e) {
    console.log(e)
    let that = this;
    let temQuestion = that.data.temQuestion;
    temQuestion.choices[2] = e.detail.detail.value;
    that.setData({
      temQuestion
    })
  },

  /**
   * 添加问题时选项4的handle事件
   */
  handleChoice4Change: function (e) {
    console.log(e)
    let that = this;
    let temQuestion = that.data.temQuestion;
    temQuestion.choices[3] = e.detail.detail.value;
    that.setData({
      temQuestion
    })
  },

  /**
   * fxxk
   */
  confirm: function(e) {
    console.log('confirm');
    let that = this;
    let survey = that.data.survey;
    let temQuestion = that.data.temQuestion;
    if (temQuestion.title == null || temQuestion.choices[0] == null || temQuestion.choices[1] == null
      || temQuestion.choices[2] == null || temQuestion.choices[3] == null) {
        $Toast({
          content: '请输入正确信息',
          type: 'warning'
        });
      }
    else {
      survey.questions[survey.numOfQustions] = temQuestion;
      survey.numOfQustions += 1;
      temQuestion = {
        title: null,
        radio: true,
        current: null,
        choices: [null, null, null, null]
      };
      console.log(survey);
      console.log(temQuestion);
      that.setData({
        survey: survey,
        temQuestion: temQuestion,
        showQuestion: false
      })
    }
  },

  /**
   * 
   */
  handleSubmitClick: function(e) {
    console.log('submit');
    let that = this;
    let survey = that.data.survey;
    if(survey.title == null || survey.description == null || survey.questions.length == 0) {
      $Toast({
        content: '请输入正确信息',
        type: 'warning'
      });
    }
    else {
      console.log(survey);
      app.globalData.surveys.push(survey);
    }
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