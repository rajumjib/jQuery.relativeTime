(function() {

  $.fn.relativeTime.defaults.lang = {
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
  };

}).call(this);
