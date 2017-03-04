var utils = require('../../utils/utils');
Page({
  data:{
    weatherData:{},
    isSelected:false,
  },
  onLoad:function(options){
    var that = this;
    utils.getLocation(function(latlon){
      utils.request({
          city:latlon,
          success:function(res){
            utils.getData(res,function(data){
              that.setData({
                weatherData:data
              });
            });
          }
        });
    });
  },
  onPullDownRefresh: function() {
    this.setData({
      isSelected:true,
    })
  },
  onConfim:function(event){
    var query = event.detail.value;
    var that = this;
    utils.request({
      city:query,
      success:function(res){
        utils.getData(res,function(data){
          if(data == -3){
             wx.showToast({
              title:'请输入正确的城市名称',
              duration:1000,
              mask:true
            });
            that.setData({
              isSelected:true
            })
          }else{
            that.setData({
              weatherData:data,
              isSelected:false
            });
          }
        });
      }
    });
    this.setData({
      isSelected:false
    });
  },
  // onBlur:function(event){
  //   this.setData({
  //     isSelected:false
  //   })
  // },
  onCancel:function(){
    this.setData({
      isSelected:false
    })
  },
  onClick:function(){
    this.setData({
      isSelected:false
    });
  },
  onLocation:function(){
    var that = this;
    utils.getLocation(function(latlon){
      utils.request({
        city:latlon,
        success:function(res){
          utils.getData(res,function(data){
            that.setData({
              weatherData:data,
              isSelected:false
            });
          });
        }
      });
    });
  }
})