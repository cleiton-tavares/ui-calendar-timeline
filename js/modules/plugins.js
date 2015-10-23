/**
 * Created by bluevox on 20/10/15.
 */
(function () {
  "use strict";

  UITimeline.factory('plugins', function($rootScope, $timeout, $interval){

    var _calendar = new function(){

      this.new = function () {
        return {
          calendar:{
            height: 'auto',
            editable: true,
            defaultView : 'agendaWeekDay',
            allDaySlot : false,
            lang: 'pt-br',
            axisFormat: 'HH(:mm)',
            header:{
              left: 'today',
              center: 'prev title next',
              right: 'agendaWeek agendaWeekDay agendaThreeDay agendaDay'
            },
            views: {
              agendaThreeDay: {
                type: 'agenda',
                duration: { days: 3 },
                buttonText: '3 Dias'
              },
              agendaWeekDay:{
                type: 'agenda',
                duration: { days: 5 },
                buttonText: '5 Dias'
              }
            },
            slotDuration: '00:30:00',
            minTime: "08:00:00",
            maxTime: "22:00:00"
          }
        };


      };// CREATE


      this.config = function (data) {
        switch(data.who){
          case 'eventAfterAllRender':
            var timeline = function () {
              var min = moment().minute();
              var td = $('.fc-time');

              td.each(function(i, e){
                if($(e).find('span').html() == moment().hour()){
                  if(moment().minute() > 30){
                    var altura  = $(e).next().height()/30;
                    var minuntos = altura*(min-30);
                    console.log(minuntos);
                    $(td).eq(i+1).next().append('<div class="timeline"></div>');
                    $('.timeline').css({
                      'margin-top': minuntos,
                      'width'     : $('.fc-day-header').width()
                    });
                    updateTimeline(e);
                  }else{
                    var altura   = $(e).next().height()/30;
                    var minuntos = altura*min;
                    $(e).next().append('<div class="timeline"></div>');
                    $('.timeline').css({
                      'margin-top': minuntos,
                      'width'     : $('.fc-day-header').width()
                    });
                    updateTimeline(e);
                  }
                }
              });
              function updateTimeline(e){
                $interval(function(){
                  var min = moment().minute();
                  if(moment().minute() > 30) {
                    console.info(moment().minute());
                    var altura = $(e).next().height() / 30;
                    var minuntos = altura * (min - 30);
                    $('.timeline').css('margin-top', minuntos);
                  }else{
                    var altura   = $(e).next().height()/30;
                    var minuntos = altura*min;
                    $('.timeline').css('margin-top', minuntos);
                  }
                },60*1000)
              }

            };

            return function () {
              timeline();
              }
            };
          break;
          case 'slotDuration':
            return data.set;
          break;
          case 'slotEventOverlap':
            return data.set;
          break;
          case 'businessHours':
            return data.set;
          break;
        }
      };

    };



    return {
      calendar  : _calendar
    }
  });
})();
