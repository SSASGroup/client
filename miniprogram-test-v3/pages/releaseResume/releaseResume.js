// pages/releaseResume/releaseResume.js
const { $Toast } = require('../../dist/base/index');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showQuestion: false,
    temQuestion: null,
    resume: {
      title: null,
      publisher_id: null,
      description: null,
      questions: [
        
      ]  
    }
  },


  /**
   * 简历名称change事件
   */
  handleTitleChange: function(e) {
    let that = this;
    let resume = that.data.resume;
    resume.title = e.detail.detail.value;
    that.setData({
      resume
    })
  },

  /**
   * 简历描述change事件
   */
  handleDescriptionChange: function(e) {
    let that = this;
    let resume = that.data.resume;
    resume.description = e.detail.detail.value;
    that.setData({
      resume
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
    temQuestion = e.detail.detail.value;
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
    let resume = that.data.resume;
    let temQuestion = that.data.temQuestion;
    if (temQuestion == null) {
        $Toast({
          content: '请输入正确信息',
          type: 'warning'
        });
      }
    else {
      resume.questions.push(temQuestion);
      temQuestion = null;
      console.log(resume);
      console.log(temQuestion);
      that.setData({
        resume: resume,
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
    let resume = that.data.resume;
    if(resume.title == null || resume.description == null || resume.questions.length == 0) {
      $Toast({
        content: '请输入正确信息',
        type: 'warning'
      });
    }
    else {
      console.log(resume);
      app.globalData.resumes.push(resume);
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