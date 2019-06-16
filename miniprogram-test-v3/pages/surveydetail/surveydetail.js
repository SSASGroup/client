// pages/surveydetail/surveydetail.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    survey: {
      // title: 'title',
      // description: '',
      // numOfQustions: 2,
      // id: 123,
      // idOfUploader: 123,
      // questions: []}
      // ]
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
    let that = this;
    let survey = that.data.survey;
    let questions = survey.questions;
    let flag = false;
    for (let i = 0; i < questions.length; i++) {
      if(questions[i].current == null) {
        flag = true;
        break;
      }
    }
    if(flag) {
      $Toast({
        content: '请填写全部问题',
        type: 'warning'
      });
    }else {

      survey.nameOfUser = app.globalData.userInfo.nickName;
      survey.answerer = app.globalData.openid;
      that.setData({
        survey
      })
      console.log(this.data.survey);
      wx.request({
        url: app.globalData.HOST + 'submitSurvey/',
        // url: 'http://localhost:8000/submitSurvey/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          answer: JSON.stringify(survey)
        },
        success: (res) => {
          console.log(res)
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.setData({
            resOfAnswer: res.data
          })
          console.log(prevPage.data.resOfAnswer)
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * 获取从home传来的survey信息
   */
  onLoad: function (options) {
    let that = this;
    let survey = that.data.survey;
    survey = JSON.parse(options.data)
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