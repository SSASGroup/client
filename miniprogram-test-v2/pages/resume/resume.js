// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumes: [
      { id: 1, title: '简历1', description: '学生会招新' },
      { id: 2, title: '简历2', description: '团委招新' },
      { id: 3, title: '简历3', description: '院队招新' }
    ]
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
  nvigateToDetail() {
    wx.navigateTo({
      url: '/pages/resumedetail/resumedetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://localhost:8000/polls/2',
    //   success: function(res) {
    //     console.log(res.data)
    //   }
    // })
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