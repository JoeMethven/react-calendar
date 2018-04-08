import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Header from './CalendarHeader'
import Labels from './CalendarLabels'
import Days from './CalendarDays'

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // the date viewed on the calendar currently (day will either be first day or selected day)
      date: this.props.date,
      // the selected date on the calendar (not necessarily the date viewed)
      selectedDate: this.props.date
    }

    this.handlePrevMonthDisabled = this.handlePrevMonthDisabled.bind(this)
    this.handleNextMonthDisabled = this.handleNextMonthDisabled.bind(this)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('doing it!', {
  //     nextProps,
  //     nextState
  //   })
  //
  //   if (this.props.date === nextProps.date) {
  //     return false
  //   }
  //
  //   return true
  // }

  renderDay(day) {
    let selectedDate = new Date(this.state.date)
    selectedDate.setDate(day)

    this.setState({date: selectedDate, selectedDate})

    // callback to parent component if given
    // if (this.props.selectedDayCallback) {
    //   this.props.selectedDayCallback(selectedDate)
    // }
  }

  prevMonth() {
    let date = new Date(this.state.date)
    date.setMonth(date.getMonth() - 1)
    date.setDate(1)
    date.setHours(0, 0, 0, 0)
    this.setState({date})

    if (this.props.prevMonthCallback) {
      this.props.prevMonthCallback(date)
    }
  }

  nextMonth(currentYear, currentMonth) {
    let date = new Date(this.state.date)
    date.setMonth(date.getMonth() + 1)
    date.setDate(1)
    date.setHours(0, 0, 0, 0)
    this.setState({date})

    if (this.props.prevMonthCallback) {
      this.props.nextMonthCallback(date)
    }
  }

  handlePrevMonthDisabled() {
    if (this.props.minDate) {
      let date = this.state.date
      // prev month is less or equal to minDate
      if (new Date(date.getFullYear(), date.getMonth() - 1, new Date(date.getFullYear(), date.getMonth(), 0).getDate(), 0, 0, 0, 0) <= this.props.minDate) {
        return true
      }
    }

    return false
  }

  handleNextMonthDisabled() {
    if (this.props.maxDate) {
      let date = this.state.date
      // next month is greater or equal to maxDate
      if (new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0) >= this.props.maxDate) {
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
          date={this.state.date}
          prevMonth={this.prevMonth.bind(this)}
          nextMonth={this.nextMonth.bind(this)} />
        <Labels />
        <Days
          renderDay={this.renderDay.bind(this)}
          date={this.state.date}
          selectedDate={this.state.selectedDate}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          availability={this.props.availability}  />
      </div>
    )
  }
}

Calendar.propTypes = {
  date: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  selectedDayCallback: PropTypes.func,
  prevMonthCallback: PropTypes.func,
  nextMonthCallback: PropTypes.func,
}

export default Calendar
