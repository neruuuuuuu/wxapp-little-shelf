// app.js
const api = require('./config/cofig')

App({
  // 小程序启动生命周期
  onLaunch: function () {
    let that = this
    console.log('f:onLauch')
    that.checkLoginStatus()
  },
  // 检查本地storage是否有登录标识
  checkLoginStatus: function () {
    let that = this
    console.log('f:check')
    let loginFlag = that.getLoginFlag()
    // storage 有登录标识
    if (loginFlag) {
      // 检查session_key是过期(这里loginFlag是skey（加密后的session_key）)
      wx.checkSession({
        success: (res) => {
          let userStorageInfo = wx.getStorageSync('userInfo')
          if(userStorageInfo){
            that.globalData.userInfo=userStorageInfo
          }else{
            that.showInfo('缓存信息丢失')
            console.log('userStorageInfo字段丢失')
          }
        },
        // session_key过期，重新登陆
        fail:()=>{
          that.doLogin()
        }
      })
    } else {
      // storage没用登录标识
      that.doLogin()
    }
  },
  // 登录方法
  doLogin: function () {
    let that = this
    console.log('f:doLogin')
    // 调用登录接口返回 用户登录凭证 {string} code (有效时间5分钟)，
    // 需在服务器调用auth.code2Session,用code换取opdenid，session_key等信息
    wx.login({
      timeout: 10000,
      success: (loginRes) => {
          if(loginRes.code){
            console.log('用户登录凭证code：'+loginRes.code)
              /* 
                * @desc: 获取用户信息 期望数据如下 
                *
                * @param: userInfo       [Object]
                * @param: rawData        [String]
                * @param: signature      [String]
                * @param: encryptedData  [String]
                * @param: iv             [String]
                **/
            wx.getUserInfo({
              withCredentials:true,
              success:(infoRes)=>{
                console.log('用户信息'+JSON.stringify(infoRes))
                // 向服务器发送登录请求
                wx.request({
                  url: api.loginUrl,
                  data:{
                    code:loginRes.code, 
                    rawData:infoRes.rawData,
                    signature:infoRes.signature,
                    encryptedData:infoRes.encryptedData,
                    iv:infoRes.iv
                  },
                  success:(res)=>{
                    console.log('登录请求成功'+JSON.stringify(res))
                    res = res.data
                    // 登录成功后，把userInfo设置为app全局数据，在storage设置userInfo和loginFlag
                    if(res.result == 0){
                      that.globalData.userInfo = res.userInfo
                      wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
                      wx.setStorageSync('loginFlag', res.skey)
                      // callback()
                    }else{
                      that.showInfo(res.errMsg)
                    }
                  },
                  fail:(error)=>{
                      that.showInfo('登录请求失败')
                      console.log(error)
                  }
                })
              }
            })   
          }else{
            that.showInfo('登陆失败')
            console.log('获取code失败')
          }
      },
      fail: (error) => {
        that.showInfo('登录接口调用失败')
        console.log(error)
       },
      complete: () => { }
    })
  },
  // 获取用户登录标识，供全局调用
  getLoginFlag: function(){
    console.log('获取登录标识')
    return wx.getStorageSync('loginFlag') 
  },
  // 封装wx.showToasr方法
  showInfo:function(title,icon){
      wx.showToast({
        title: title,
        icon :icon,
        mask:true
      })
  },
  // app全局数据
  globalData:{
    userInfo:null
  }
})
