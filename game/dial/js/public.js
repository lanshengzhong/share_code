/* 
* @Author: anchen
* @Date:   2017-07-13 14:09:35
* @Last Modified by:   anchen
* @Last Modified time: 2017-07-17 19:21:05
*/

    // 背景闪烁
    var bgFlashed = true;
    var bgFlash = function(){
        if(bgFlashed){
            $('#lottery').css({'background-image':'url(images/deng1.png)'});
            bgFlashed = false;
        }else{
            $('#lottery').css({'background-image':'url(images/deng2.png)'});
            bgFlashed = true;
        }
        setTimeout(bgFlash, 500);
    }

    // 关闭弹窗
    var closeLayer = function(){
        layer.closeAll();
    }

    // 随机数字赋值
    var RNumF = function(){
        var index = Math.round(Math.random()*14);
        if(index<10){
            $('#panbg').text('0'+index);
        }else{
            $('#panbg').text(index);
        }
        NumClick = true;
    }

    // 随机数字动作
    var Rtime = 0;
    var RNum = 1;
    var Rstep = 0;
    var RNumAction = function(){
        RNum ++;
        Rstep ++;
        if(RNum == 15){RNum = 1; }
        if(Rstep > 50){
            clearTimeout(Rtime);
            RNumF();
            RNum=0;
            Rstep=0;
            return;
        }

        $('#panbg').text(RNum);
        Rtime = setTimeout(RNumAction, 20);
    }

    
    var changeNum = function(){

    }




