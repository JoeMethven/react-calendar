import React from 'react';
import ReactDOM from 'react-dom';

import Day from './CalendarDay'

export default class CalendarDay extends React.Component {
  handleDayDisabled(day) {
    if (!day ||
        this.props.minDate && this.handleMinDateDisabled(day) ||
        this.props.maxDate && this.handleMaxDateDisabled(day)) {
      return true
    }

    return false
  }

  handleMinDateDisabled(day) {
    // render all days than fall before the minDate.day disabled
    if (this.props.currentYear < this.props.minDate.getFullYear() ||
        this.props.currentYear === this.props.minDate.getFullYear() &&
        this.props.currentMonth < this.props.minDate.getMonth() + 1 ||
        this.props.currentYear === this.props.minDate.getFullYear() &&
        this.props.currentMonth === this.props.minDate.getMonth() + 1 &&
        day < this.props.minDate.getDate()) {
      return true
    }

    return false
  }

  handleMaxDateDisabled(day) {
    // render all days than fall after the maxDate.day disabled
    if (this.props.currentYear > this.props.maxDate.getFullYear() ||
        this.props.currentYear === this.props.maxDate.getFullYear() &&
        this.props.currentMonth > this.props.maxDate.getMonth() + 1 ||
        this.props.currentYear === this.props.maxDate.getFullYear() &&
        this.props.currentMonth === this.props.maxDate.getMonth() + 1 &&
        day > this.props.maxDate.getDate()) {
      return true
    }

    return false
  }

  renderDaysOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  renderWeekdayOfFirstDay(year, month, days) {
    return new Date(year, month, -(days - 1)).getDay() || 7
  }

  render() {
    const totalDays = this.renderDaysOfMonth(this.props.currentYear, this.props.currentMonth),
          firstDay = this.renderWeekdayOfFirstDay(this.props.currentYear, this.props.currentMonth, totalDays),
          prevMonthItems = Array.from(Array(firstDay - 1).keys()),
          monthItems = Array.from(Array(totalDays).keys())

    return (
      <ul className="calendar-days">
        {prevMonthItems.map(number => <Day key={number + 1} disabled={this.handleDayDisabled.bind(this)} handleClick={this.props.handleDayClick} />)}
        {monthItems.map(day => <Day key={day + 1} day={day + 1} disabled={this.handleDayDisabled.bind(this)} handleClick={this.props.handleDayClick} />)}
      </ul>
    )
  }
}
