import React from 'react';
import ReactDOM from 'react-dom';

export default class CalendarHeader extends React.Component {
  constructor(props) {
    super(props)
    this.renderPrevMonthIcon = this.renderPrevMonthIcon.bind(this)
    this.renderNextMonthIcon = this.renderNextMonthIcon.bind(this)
  }

  handlePrevMonth() {
    if (!this.props.prevMonthDisabled) {
      this.props.prevMonth(this.props.currentYear, this.props.currentMonth)
    }
  }

  handleNextMonth() {
    if (!this.props.nextMonthDisabled) {
      this.props.nextMonth(this.props.currentYear, this.props.currentMonth)
    }
  }

  renderPrevMonthIcon() {
    return this.props.prevMonthDisabled ? null : <span><i className="calendar-header-prev fas fa-caret-left"></i></span>
  }

  renderNextMonthIcon() {
    return this.props.nextMonthDisabled ? null : <span><i className="calendar-header-next fas fa-caret-right"></i></span>
  }

  render() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          currentMonth = monthNames[this.props.currentMonth -1]

    return (
      <div className="calendar-header">
        <div onClick={this.handlePrevMonth.bind(this)}>
          {this.renderPrevMonthIcon()}
        </div>
        <h3>{currentMonth} {this.props.currentYear}</h3>
        <div onClick={this.handleNextMonth.bind(this)}>
          {this.renderNextMonthIcon()}
        </div>
      </div>
    )
  }
}
