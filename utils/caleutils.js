module.exports={
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
    }
}