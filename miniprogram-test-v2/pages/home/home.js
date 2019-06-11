// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: [
      { id: 1, title: 'task1', description: '问卷1' },
      { id: 2, title: 'taks2', description: '问卷2' },
      { id: 3, title: 'taks3', description: '问卷3' }
    ]
  },

  search () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  wxSearchInput () {
    this.search()
  },

  /*
  跳转至问卷详情页面
  */
  nvigateToDetail() {
    wx.navigateTo({
      url: '/pages/surveydetail/surveydetail',
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