## VeriClockEngine use  

Clone this repository or just download the clockengine.js.  You do not need to have the .ts files in your final solution.

You will need to create an HTML file to hold your solution but that is probably clear now.  After that, here is the code that I am using in my final clock solution to call and process the results from this clock engine.

```javascript
   
   <script type="text/javascript" src="clockengine.js"></script>
    <script type="text/javascript">
        /*
            The following is simply an example for the purposes of testing the setSpecificTime() method of the ClockEngine - it is not necessary
        */
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
          }
        /*
            IIFE to contain the primary functionality for displaying the clock.  
            If you create your user interface with display ids #hour, #minute, #second (and #dayDisplay, #weekdayDisplay, #monthDisplay if doing the calendar)
            then this should work. I chose a circle of 600px radius.
        */
        const clockModule = (function () {
            let hourhand, minutehand, secondhand, dayDisplay, weekdayDisplay, monthDisplay, interval;
            let showClock = (hrPosition, minPosition, secPosition, day, weekday, month) => {
                dayDisplay.textContent = day;
                weekdayDisplay.textContent = weekday;
                monthDisplay.textContent = month;
                //Then we need to apply these numbers as degrees in the inline styles for transform on each of the objects.
                hourhand.style.transform = `rotate(${hrPosition}deg)`;
                minutehand.style.transform = `rotate(${minPosition}deg)`;
                secondhand.style.transform = `rotate(${secPosition}deg)`;
            };
            let clock = new ClockEngine(showClock);
            let startCallback = () => {
                hourhand = document.querySelector('#hour');
                minutehand = document.querySelector('#minute');
                secondhand = document.querySelector('#second');
                dayDisplay = document.querySelector("#dayDisplay");
                weekdayDisplay = document.querySelector("#weekdayDisplay");
                monthDisplay = document.querySelector("#monthDisplay");
                clock.startClock();
                /*The following is just an example, you can specify exact times with date strings, 
                this is useful for setting the exact positions of the minute markers*/
                //clock.setSpecificTime(new Date().addHours(1)); 
            };
            return {
                startCallback: startCallback
            }
        })();
        //This is a pure Javascript method of guaranteeing that the code starts to run after the DOM is loaded in different browsers
        (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll) ?
            clockModule.startCallback() : document.addEventListener("DOMContentLoaded", clockModule.startCallback));
    </script>
    ```