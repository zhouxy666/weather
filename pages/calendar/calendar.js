// pages/calendar/calendar.js
var caleutils = require('../../utils/caleutils');
Page({
  data:{
  },
  onLoad:function(options){
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonth = date.getMonth()+1;
    var curDay = date.getDate();
    caleutils.getDates({
      year:curYear,
      month:curMonth,
      success:function(preData,curData,nextData,dates){
        this.setData({
          year:curYear,
          month:curMonth,
          day:curDay,
          preData:preData,
          curData:curData,
          nextData:nextData,
          dates:dates
        });
      }.bind(this)
    });
    wx.setNavigationBarTitle({
      title: '日历'
    });
  },
  onClickToday:function(){
    console.log(11);
  },
  selectDate:function(event){
    var date = new Date();
    var _date = event.detail.value;
    //处理picker返回的日期
    var year = _date.substring(0,4);
    var month = _date.substring(5,7);
    var curMonth = date.getMonth()+1;
    var curYear = date.getFullYear();
    var today = date.getDate();
    month = !month.indexOf('0')?month.substring(1,2):month;
    caleutils.getDates({
      year:year,
      month:month,
      success:function(preData,curData,nextData,dates){
        this.setData({
          year:year,
          month:month,
          day:month==curMonth&&year==curYear?today:'',
          preData:preData,
          curData:curData,
          nextData:nextData,
          dates:dates
        });
      }.bind(this)
    })
  },
  onClickToday:function(){
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonth = date.getMonth()+1;
    var curDay = date.getDate();
    caleutils.getDates({
      year:curYear,
      month:curMonth,
      success:function(preData,curData,nextData,dates){
        this.setData({
          year:curYear,
          month:curMonth,
          day:curDay,
          preData:preData,
          curData:curData,
          nextData:nextData,
          dates:dates
        });
      }.bind(this)
    });
  }
})