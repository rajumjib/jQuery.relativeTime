/*!
 * jQuery.relativeTime jQuery Plugin v1.0.1
 * https://github.com/rajumjib/jQuery.relativeTime
 *
 * Copyright 2012-2013, Jahirul Islam Bhuiyan
 * https://www.online4help.net/
 * Licensed under the MIT license.
 * https://github.com/rajumjib/jQuery.relativeTime/blob/master/LICENSE
 *
 * Date: Fri Apr 26 12:00:00 2013 +0600
 */


(function () {
    var RelativeTime;

    RelativeTime = (function () {

        function RelativeTime(element, options) {
            this.startInterval = 60000;
            this.init(element, options);
        }

        RelativeTime.prototype.init = function (element, options) {
            this.$element = $(element);
            this.options = $.extend({}, $.fn.relativeTime.defaults, options);
            this.updateTime();
            return this.startTimer();
        };

        RelativeTime.prototype.startTimer = function () {
            var self;
            self = this;
            return this.interval = setInterval((function () {
                return self.refresh();
            }), this.startInterval);
        };

        RelativeTime.prototype.stopTimer = function () {
            return clearInterval(this.interval);
        };

        RelativeTime.prototype.restartTimer = function () {
            this.stopTimer();
            return this.startTimer();
        };

        RelativeTime.prototype.refresh = function () {
            this.updateTime();
            return this.updateInterval();
        };

        RelativeTime.prototype.updateTime = function () {
            var self;
            self = this;
            return this.$element.findAndSelf(this.options.selector).each(function () {
                var relativeTimeInWords;
                relativeTimeInWords = self.relativeTimeInWords($(this).attr(self.options.attr));
                if (relativeTimeInWords)
                    return $(this).html(relativeTimeInWords);
            });
        };

        RelativeTime.prototype.updateInterval = function () {
            var filter, newestTime, newestTimeInMinutes, newestTimeSrc;
            if (this.$element.findAndSelf(this.options.selector).length > 0) {
                filter = ":first";
                newestTimeSrc = this.$element.findAndSelf(this.options.selector).filter(filter).attr(this.options.attr);
                newestTime = this.parse(newestTimeSrc);
                if (!newestTime)
                    return;
                newestTimeInMinutes = this.getTimePeriodInMinutes(newestTime);
                if (newestTimeInMinutes >= 0 && newestTimeInMinutes <= 44 && this.startInterval !== 60000) {
                    this.startInterval = 60000;
                    return this.restartTimer();
                } else if (newestTimeInMinutes >= 45 && newestTimeInMinutes <= 89 && this.startInterval !== 60000 * 22) {
                    this.startInterval = 60000 * 22;
                    return this.restartTimer();
                } else if (newestTimeInMinutes >= 90 && newestTimeInMinutes <= 2519 && this.startInterval !== 60000 * 30) {
                    this.startInterval = 60000 * 30;
                    return this.restartTimer();
                } else if (newestTimeInMinutes >= 2520 && this.startInterval !== 60000 * 60 * 12) {
                    this.startInterval = 60000 * 60 * 12;
                    return this.restartTimer();
                }
            }
        };

        RelativeTime.prototype.relativeTimeInWords = function (timeString) {
            var absolutTime = this.parse(timeString);
            if (!absolutTime)
                return;

            if (this.getTimePeriod(absolutTime) == 0)
                return "" + this.options.lang.prefixes.now;

            if (this.getTimePeriod(absolutTime) > 0)
                return "" + this.options.lang.prefixes.ago + (this.periodOfTimeInWords(absolutTime)) + this.options.lang.suffix.ago;
            else
                return "" + this.options.lang.prefixes.left + (this.periodOfTimeInWords(absolutTime)) + this.options.lang.suffix.left;
        };

        RelativeTime.prototype.parse = function (dateStr) {
            if (!dateStr)
                return;
            var timeStr = $.trim(dateStr);
            if (timeStr.length < 5)
                return;
            var dt = new Date(timeStr);
            if (!dt)
                dt = Date.parse(timeStr);
            return dt;
        };

        RelativeTime.prototype.getTimePeriodInMinutes = function (absolutTime) {
            return Math.round(this.getTimePeriodInSeconds(absolutTime) / 60);
        };

        RelativeTime.prototype.getTimePeriodInSeconds = function (absolutTime) {
            return Math.abs(this.getTimePeriod(absolutTime));
        };

        RelativeTime.prototype.getTimePeriod = function (absolutTime) {
            var timePeriod;
            timePeriod = new Date().getTime() - absolutTime.getTime();
            return Math.round((timePeriod / 1000));
        };

        RelativeTime.prototype.periodOfTimeInWords = function (absolutTime) {
            var dim;
            dim = this.getTimePeriodInSeconds(absolutTime);
            //if (dim <= 59) {
                if (dim === 0) {
                    return "" + this.options.lang.prefixes.lt + " " + this.options.lang.units.second;
                } else if (dim === 1) {
                    return "1 " + this.options.lang.units.second;
                } else if (dim >= 2 && dim <= 8) {
                    return "" + this.options.lang.prefixes.few + " " + this.options.lang.units.seconds;
                } else if (dim >= 9 && dim <= 29) {
                    return "" + dim + " " + this.options.lang.units.seconds;
                } else if (dim >= 30 && dim <= 44) {
                    return "" + this.options.lang.prefixes.half + " " + this.options.lang.units.minute;
                } else if (dim >= 45 && dim <= 55) {
                    return "" + dim + " " + this.options.lang.units.seconds;
                } else if (dim >= 56 && dim <= 59) {
                    return "" + this.options.lang.prefixes.lt + " " + this.options.lang.units.minute;
                }
            //} else if (dim <= 3599) {
                dim = Math.round(dim / 60);
                if (dim <= 1) {
                    return "1 " + this.options.lang.units.minute;
                } else if (dim >= 2 && dim <= 8) {
                    return "" + this.options.lang.prefixes.few + " " + this.options.lang.units.minutes;
                } else if (dim >= 9 && dim <= 29) {
                    return "" + dim + " " + this.options.lang.units.minutes;
                } else if (dim >= 30 && dim <= 44) {
                    return "" + this.options.lang.prefixes.half + "n " + this.options.lang.units.hour;
                } else if (dim >= 45 && dim <= 55) {
                    return "" + dim + " " + this.options.lang.units.minutes;
                } else if (dim >= 56 && dim <= 59) {
                    return "" + this.options.lang.prefixes.lt + "n " + this.options.lang.units.hour;
                }
            //} else if (dim <= 215999) {
                dim = Math.round(dim / 60);
                if (dim <= 1) {
                    return "" + " 1 " + this.options.lang.units.hour;
                } else if (dim >= 2 && dim <= 3) {
                    return "" + this.options.lang.prefixes.few + " " + this.options.lang.units.hours;
                } else if (dim >= 4 && dim <= 22) {
                    return "" + this.options.lang.prefixes.about + " " + dim + " " + this.options.lang.units.hours;
                } else if (dim >= 23 && dim <= 24) {
                    return "" + this.options.lang.prefixes.about + "1 " + this.options.lang.units.day;
                }
            //} else if (dim <= 5183999) {
                dim = Math.round(dim / 24);
                if (dim <= 1) {
                    return "" + " 1 " + this.options.lang.units.day;
                } else if (dim >= 2 && dim <= 3) {
                    return "" + this.options.lang.prefixes.few + " " + this.options.lang.units.days;
                } else if (dim >= 4 && dim <= 6) {
                    return "" + this.options.lang.prefixes.about + " " + dim + " " + this.options.lang.units.days;
                } else if (dim >= 7 && dim <= 8) {
                    return "" + this.options.lang.prefixes.about + " 1 " + this.options.lang.units.week;
                } else if (dim >= 9 && dim <= 13) {
                    return "" + this.options.lang.prefixes.about + " 2 " + this.options.lang.units.weeks;
                } else if (dim >= 14 && dim <= 17) {
                    return "" + this.options.lang.prefixes.about + " " + this.options.lang.prefixes.half + " " + this.options.lang.units.month;
                } else if (dim >= 18 && dim <= 26) {
                    return "" + this.options.lang.prefixes.about + " " + dim + " " + this.options.lang.units.days;
                } else if (dim >= 27 && dim <= 29) {
                    return "" + this.options.lang.prefixes.lt + " " + this.options.lang.units.month;
                }
            //} else if (dim <= 155519999) {
                dim = Math.round(dim / 30);
                if (dim <= 1) {
                    return "" + " 1 " + this.options.lang.units.month;
                } else if (dim >= 2 && dim <= 3) {
                    return "" + this.options.lang.prefixes.few + " " + this.options.lang.units.months;
                } else if (dim >= 4 && dim <= 5) {
                    return "" + this.options.lang.prefixes.about + " " + dim + " " + this.options.lang.units.months;
                } else if (dim >= 6 && dim <= 7) {
                    return "" + this.options.lang.prefixes.about + " " + this.options.lang.prefixes.half + " " + this.options.lang.units.year;
                } else if (dim >= 8 && dim <= 10) {
                    return "" + this.options.lang.prefixes.about + " " + dim + " " + this.options.lang.units.months;
                } else if (dim >= 11 && dim <= 12) {
                    return "" + this.options.lang.prefixes.lt + " " + this.options.lang.units.year;
                }
            //} else {
                dim = Math.round(dim / 12);
                if (dim <= 1) {
                    return "" + " 1 " + this.options.lang.units.year;
                } else if (dim >= 2 && dim <= 5) {
                    return "" + this.options.lang.prefixes.few + " " + this.options.lang.units.years;
                } else if (dim >= 6) {
                    return "" + this.options.lang.prefixes.about + " " + dim + " " + this.options.lang.units.years;
                } else {
                    return "" + this.options.lang.prefixes.about + " " + dim + " " + this.options.lang.units.years;
                }
            //}
        };

        return RelativeTime;

    })();

    $.fn.relativeTime = function (options) {
        if (options == null) {
            options = {};
        }
        return this.each(function () {
            var $this, data;
            $this = $(this);
            data = $this.data("relativeTime");
            if (!data) {
                $this.data("relativeTime", new RelativeTime(this, options));
            }
            if (typeof options === 'string') {
                return data[options]();
            }
        });
    };

    $.fn.findAndSelf = function (selector) {
        return this.find(selector).add(this.filter(selector));
    };

    $.fn.relativeTime.Constructor = RelativeTime;

    $.fn.relativeTime.defaults = {
        selector: 'time.relativeTime',
        attr: 'datetime',
        lang: {
            units: {
                second: "second",
                seconds: "seconds",
                minute: "minute",
                minutes: "minutes",
                hour: "hour",
                hours: "hours",
                day: "day",
                days: "days",
                week: "week",
                weeks: "weeks",
                month: "month",
                months: "months",
                year: "year",
                years: "years"
            },
            prefixes: {
                lt: "less than a",
                about: "about",
                over: "over",
                almost: "almost",
                few: "few",
                now: "just now",
                half: "half a",
                ago: "",
                left: ""
            },
            suffix: {
                ago: " ago",
                left: " left"
            }
        }
    };

}).call(this);
