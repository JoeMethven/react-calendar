import React from 'react';
import ReactDOM from 'react-dom';

import Header from './CalendarHeader'
import Labels from './CalendarLabels'
import Days from './CalendarDays'

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentYear: this.setCurrentYear(new Date().getFullYear()),
      currentMonth: this.setCurrentMonth(new Date().getMonth() + 1)
    }
    this.updateDate = this.updateDate.bind(this)
  }

  handleDayClick(day) {
    this.props.handleDayClick(new Date(this.state.currentYear, this.state.currentMonth, day))
  }

  setCurrentYear() {
    return new Date().getFullYear()
  }

  setCurrentMonth(currentDate) {
    const calcMonth = (date) => {
            if (this.props.minDate && date < this.props.minDate.getMonth() + 1) {
              return calcMonth(date + 1)
            }

            return date
          }

    return calcMonth(currentDate)
  }

  prevMonth(currentYear, currentMonth) {
    // - 2 on month to return back to zero based index, then minus for prev month
    const newYear = new Date(currentYear, currentMonth - 2).getFullYear(),
          newMonth = new Date(currentYear, currentMonth - 2).getMonth() + 1

    this.updateDate(newYear, newMonth || 12)
  }

  nextMonth(currentYear, currentMonth) {
    // not modifying the currentMonth at all as the non-zero based index will push it to next month
    const newYear = new Date(currentYear, currentMonth).getFullYear(),
          newMonth = new Date(currentYear, currentMonth).getMonth() + 1

    this.updateDate(newYear, newMonth || 12)
  }

  updateDate(newYear, newMonth) {
    this.setState({
      currentYear: newYear,
      currentMonth: newMonth
    })
  }

  handlePrevMonthDisabled() {
    if (this.props.minDate) {
      // first month in year and last year is minimum year
      if (this.state.currentMonth === 0 && this.state.currentYear - 1 <= this.props.minDate.getFullYear()) {
        return true
      }

      // last month is minimum month
      if (this.state.currentYear <= this.props.minDate.getFullYear() && this.state.currentMonth - 1 < this.props.minDate.getMonth() + 1) {
        return true
      }
    }

    return false
  }

  handleNextMonthDisabled() {
    if (this.props.maxDate) {
      // last month in year and next year is maximum year
      if (this.state.currentMonth === 11 && this.state.currentYear + 1 >= this.props.maxDate.getFullYear()) {
        return true
      }

      if (this.state.currentMonth + 1 > this.props.maxDate.getMonth() + 1) {
        return true
      }
    }

    return false
  }

  render() {
    return (
      <div className="calendar">
        <Header
          prevMonthDisabled={this.handlePrevMonthDisabled()}
          nextMonthDisabled={this.handleNextMonthDisabled()}
          currentYear={this.state.currentYear}
          currentMonth={this.state.currentMonth}
          prevMonth={this.prevMonth.bind(this)}
          nextMonth={this.nextMonth.bind(this)}/>
        <Labels />
        <Days
          handleDayClick={this.handleDayClick.bind(this)}
          currentYear={this.state.currentYear}
          currentMonth={this.state.currentMonth}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate} />
      </div>
    )
  }
}
