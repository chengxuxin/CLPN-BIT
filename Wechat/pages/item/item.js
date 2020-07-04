Page({
    data: {
        title: "Title",
        startTime: "00:00",
        endTime: "23:59",

      positions: ['12号学生公寓', '信教', '研教', '第七食堂'],
      objectArray: [
        {
          id: 0,
          name: '12号学生公寓',
          longi: '116.313318',
          lati: '39.960305'
        },
        {
          id: 1,
          name: '信教',
          longi: '116.316697',
          lati: '39.957792'
        },
        {
          id: 2,
          name: '研教',
          longi: '116.318500',
          lati: '39.957930'
        },
        {
          id: 3,
          name: '第七食堂',
          longi: '116.313055',
          lati: '39.957319'
        }
      ],
      index1: 0,
      index2: 0
    },
    startTimeChange: function (e) {
        this.setData({ startTime: e.detail.value });
    },
    endTimeChange: function (e) {
        this.setData({ endTime: e.detail.value });
    },
    STTpositionChange: function (e) {
        this.setData({index1: e.detail.value});
    },
    ENDpositionChange: function (e) {
        this.setData({index2: e.detail.value });
    },
    formSubmit: function (e) {
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
                        index1: that.data.index1,
                        index2: that.data.index2,
                        longi:that.data.objectArray[that.data.index1].longi,
                        longi1: that.data.objectArray[that.data.index2].longi,
                        lati: that.data.objectArray[that.data.index1].lati,
                        lati1: that.data.objectArray[that.data.index2].lati,
                    }),
                    complete: function (e) {
                        wx.navigateBack();
                    }
                });
            }
        })

    },
    formReset: function () {
    },
  
  tip: function () {
    //成功
    wx.showModal({
      title: '宝贝',
      content: '你的提醒事项已保存',
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
  }
})

//indicator-dots="true" circular="true" autoplay="true" interval="3000" duration="100" vertical="true"
//: {{item.startTime}} - {{item.endTime}}
/* <view class="page_bd">
    <view class="section section_gap swiper">
    
    <label class="checkbox" wx:for="{{plans}}">
            <checkbox value="{{item.name}}" checked="{{item.checked}}            "/>{{item.value}}
            </label>*/