module.exports={
  getUrl:function(city){
    return 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=lO7jewdyDb8Lyub1LHMCjgLf1sbBpTGo'
  },
  getData:function(data,callback){
    var errorCode = data.data.error;
    if(errorCode == 0){
        var currentDay = data.data.results[0].weather_data[0];
        var future = data.data.results[0].weather_data
        for(var i = 0;i<future.length;i++){
          future[i].date = future[i].date.substring(0,2);
        }
        var weatherData = {
          tem:currentDay.temperature,
          wind:currentDay.wind,
          tips:data.data.results[0].index,
          currentCity:data.data.results[0].currentCity,
          pm25:data.data.results[0].pm25,
          future:future,
          error:errorCode
        }
        callback(weatherData);
    }else{
      callback(errorCode);
    }
  },
  request:function(obj){
    var that = this;
    wx.request({
      url: that.getUrl(obj.city),
      method: 'GET',
      header: {
        'Content-Type': 'json'
      }, 
      success: function(data){
        if(obj['success']){
          obj['success'](data);
        }
      },
      error:function(error){
        if(obj['error']){
          obj['error'](error);
        }
      }
    })
  },
  getLocation:function(callback){
    wx.getLocation({
      type: 'gcj02', 
      success: function(res){
        var lat = res.latitude;
        var lon = res.longitude;
        var latlon = lon+','+lat;
        callback(latlon);
      }
    })
  }
}