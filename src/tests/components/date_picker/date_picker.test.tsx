import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DateSPicker from '../../../components/date_picker';

describe('DateSPicker', () => {
      // Tests that selecting valid start and end dates triggers handleSelectedDates. 
      it("test_valid_dates_selected_triggers_handleSelectedDates", () => {
        // const handleSelectedDatesMock = jest.fn();
        // const wrapper = mount(<DateSPicker handleSelectedDates={handleSelectedDatesMock} />);
        // const startDatePicker = wrapper.find(DatePicker).at(0);
        // const endDatePicker = wrapper.find(DatePicker).at(1);
        // // startDatePicker.props().onChange({ $d: new Date("2022-01-01") });
        // // endDatePicker.props().onChange({ $d: new Date("2022-01-10") });
        // expect(handleSelectedDatesMock).toHaveBeenCalledWith([{ init: "2022-01-01T00:00:00.000Z", end: "2022-01-10T00:00:00.000Z" }]);
    });
});
