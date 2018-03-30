# React Calendar

This is a simplistic calendar (datepicker) for use within React, you can pass 
in a minDate and maxDate using the javascript Date method call.

```
import Calendar from '../components/calendar/Calendar'

// class method
createEvent(date) {
  // do something with the date the user has selected
}

// render method
// set minDate as todays date, set maxDate as 2 months from todays date.
let minDate = new Date(),
    maxDate = new Date()

maxDate.setMonth(maxDate.getMonth() + 2)

// optionally pass in a min/max date field using javascript Date method
// pass a handleDayClick callback method which will return the date the user selected.
<Calendar minDate={date} maxDate={maxDate} handleDayClick={this.createEvent.bind(this)} />
```
