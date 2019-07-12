import React, { Component } from 'react';
import Picker from 'react-mobile-picker';
import styled from 'styled-components';

import { BasicButton } from "./SharedStyles";

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2.125rem;
`

const generateNumberArray = (begin, end) => {
  let array = [];
  for (let i = begin; i <= end; i++) {
    array.push((i < 10 ? '0' : '') + i);
  }
  return array
};

let date = new Date();

class DatePicker extends Component {
  state = {
    isPickerShow: false,
    valueGroups: {
      year: '1985',
      month: '06',
      day: '15',
    },
    optionGroups: {
      year: generateNumberArray(1910, date.getFullYear()),
      month: generateNumberArray(1, 12),
      day: generateNumberArray(1, 31)
    }
  };

  handleChange = (name, value) => {
    this.setState(({valueGroups, optionGroups}) => {
      const nextState = {
        valueGroups: {
          ...valueGroups,
          [name]: value,
        }
      };
      if (name === 'year' && valueGroups.month === '02') {
        if (parseInt(value) % 4 === 0) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 29)
          };
        } else {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        }
      } else if (name === 'month') {
        if (value === '02') {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) > -1 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) < 0) {
          nextState.optionGroups = {
             ...optionGroups,
             day: generateNumberArray(1, 31)
           }
         } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) < 0 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) > -1) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 30)
          };
        }
      }
      return nextState;
    })
  };

  render () {
    const {optionGroups, valueGroups} = this.state;
    return (
      <DatePickerContainer>
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={this.handleChange}
        />
        <BasicButton
          onClick={() => {
            this.props.getDate(`${this.state.valueGroups.year}-${this.state.valueGroups.month}-${this.state.valueGroups.day}`);
            this.props.modalOff();
            }
          }
        >
          추가
        </BasicButton>
      </DatePickerContainer>
    )
  }
}

export default DatePicker;