var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var app = getApp();

Page({
  data: {
    markers: [{
      iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: '3.9587260868',
      longitude: '116.3186234236',
      width: 23,
      height: 33
    }, {
      iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
        latitude: '40.9602885778',
      longitude: '116.3133770227',
      width: 24,
      height: 34
    }],
    distance: '',
    time: '',
    cost: '',
    polyline: [],
    plans: [],
  
    index: 0,
    show_flag: 0
  },
  onLoad: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    wx.getStorage({
      key: 'plans',
      success: function (res) {
        that.setData({
          plans: res.data
        })
      }
    })
  },
  goDetail: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });

    var route_num = 0;
    var end_coor = '116.3133770227,39.9602885778';
    var start_coor = '116.581028,39.9592770746';
    var show_coo = '';
    var title = [];
    var length = 0;
    var longi_tmp = '';
    var lati_tmp = '';
    var longi_tmp_end='';
    var lati_tmp_end = '';

    if(that.data.plans.length > 6)
    {
      length = 6;
    }
    else{
      length = that.data.plans.length;
    }
    for (var i = 0; i <that.data.plans.length  ;i++)
    {
      title.push(that.data.plans[i].title);
      console.log(title);
    }

  //得到储存数据plans
    wx.getStorage({
      key: 'plans',
      success: function (res) {
        that.setData({
          plans: res.data
        })

        wx.showActionSheet({
          itemList: title,
          success: function (res) {
            if (!res.cancel) {
              that.setData({ index: res.tapIndex });
              route_num = res.tapIndex;
              console.log(res.tapIndex);//这里是点击了那个按钮的下标

              route_num = that.data.index;

              longi_tmp = String(that.data.plans[route_num].longi);
              //longi_tmp = String(116.3186234236);
              console.log(that.data.plans[route_num].longi);
              lati_tmp = String(that.data.plans[route_num].lati);
              //lati_tmp = String(39.087260868);

              //得到开始的坐标
              start_coor = longi_tmp + ',' + lati_tmp;

              console.log(start_coor);

              longi_tmp_end = String(that.data.plans[route_num].longi1);
              //longi_tmp = String(116.3186234236);
              console.log(that.data.plans[route_num].longi1);
              lati_tmp_end = String(that.data.plans[route_num].lati1);

              //lati_tmp = String(39.087260868);
              //得到结束的坐标
              end_coor = longi_tmp_end + ',' + lati_tmp_end;

              console.log(end_coor);
              that.setData({
                'markers[0].longitude': longi_tmp,
                'markers[0].latitude': lati_tmp,
                'markers[1].longitude': longi_tmp_end,
                'markers[1].latitude': lati_tmp_end

              })

              myAmapFun.getWalkingRoute({
                origin: start_coor,
                destination: end_coor,
                success: function (data) {
                  var points = [];
                  if (data.paths && data.paths[0] && data.paths[0].steps) {
                    var steps = data.paths[0].steps;
                    for (var i = 0; i < steps.length; i++) {
                      var poLen = steps[i].polyline.split(';');
                      for (var j = 0; j < poLen.length; j++) {
                        points.push({
                          longitude: parseFloat(poLen[j].split(',')[0]),
                          latitude: parseFloat(poLen[j].split(',')[1])
                        })
                      }
                    }
                  }
                  that.setData({
                    polyline: [{
                      points: points,
                      color: "#0091ff",
                      width: 6
                    }]
                  });
                  if (data.paths[0] && data.paths[0].distance) {
                    that.setData({
                      distance: data.paths[0].distance + '米',
                    })
                   
                    var time_tmp = data.paths[0].distance / 60;

                    that.setData({
                      time: time_tmp + '分钟'
                    })
                    console.log(that.data.temp)
                    ;
                  }
                },
                fail: function (info) {
                }
              })
            }
          }
        });
        //得到选中的编号
 
      }
    })
//定义框框得到的数据
   


      
    
    //}
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  }
})