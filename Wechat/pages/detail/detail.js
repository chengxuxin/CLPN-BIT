// pages/detail/detail.js
//var app=getApp()
Page({
  data: {
    title: "Title",
    startTime: "00:00",
    endTime: "23:59",
    idx:0,
    i:0,
    plan: [1,2, 3, 4, 5, 6],
    positions: ['12号学生公寓', '信教', '研教', '第七食堂'],
    objectArray: [
      {
        id: 0,
        name: '12号学生公寓'
      },
      {
        id: 1,
        name: '信教'
      },
      {
        id: 2,
        name: '研教'
      },
      {
        id: 3,
        name: '第七食堂'
      }
    ],
    index1: 0,
    index2: 0
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      idx:options.idd
    })
    wx.getStorage({
      key: 'plans',
      success: function(res) {
        that.setData({
        plan: res.data
        })
      }
    })
    /*var i = this.data.idx
    var crt = this.data.plan[1].endtime
    that.setData({ 
      endTime: crt
    })*/
    
    //var fuck = plan[options.idd].endTime
    
    
  },
  crt: function(e){
    //var that=this
    var i=this.data.idx
    this.setData({
      startTime: this.data.plan[i].startTime,
      endTime: this.data.plan[i].endTime,
      index1: this.data.plan[i].index1,
      index2: this.data.plan[i].index2
    })
  },
  delete: function(e){
    //let carts = this.data.carts;
    //const id = e.currentTarget.id
    this.data.plan.splice(this.data.idx, 1);
    this.setData({
      plan: this.data.plan
    })
    wx.clearStorage()
    wx.setStorage({
      key: "plans",
      data: this.data.plan
    })
    wx.showModal({
      title: '宝贝',
      content: '你的提醒事项已删除',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '../index/index'
          })
        }
        
      }
    })
  },

  change: function (e) {
    //let carts = this.data.carts;
    //const id = e.currentTarget.id
    var i = this.data.idx
    this.data.plan[i].startTime=this.data.startTime;
    this.data.plan[i].endTime = this.data.endTime;
    this.data.plan[i].index1 = this.data.index1;
    this.data.plan[i].index2 = this.data.index2;
    wx.clearStorage()
    wx.setStorage({
      key: "plans",
      data: this.data.plan
    })
    wx.showModal({
      title: '宝贝',
      content: '你的提醒事项已修改',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '../index/index'
          })
        }
        
      }
    })
  },
  startTimeChange: function (e) {
    this.setData({ startTime: e.detail.value });
  },
  endTimeChange: function (e) {
    this.setData({ endTime: e.detail.value });
  },
  STTpositionChange: function (e) {
    this.setData({ index1: e.detail.value });
  },
  ENDpositionChange: function (e) {
    this.setData({ index2: e.detail.value });
  },
  /*formSubmit: function (e) {
    this.setData({ title: e.detail.value.title });
    var that = this
    wx.getStorage({
      key: 'plans',
      success: function (res) {
        // success
      },
      complete: function (res) {
        wx.setStorage({
          key: 'plans',
          data: (res.data ? res.data : []).concat({
            title: that.data.title,
            startTime: that.data.startTime,
            endTime: that.data.endTime,
            STTposition: that.data.STTposition,
            ENDposition: that.data.ENDposition

          }),
          complete: function (e) {
            wx.navigateBack();
          }
        });
      }
    })

  },
  formReset: function () {
  },*/

  tip: function () {
    //成功
    wx.showModal({
      title: '宝贝',
      content: '你的提醒事项已删除',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
})