/* 
* @Author: anchen
* @Date:   2017-07-15 10:10:35
* @Last Modified by:   anchen
* @Last Modified time: 2017-07-17 19:42:31
*/

$(document).ready(function(){

    // 按下
    $('.btns').on('touchstart',function(){
      event.preventDefault();
      var urlName = 'images/btn/'+$(this).data("url")+'-an.png';
        $(this).attr('src',urlName );
    })

    // 防止双击
    $('.btns').on('dbclick',function(){
      return;
    })

    // 松开
      $('.btns').on('touchend',function(){
        event.preventDefault();
        var urlName = 'images/btn/'+$(this).data("url")+'.png';
        $(this).attr('src',urlName );
      })

    $('.ks').on('touchend',function(){
        rollStart(); //开始转动
    })

    // 切换教程图片
    var step = 0;
    $('.moskBg_con').click(function(event) {
        /* Act on the event */
        step++;
        if(step > 8 ){
            $(this).parent().addClass('none');
            step=1;
        }
        $(this).css({
            'background': 'url(images/step/'+step+'.png) no-repeat',
            'background-size': '100% 100%'
        });
    });

    // 规则弹窗
    $('.top_rule').click(function(){
        var tip = '<div class="ruleLayer"> <div class="rule_close" onclick="closeLayer();"></div> <div class="rule_con"><div class="rule_con_in"> <div> 1.苹果1赔5，橘子1赔10，柠檬1赔15，铃铛1赔15，西瓜1赔20，星星1赔30,771赔40，BARx50则1赔50，BARx120则1赔120； <br /> 特殊道具：lucky,随机触发一下情况 <br /> (1)免费摇奖3次 <br /> (2)下免费摇奖一次，可中3个水果大奖 <br /><br /> </div> <div> 1.苹果1赔5，橘子1赔10，柠檬1赔15，铃铛1赔15，西瓜1赔20，星星1赔30,771赔40，BARx50则1赔50，BARx120则1赔120； <br /> 特殊道具：lucky,随机触发一下情况 <br /> (1)免费摇奖3次 <br /> (2)下免费摇奖一次，可中3个水果大奖 <br /><br /> </div> <div> 1.苹果1赔5，橘子1赔10，柠檬1赔15，铃铛1赔15，西瓜1赔20，星星1赔30,771赔40，BARx50则1赔50，BARx120则1赔120； <br /> 特殊道具：lucky,随机触发一下情况 <br /> (1)免费摇奖3次 <br /> (2)下免费摇奖一次，可中3个水果大奖 <br /><br /> </div> </div></div> <div class="rule_return" onclick="closeLayer();">返回游戏</div> </div>';
         layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: true,
            content:tip
        });

        $('.layui-layer-shade').css('opacity', '0.7');
    })

    // 左按钮
    $('.lfx').on('touchend',function(){
        if(!NumClick){return};
        // NumClick = false;
        var num1 = Number($('.l_score').text());
        $('.l_score').text(score*2);
        var num2 = Number($('.l_score').text());
        $('.r_score').text($('.r_score').text()-(num2 - num1));
    })

    // 右按钮
    $('.rfx').on('touchend',function(){
        if(!NumClick){return};
        // NumClick = false;
        var num = Number($('.l_score').text())/2;
        if(num <= 0.5){num = 0; }
        var num1 = Number($('.l_score').text());
        $('.l_score').text(Math.ceil(num));
        var num2 = Number($('.l_score').text());
        $('.r_score').text($('.r_score').text()-(num2 - num1));
    })

    // 数字按钮
    $('.dx').on('touchend',function(){
        if(!NumClick){return};
        NumClick = false;
        RNumAction();
    })

});