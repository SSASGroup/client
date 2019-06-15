// pages/home/home.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumes: []
  },

  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  wxSearchInput() {
    this.search()
  },

  /*
  跳转至简历详情页面
  */
  nvigateToDetail: function(e) {
    let id = parseInt(e.target.id);
    let that = this;
    // console.log(id);
    // console.log(that.data)
    let resume = that.data.resumes[id]
    // console.log(resume)
    console.log(JSON.stringify(resume))
    wx.navigateTo({
      url: '/pages/resumedetail/resumedetail?data=' + JSON.stringify(resume),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.HOST + 'resume/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        idOfUser: app.globalData.openid
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          resumes: res.data
        })
      }
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
    let that = this;
    wx.request({
      url: app.globalData.HOST + 'resume/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        idOfUser: app.globalData.openid
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          resumes: res.data
        })
        wx.stopPullDownRefresh()
      }
    })
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