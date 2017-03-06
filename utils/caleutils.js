module.exports={
    /**
     * 判断是否为闰年
     */
    isLeapYear:function(year){
        var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
        var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
        var cond3 = year % 400 ==0;  //条件3：年份是400的倍数
        //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
        //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
        //所以得出判断闰年的表达式：
        var cond = cond1 && cond2 || cond3;
        if(cond) {
            // console.log(year + "是闰年");
            return true;
        } else {
            // console.log(year + "是平年");
            return false;
        }
    },
    /**
     * 获取指定月份的所有天数
     */
    getTotalDays:function(year,month){
        var totalDays = 0;
        var arr = new Array(1,3,5,7,8,10,12);
        if(arr.indexOf(parseInt(month))!=-1){
            totalDays = 31;
        }else if(month == 2){
            totalDays = (this.isLeapYear(year))?29:28;
        }else{
            totalDays = 30;
        }
        return totalDays;
    },
    /**
     * 获取某月某日的星期数
     */
    getDayWeek:function(year,month,day){
        return new Date(year,month-1,day).getDay();
    },
    /**
     * 获取上月的所有天数
     */
    getPreDays:function(y,m,oneDayWeek){
        var preDays = [];
        //获取上一月总天数
        var preTotalDays = this.getTotalDays(y,m-1);
        //从上月最后一天开始循环
        for(var i = preTotalDays;i> preTotalDays-oneDayWeek;i--){
        preDays.push(i);
        }
        return preDays.reverse();
    },
    /**
     * 获取当月的所有天数
     */
    getCurDays:function(y,m,oneDayWeek){
        var curDays = [];
        var curTotalDays = this.getTotalDays(y,m);
        for(var i=1;i<=curTotalDays;i++){
        curDays.push(i);
        }
        return curDays;
    },
    /**
     * 获取下月所有天数
     */
    getNextDays:function(y,m,lastDayWeek){
        var nextDays = [];
        for(var i=1;i<=6-lastDayWeek;i++){
        nextDays.push(i);
        }
        return nextDays;
    },
    /**
     * 获取当前页面所需要渲染的数据
     */
    getDates:function(obj){
        //获取本月总天数
        var curTotalDays = this.getTotalDays(obj.year,obj.month);
        //获取本月1日是星期几
        var oneDayWeek = this.getDayWeek(obj.year,obj.month,1)||0;
        //获取本月最有一天是星期几
        var lastDayWeek = this.getDayWeek(obj.year,obj.month,curTotalDays);
        var preData = this.getPreDays(obj.year,obj.month,oneDayWeek);
        var curData = this.getCurDays(obj.year,obj.month,oneDayWeek);
        var nextData = this.getNextDays(obj.year,obj.month,lastDayWeek);
        var dates = preData.concat(curData,nextData);
        var _dates = new Array();
        for(var i = 0 ;i<5;i++){
        _dates[i] = new Array();
        for(var j = 0;j<7;j++){
            _dates[i][j] = dates[j];
        }
        dates.splice(0,7);
        };
        if(obj['success']){
        obj['success'](preData,curData,nextData,_dates)
        }
    }
}