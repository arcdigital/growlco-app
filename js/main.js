function refreshView() {

  $(".drag.items a").dragend();

  $('.drag.items a').cjSwipe('on', function(swipedRight) {

    if($(this).attr('class') == 'amount')
    {
      if(!swipedRight)
      {
        $('h2 .quantity', $(this)).html(parseInt($('h2 .quantity', $(this)).html()) + 1);

        if(parseInt($('h2 .quantity', $(this)).html()) > 0) {
          $(this).animate({ opacity: 1 }, 200);
        }

        $(this).addClass('flash-green').delay(250).queue(function() {
                             $(this).removeClass('flash-green');
                             $(this).dequeue();
                         });
      }
      else
      {
        if(parseInt($('h2 .quantity', $(this)).html()) > 0)
        {
           $('h2 .quantity', $(this)).html(parseInt($('h2 .quantity', $(this)).html()) - 1);
        $(this).addClass('flash-red').delay(300).queue(function() {
                             $(this).removeClass('flash-red');
                             $(this).dequeue();
                         });
        }

        if(parseInt($('.quantity', $(this)).html()) < 1)  {
          $(this).animate({ opacity: 0.5 });
        }
      }
    }
    else
    {
      if(swipedRight)
      {
        $('h2 .yn', $(this)).html('N');
        $(this).animate({ opacity: 0.5 });

        $(this).addClass('flash-red').delay(300).queue(function() {
                             $(this).removeClass('flash-red');
                             $(this).dequeue();
                         });
      }
      else
      {
        $('h2 .yn', $(this)).html('Y');
        $(this).animate({ opacity: 1 }, 200);

        $(this).addClass('flash-green').delay(300).queue(function() {
                             $(this).removeClass('flash-green');
                             $(this).dequeue();
                         });
      }
    }
  });
}

$(document).ready(function () {
  $('.js-menu-trigger').on('click touchstart', function(e){
    $('.js-menu').toggleClass('is-visible');
    $('.js-menu-screen').toggleClass('is-visible');
    e.preventDefault();
  });

  $('.js-menu-screen').on('click touchstart', function(e){
    $('.js-menu').toggleClass('is-visible');
    $('.js-menu-screen').toggleClass('is-visible');
    e.preventDefault();
  });

  refreshView()
});
