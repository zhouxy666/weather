// pages/calendar/calendar.js
var caleutils = require('../../utils/caleutils');
Page({
  data:{},
  onLoad:function(options){
    wx.setNavigationBarTitle({
      title: '日历'
    });
  },
  onReady:function(){
    var emaptDay = [];
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonty = date.getMonth();
    var y = 2017;
    var m = 3;
    var oneDayWeek = new Date(curYear,curMonty,1).getDay();
    console.log(oneDayWeek);
    for(var i = 0;i<oneDayWeek;i++){
      emaptDay.push('');
    }
    console.log(emaptDay);
    for(var i=1;i<12;i++){
      console.log((i)+'月份:'+this.getTotalDays(2017,i));
    }
  },
  /**
   * 返回某年某月的总天数
   */
  getTotalDays:function(year,month){
    //先判断是否为闰年
    var totalDays = 0;
      //如果是瑞年
    switch(month){
      case 1||3||5||7||8||10||12:
      totalDays = 31;
      break;
      case 2:
      totalDays = (caleutils.isLeapYear(year))?29:28;
      break;
      default:
      totalDays = 30;
    }
    return totalDays;
  },
})