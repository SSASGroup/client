// pages/resumedetail/resumedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    resume: {
      title: '简历title',
      idOfUploader: 123,
      id: 123,
      showImg: false,
      imgSrc: 'http://www.sysu.edu.cn/2012/images/content/2012-11/20121109221446303940.jpg',
      questions: [
        {title: '问题1', answer: null},
        {title: '问题2', answer: null}
      ],
      answers: []
    }
  },

  
  /**
   * 选择图片
   */
  selectImg: function() {
    let that = this;
    let resume = that.data.resume;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // console.log(tempFilePaths);
        resume.imgSrc = tempFilePaths[0];
        resume.showImg = true;
        that.setData({
          resume
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
    console.log(e)
    let id = e.target.id;
    console.log(id)
    console.log(resume.answers)
    resume.answers[id] = e.detail.detail.value;
    that.setData({
      resume
    });
  },

  /**
   * 提交简历
   */
  handleSubmitClick: function(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let resume = that.data.resume;
    resume.answers = new Array(resume.questions.length);
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