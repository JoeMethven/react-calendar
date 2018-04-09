import React from 'react';
import ReactDOM from 'react-dom';

import Day from './CalendarDay'

export default class CalendarDay extends React.Component {
  nextDay(day) {

  }

  handleDayActive(day) {
    let ifDisabledSkipday = (currentDay) => {
      if (this.handleDayDisabled(currentDay)) {
        return ifDisabledSkipday(currentDay + 1)
      }

      return currentDay
    }

    if (this.props.date.getFullYear() === this.props.selectedDate.getFullYear() &&
        this.props.date.getMonth() === this.props.selectedDate.getMonth() &&
        day === this.props.selectedDate.getDate()) {

      if (this.handleDayDisabled(day)) {
        this.props.renderDay(ifDisabledSkipday(day))
        return false;
      }

      return true
    }

    return false
  }

  handleDayDisabled(day) {
    const date = day ? new Date(this.props.date.getFullYear(), this.props.date.getMonth(), day, 0, 0, 0, 0).toISOString() : null
    if (!day ||
        this.props.minDate && this.handleMinDateDisabled(day) ||
        this.props.maxDate && this.handleMaxDateDisabled(day) ||
        this.props.availability && this.props.availability.hasOwnProperty(date) && !this.props.availability[date].available.length) {

      return true
    }

    return false
  }

  handleDayBusy(day) {
    const date = day ? new Date(this.props.date.getFullYear(), this.props.date.getMonth(), day, 0, 0, 0, 0).toISOString() : null
    if (this.props.availability &&
        this.props.availability.hasOwnProperty(date) &&
        this.props.availability[date].events &&
        this.props.availability[date].events.length &&
        this.props.availability[date].available &&
        this.props.availability[date].available.length) {

      return true
    }

    return false
  }

  handleMinDateDisabled(day) {
    let date = new Date(this.props.date)
    date.setDate(day)
    // render all days than fall before the minDate.day disabled
    if (date.getFullYear() < this.props.minDate.getFullYear() ||
        date.getFullYear() === this.props.minDate.getFullYear() &&
        date.getMonth() < this.props.minDate.getMonth() ||
        date.getFullYear() === this.props.minDate.getFullYear() &&
        date.getMonth() === this.props.minDate.getMonth() &&
        day < this.props.minDate.getDate()) {
      return true
    }

    return false
  }

  handleMaxDateDisabled(day) {
    let date = new Date(this.props.date)
    date.setDate(day)
    // render all days than fall after the maxDate.day disabled
    if (date.getFullYear() > this.props.maxDate.getFullYear() ||
        date.getFullYear() === this.props.maxDate.getFullYear() &&
        date.getMonth() > this.props.maxDate.getMonth() ||
        date.getFullYear() === this.props.maxDate.getFullYear() &&
        date.getMonth() === this.props.maxDate.getMonth() &&
        day > this.props.maxDate.getDate()) {
      return true
    }

    return false
  }

  renderDaysOfMonth() {
    return new Date(this.props.date.getFullYear(), this.props.date.getMonth() + 1, 0).getDate();
  }

  renderWeekdayOfFirstDay(totalDays) {
    return new Date(this.props.date.getFullYear(), this.props.date.getMonth() + 1, -(totalDays - 1)).getDay() || 7
  }

  render() {
    const { loading } = this.props,
          totalDays = this.renderDaysOfMonth(),
          firstDay = this.renderWeekdayOfFirstDay(totalDays),
          prevMonthItems = loading ? [] : Array.from(Array(firstDay - 1).keys()),
          monthItems = loading ? [] : Array.from(Array(totalDays).keys())

    return (
      <ul className="calendar-days">
        {prevMonthItems.map(number => {
          return (
            <Day
              key={number + 1}
              disabled={this.handleDayDisabled.bind(this)}
              renderDay={this.props.renderDay} />
          )
        })}
        {monthItems.map(day => {
          day++

          return (
            <Day
              key={day}
              day={day}
              active={this.handleDayActive(day)}
              busy={this.handleDayBusy(day)}
              disabled={this.handleDayDisabled(day)}
              renderDay={this.props.renderDay} />
          )
        })}
      </ul>
    )
  }
}
