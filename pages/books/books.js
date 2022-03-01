// pages/books/books.js

const api = require('../../config/cofig')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookList: []
    },

    /**
     *  调用接口，获取书籍列表 
     */
    getBookList:function(){
        let that = this

        wx.request({
          url: api.getBooksUrl,
          data:{
              is_all:1
         },
        success:(res)=>{
            let data = res.data
            console.log(data)
            if(data.result === 0){
                that.setData({
                    bookList:data.data
                })
            }
        },
        error:(err)=>{
            console.log(err)
        }
        })
    },

    /**
     * 打开书籍详情页面
     */
    goDetail:function(ev){
        let dataset = ev.currentTarget.dataset
        console.log(dataset)
        let navigateUrl = '../detail/detail?id='+dataset.id
        wx.navigateTo({
          url: navigateUrl,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.getBookList()
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