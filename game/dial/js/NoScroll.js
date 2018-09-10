/* 
* @Author: anchen
* @Date:   2017-04-05 10:28:43
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-12 09:34:43
*/


    var overscroll = function(el) {
      el.addEventListener('touchstart', function() {
        var top = el.scrollTop
          , totalScroll = el.scrollHeight
          , currentScroll = top + el.offsetHeight;
        //If we're at the top or the bottom of the containers
        //scroll, push up or down one pixel.
        //
        //this prevents the scroll from "passing through" to
        //the body.
        if(top === 0) {
          el.scrollTop = 1;
        } else if(currentScroll === totalScroll) {
          el.scrollTop = top - 1;
        }
      });
      el.addEventListener('touchmove', function(evt) {
        //if the content is actually scrollable, i.e. the content is long enough
        //that scrolling can occur
        if(el.offsetHeight < el.scrollHeight)
          evt._isScroller = true;
      });
    }
    
    $('.scroll').each(function(index,el){
      overscroll(el);
    });

    // overscroll(document.querySelector('.scroll'));
    
    jQuery(document).ready(function($) {
      document.body.addEventListener('touchmove', function(evt) {
        //In this case, the default behavior is scrolling the body, which
        //would result in an overflow.  Since we don't want that, we preventDefault.
        if(!evt._isScroller) {
          evt.preventDefault();
        }
      });
    });

