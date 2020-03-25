var ClockEngine = /** @class */ (function () {
    function ClockEngine(callBack, locale) {
        var _this = this;
        if (locale === void 0) { locale = "en-us"; }
        this.callBack = callBack;
        this.locale = locale;
        this.calculateTimeSegments = function (date) {
            var hr = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            var hrPos = (hr * 360) / 12 + (min * 360) / 60 / 12;
            var minPos = (min * 360) / 60 + (sec * 360) / 60 / 60;
            var secPos = (sec * 360) / 60;
            var displayDay = date.getDate();
            var displayWeekday = date.toLocaleString(_this.locale, { weekday: "long" });
            var displayMonth = date
                .toLocaleString(_this.locale, { month: "short" })
                .toUpperCase();
            return {
                hrPosition: hrPos,
                minPosition: minPos,
                secPosition: secPos,
                day: displayDay,
                weekday: displayWeekday,
                month: displayMonth
            };
        };
        this.runClock = function (currDate) {
            if (currDate === void 0) { currDate = new Date(); }
            var currValues = _this.calculateTimeSegments(currDate);
            _this.callBack(currValues.hrPosition, currValues.minPosition, currValues.secPosition, currValues.day, currValues.weekday, currValues.month);
        };
    }
    ClockEngine.prototype.setSpecificTime = function (time) {
        this.runClock(time);
    };
    ClockEngine.prototype.startClock = function () {
        this.interval = setInterval(this.runClock, 1000);
    };
    ClockEngine.prototype.stopClock = function () {
        clearInterval(this.interval);
    };
    return ClockEngine;
}());
//# sourceMappingURL=clockengine.js.map