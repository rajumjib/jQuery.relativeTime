/*!
 * jQuery.relativeTime jQuery Plugin v1.0
 * https://github.com/rajumjib/jQuery.relativeTime
 *
 * Copyright 2012, Jahirul Islam Bhuiyan
 * https://www.online4help.net/
 * Licensed under the MIT license.
 * https://github.com/rajumjib/jQuery.relativeTime/blob/master/LICENSE
 *
 * Date: Tue Dec 04 12:00:00 2012 +0600
 */

describe("RelativeTime", function(){
  beforeEach(function(){
    RelativeTime = $.fn.relativeTime.Constructor
    relativeTime = new RelativeTime("time.relativetime", {})
  });

  describe("constructor", function(){
    it("should contain the startInterval", function(){
      expect(relativeTime.startInterval).toEqual(60000);
    });
  });

  describe("#init", function(){
    it("should set $element", function(){
      relativeTime.init("time.relativetime", {});
      expect(relativeTime.$element).toEqual($("time.relativetime"));
    });

    it("should load the options", function(){
      spyOn($, 'extend').andReturn("spy");
      relativeTime.init("time.relativetime", {});
      expect(relativeTime.options).toEqual("spy");
    });

    it("should call updateTime", function(){
      spyOn(relativeTime, 'updateTime');
      relativeTime.init("time.relativetime", {});
      expect(relativeTime.updateTime).toHaveBeenCalled();
    });

    it("should call startTimer", function(){
      spyOn(relativeTime, "startTimer");
      relativeTime.init("time.time", {});
      expect(relativeTime.startTimer).toHaveBeenCalled();
    });
  });

  describe("#startTimer", function(){
    it("should call setInterval", function(){
      spyOn(window, 'setInterval');
      relativeTime.startTimer();
      expect(window.setInterval).toHaveBeenCalled();
    });

    it("should set interval", function(){
      spyOn(window, 'setInterval').andReturn("spy");
      relativeTime.startTimer();
      expect(relativeTime.interval).toEqual("spy");
    });
  });

  describe("#stopTimer",function(){
    it("should call clearInterval", function(){
      spyOn(window, 'clearInterval');
      relativeTime.stopTimer();
      expect(window.clearInterval).toHaveBeenCalled();
    });
  });

  describe("#restartTimer", function(){
    it("should call stopTimer", function(){
      spyOn(relativeTime, 'stopTimer');
      relativeTime.restartTimer();
      expect(relativeTime.stopTimer).toHaveBeenCalled();
    });

    it("should call startTimer", function(){
      spyOn(relativeTime, 'startTimer');
      relativeTime.restartTimer();
      expect(relativeTime.startTimer).toHaveBeenCalled();
    });
  });

  describe("#updateTime", function(){
    beforeEach(function(){
      timeLabel = $('<time class="relativetime" datetime="2012-07-18T07:51:50Z">about 8 hours ago</time>')
      $('body').append(timeLabel)
      relativeTime = new RelativeTime("time.relativetime", {selector: 'time.relativetime', attr: 'datetime', dir: 'up', suffix: 'ago'});
    });

    afterEach(function(){
      timeLabel.remove()
    });

    it("should update the relative time in html", function(){
      spyOn(relativeTime, 'relativeTimeInWords').andReturn('about 9 hours ago')
      relativeTime.updateTime();
      expect($('time.relativetime').first().html()).toEqual("about 9 hours ago")
    });
  });

  describe("#updateInterval", function(){
    beforeEach(function(){
      timeLabel = $('<time class="relativetime" datetime="2012-07-18T07:51:50Z">about 8 hours ago</time>')
      $('body').append(timeLabel)
      relativeTime = new RelativeTime("time.relativetime", {selector: 'time.relativetime', attr: 'datetime', dir: 'up', suffix: 'ago'});
    });

    afterEach(function(){
      timeLabel.remove()
    });


    describe("context: newestTimeInMinutes >= 0 and newestTimeInMinutes <= 45 and @startInterval != 60000", function(){
      beforeEach(function(){
        relativeTime.startInterval = 60000 * 22;
      });

      it("should update interval to 60000", function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(2);
        relativeTime.updateInterval();
        expect(relativeTime.startInterval).toEqual(60000);
      });

      it("should call restartTimer", function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(2);
        spyOn(relativeTime, 'restartTimer');
        relativeTime.updateInterval();
        expect(relativeTime.restartTimer).toHaveBeenCalled();
      });
    });

    describe("context: newestTimeInMinutes >= 45 and newestTimeInMinutes <= 89 and @startInterval != 60000 * 30", function(){
      beforeEach(function(){
        relativeTime.startInterval = 60000;
      });

      it("should update interval to 1320000", function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(46);
        relativeTime.updateInterval();
        expect(relativeTime.startInterval).toEqual(1320000);
      });

      it("should call restartTimer", function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(46);
        spyOn(relativeTime, 'restartTimer');
        relativeTime.updateInterval();
        expect(relativeTime.restartTimer).toHaveBeenCalled();
      });
    });

    describe("context: newestTimeInMinutes >= 90 and newestTimeInMinutes <= 2519 and @startInterval != 60000 * 60", function(){
      beforeEach(function(){
        relativeTime.startInterval = 1320000;
      });

      it("should update interval to 1800000", function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(90);
        relativeTime.updateInterval();
        expect(relativeTime.startInterval).toEqual(1800000);
      });

      it("should call restartTimer", function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(2519);
        spyOn(relativeTime, 'restartTimer');
        relativeTime.updateInterval();
        expect(relativeTime.restartTimer).toHaveBeenCalled();
      });
    });

    describe("context: newestTimeInMinutes >= 2520 and @startInterval != 60000 * 60 * 24", function(){
      beforeEach(function(){
        relativeTime.startInterval = 1800000;
      });

      it("should update interval to 43200000", function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(2520);
        relativeTime.updateInterval();
        expect(relativeTime.startInterval).toEqual(43200000);
      });

      it("should call restartTimer", function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(100000000);
        spyOn(relativeTime, 'restartTimer');
        relativeTime.updateInterval();
        expect(relativeTime.restartTimer).toHaveBeenCalled();
      });
    });

  });


  describe("#parse", function(){
    beforeEach(function(){
      timeStr = "2012-07-18T07:51:50Z";
      result = relativeTime.parse(timeStr);
    });

    it("should get the right time", function(){
      expect(result.toUTCString()).toEqual("Wed, 18 Jul 2012 07:51:50 UTC");
    });
  });

  describe("periodOfTimeInWords", function(){

    describe("context: dim == 0", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInMinutes').andReturn(0);
      });
      it("should return 'less than a minute'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("less than a minute");
      });
    });

    describe("context: dim == 1", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(60);
      });
      it("should return '1 minute'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("1 minute");
      });
    });

    describe("context: dim >= 120  eq 2 minutes and dim <= 2699 eq 45 minutes", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(120);
      });
      it("should return '2 minutes'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("2 minutes");
      });
    });

    describe("context: dim >= 2700 eq 45 minutes and dim <= 5399 eq 1 hour and 30 minutes", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(5340);
      });
      it("should return 'about 1 hour'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("about 1 hour");
      });
    });

    describe("context: dim >= 5400 eq 1 hour and 30 minutes and dim <= 86399 eq 1 day", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(120);
      });
      it("should return 'about 2 hours'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("about 2 hours");
      });
    });

    describe("context: dim >= 86400 eq 1 day and dim <= 151199 eq 42 hours", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(151199);
      });
      it("should return 'few days'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("few days");
      });
    });

    describe("context: dim >= 151200 eq 42 hours and dim <= 2591999 eq 1 month", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(151200);
      });
      it("should return 'few days'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("few days");
      });
    });

    describe("context: dim >= 2592000 eq 1 month and dim <= 5183999 eq 2 months", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(5183999);
      });
      it("should return 'few months'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("few months");
      });
    });

    describe("context: dim >= 5184000 eq 2 months and dim <= 31535999 eq 1 year", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(31535999);
      });
      it("should return 'about 1 year'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("about 1 year");
      });
    });

    describe("context: dim >= 31536000 eq 1 year and dim <= 39311999 eq 1 year and 3 months", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(31536000);
      });
      it("should return ' 1 year'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual(" 1 year");
      });
    });

    describe("context: dim >= 39312000 eq 1 year and 3 months and dim <= 54863999  eq 1 year and 9 months", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(39312000);
      });
      it("should return 'over 1 year'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("over 1 year");
      });
    });

    describe("context: dim >= 54864000 eq 1 year and 9 months and dim <= 63071999 eq 2 years", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(54864000);
      });
      it("should return 'few years'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("few years");
      });
    });

    describe("context: >= 63072000 eq 2 years", function(){
      beforeEach(function(){
        spyOn(relativeTime, 'getTimePeriodInSeconds').andReturn(63072000);
      });
      it("should return 'few years'", function(){
        expect(relativeTime.periodOfTimeInWords(new Date())).toEqual("few years");
      });
    });

  });

});
