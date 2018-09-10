/* 
* @Author: anchen
* @Date:   2017-07-17 18:05:07
* @Last Modified by:   anchen
* @Last Modified time: 2017-07-17 19:01:28
*/

    // 开始转动
    var click=false;
    var rollStart = function(){
        clearClassName(); //清楚类名
        firstEnd = true; //开启后续动作
        if (click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                return false;
            }else{
                lottery.speed = 50;
                rollopen();    //转圈过程不响应click事件，会将click置为false
                click=true; //一次抽奖完成后，设置click为true，可继续抽奖
                return false;
            }
    }
    

    var carData = [[3],[19],[15],[7],[6,18],[1,13],[0,12],[4,10,16,22],[2],[20],[14],[8],[17],[23],[11],[5],[9,21]];

    var score = 0; //猜大小分值；
    var status = 3; //1:正常 ；2.左luck ; 3.右luck；
    var firstEnd = true; //是否执行结束动作 ： true执行 false不执行；
    var NumClick = true; //数字锁
    var score = 10; //后台往后分数


    // 清楚类名
    var arrClass = ['active3','active4','active2','active'];
    var clearClassName = function(){
        $('.lottery-unit').each(function() {
            for(var i=0;i<arrClass.length;i++){
                if($(this).hasClass(arrClass[i])){
                    $(this).removeClass(arrClass[i]);
               }
            }
        });
    }

    // 处理往回的数
    var handleNum = function(){
        priceNum_1 = carData[backNum_1][Math.round(Math.random()*(carData[backNum_1].length-1))];
        if(backNum_2 > -1){
            priceNum_2 = carData[backNum_2][Math.round(Math.random()*(carData[backNum_2].length-1))];
        }
        if(backNum_3 > -1){
            priceNum_3 = carData[backNum_3][Math.round(Math.random()*(carData[backNum_3].length-1))];
        }
        if(backNum_4 > -1){
            priceNum_4 = carData[backNum_4][Math.round(Math.random()*(carData[backNum_4].length-1))];
        }
        priceNum_Luck = carData[carData.length-1][Math.round(Math.random())];
    }


    // 创建一个roll函数
    var creatRollFun = function(obj,prizeStep){
        var fun = function(){
            obj.times += 1;
            obj.roll();//转动过程调用的是obj的roll方法，这里是第一次调用初始化
                if (obj.times > obj.cycle && obj.prize==obj.index){
                    clearTimeout(obj.timer);
                    obj.prize=-1;
                    obj.times=0;
                    click=false;
                    $('.l_score').text(score); //赋值到猜大小分数
                    if(status == 1){
                        // alert('正常结束');
                        setTimeout(function(){

                        }, lottery.speed);
                    }else if(status == 2 && firstEnd){
                        // alert('左luck');
                        setTimeout(function(){
                            luck_left_1();
                            luck_left_2();
                            luck_left_3();
                        }, lottery.speed);
                    }else if(status == 3 && firstEnd){
                        // alert('右luck');
                        setTimeout(function(){
                            luck_right_1();
                            luck_right_2();
                        }, lottery.speed);
                    }
                }else {

                    if (obj.times<obj.cycle) {
                        obj.speed -= 10;
                    }else if(obj.times==obj.cycle) {
                        obj.prize = prizeStep;
                    }else{
                        if (obj.times > obj.cycle+10 && ((obj.prize==0 && obj.index==23) || obj.prize==obj.index+1)) {
                            obj.speed += 110;
                        }else{
                            obj.speed += 10;
                        }
                    }
                    if (obj.speed<40) {
                        obj.speed=40;
                    }
                    
                    obj.timer = setTimeout(fun,obj.speed);//循环调用
            }
                return false;
        }
        return fun;
    }


    // 创建一个对象
    // indexStep:开始位置；
    // cycleNum：转动基数；
    // activeClass：类名；
    // addNum：转动方向；
    var creatObj = function(indexStep,cycleNum,activeClass,addNum){
        var obj = {
            index:indexStep,    //当前转动到哪个位置，起点位置
            count:0,    //总共有多少个位置
            timer:0,    //setTimeout的ID，用clearTimeout清除
            times:0,    //转动次数
            cycle:cycleNum,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,    //中奖位置
            init:function(id){
                if ($("#"+id).find(".lottery-unit").length>0) {
                    $lottery = $("#"+id);
                    $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    this.index = indexStep;
                    $lottery.find(".lottery-unit-"+this.index).addClass(activeClass);
                };
            },
            roll:function(){
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-"+index).removeClass(activeClass);
                index += addNum;
                if(index < 0 ){index = 23;}
                if (index>count-1) {index = 0; };
                $(lottery).find(".lottery-unit-"+index).addClass(activeClass);
                this.index=index;
                return false;
            }
        };
        return obj;
    }   

    /********************** 第一次 **************************/

    var rollopen = function(){
       var roll = creatRollFun(lottery,21)();
    }
    var lottery = creatObj(-1,46,"active",1);

    /********************** 左luck_1 **************************/

    var luck_left_1 = function(){
        luck_l_1 = creatObj(22,7,"active2",1);
        luck_l_1.init('lottery');
        luck_l_1.speed = 100;
        var luck_l1 = creatRollFun(luck_l_1,5)();

        firstEnd = false; //把后续动作关了
    };

    /********************** 左luck_2 **************************/

    var luck_left_2 = function(){
        luck_l_2 = creatObj(23,7,"active3",1);
        luck_l_2.init('lottery');
        luck_l_2.speed = 100;
        var luck_l2 = creatRollFun(luck_l_2,6)();
    };

    /********************** 左luck_3 **************************/

    var luck_left_3 = function(){
        luck_l_3 = creatObj(0,7,"active4",1);
        luck_l_3.init('lottery');
        luck_l_3.speed = 100;
        var luck_l3 = creatRollFun(luck_l_3,7)();
    };
    
    /********************** 右luck_1 **************************/

    var luck_right_1 = function(){
        luck_r_1 = creatObj(9,7,"active2",-1);
        luck_r_1.init('lottery');
        luck_r_1.speed = 100;
        var luck_r1 = creatRollFun(luck_r_1,0)();

        firstEnd = false; //把后续动作关了
    };

    /********************** 右luck_2 **************************/

    var luck_right_2 = function(){
        luck_r_2 = creatObj(9,7,"active3",1);
        luck_r_2.init('lottery');
        luck_r_2.speed = 100;
        var luck_r2 = creatRollFun(luck_r_2,18)();

        firstEnd = false; //把后续动作关了
    };