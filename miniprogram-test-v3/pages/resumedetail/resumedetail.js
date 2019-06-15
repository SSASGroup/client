// pages/resumedetail/resumedetail.js
var app = getApp();
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: null,
    showImg: false,
    resume: {
      // title: '简历title',
      // idOfUploader: 123,
      // id: 123,
      // showImg: false,
      // imgSrc: null,
      // questions: [],
      // answers: []
    }
  },

  
  /**
   * 选择图片
   */
  selectImg: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          imgSrc: tempFilePaths[0],
          showImg: true
        });
      }
    });
  },


  /**
   * 输入的Change事件 
   */
  handleInputChange: function(e) {
    let that = this;
    let resume = that.data.resume;
    let id = parseInt(e.target.id);
    console.log(id)
    resume.questions[id].answer = e.detail.detail.value;
    that.setData({
      resume
    });
  },

  /**
   * 提交简历
   */
  handleSubmitClick: function(e) {
    let that = this;
    if(that.data.imgSrc == null) {
      $Toast({
        content: '请选择照片',
        type: 'warning'
      });
    }else {
      let flag = false;//判断有没有填写全部问题
      let questions = that.data.resume.questions;
      for (let i = 0; i < questions.length; i++) {
        if(questions[i].answer == null) {
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
        let resume = that.data.resume;
        
        console.log(resume)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * 获取从home传来的resume信息
   */
  onLoad: function (options) {
    let that = this;
    let resume = that.data.resume;
    resume = JSON.parse(options.data)
    console.log(options)
    that.setData({
      resume
    });
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