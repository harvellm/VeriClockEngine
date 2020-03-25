type ClockValues = {
  hrPosition: Number;
  minPosition: Number;
  secPosition: Number;
  day: Number;
  weekday: string;
  month: string;
};
class ClockEngine {
  private interval: number;
  constructor(private callBack: Function, private locale: string = "en-us") {}
  calculateTimeSegments = (date: Date) => {
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let hrPos = (hr * 360) / 12 + (min * 360) / 60 / 12;
    let minPos = (min * 360) / 60 + (sec * 360) / 60 / 60;
    let secPos = (sec * 360) / 60;
    let displayDay = date.getDate();
    let displayWeekday = date.toLocaleString(this.locale, { weekday: "long" });
    let displayMonth = date
      .toLocaleString(this.locale, { month: "short" })
      .toUpperCase();
    return <ClockValues>{
      hrPosition: hrPos,
      minPosition: minPos,
      secPosition: secPos,
      day: displayDay,
      weekday: displayWeekday,
      month: displayMonth
    };
  };
  runClock = (currDate: Date = new Date()) => {
    let currValues = this.calculateTimeSegments(currDate);
    this.callBack(
      currValues.hrPosition,
      currValues.minPosition,
      currValues.secPosition,
      currValues.day,
      currValues.weekday,
      currValues.month
    );
  };
  setSpecificTime(time: Date) {
    this.runClock(time);
  }
  startClock() {
    this.interval = setInterval(this.runClock, 1000);
  }
  stopClock() {
    clearInterval(this.interval);
  }
}
