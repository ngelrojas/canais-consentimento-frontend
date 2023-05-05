import {FormatPhone} from '../../utils';

describe('FormatTelePhone', () => {
        // Tests that a valid phone number with only numbers and dashes is correctly formatted. 
        it("test_valid_phone_number_with_only_numbers_and_dashes", () => {
            const phone_number_unformat = "123-456-7890";
            const expected_output = "1234567890";
            expect(FormatPhone(phone_number_unformat)).toEqual(expected_output);
        });
            // Tests that a valid phone number with international code is correctly formatted. 
    it("test_valid_phone_number_with_international_code", () => {
        const phone_number_unformat = "+1 (123) 456-7890";
        const expected_output = "11234567890";
        expect(FormatPhone(phone_number_unformat)).toEqual(expected_output);
    });
        // Tests that an empty input returns an empty string. 
        it("test_empty_input", () => {
            const phone_number_unformat = "";
            const expected_output = "";
            expect(FormatPhone(phone_number_unformat)).toEqual(expected_output);
        });
            // Tests that an input with only special characters returns an empty string. 
    it("test_input_with_only_special_characters", () => {
        const phone_number_unformat = "@#$%^&*()_+";
        const expected_output = "";
        expect(FormatPhone(phone_number_unformat)).toEqual(expected_output);
    });
        // Tests that a valid phone number with parentheses and spaces is correctly formatted. 
        it("test_valid_phone_number_with_parentheses_and_spaces", () => {
            const phone_number_unformat = "(123) 456-7890";
            const expected_output = "1234567890";
            expect(FormatPhone(phone_number_unformat)).toEqual(expected_output);
        });
            // Tests that an input with more than 15 digits is correctly formatted. 
    it("test_input_with_more_than_15_digits", () => {
        const phone_number_unformat = "123456789012345";
        const expected_output = "123456789012345";
        expect(FormatPhone(phone_number_unformat).length).toEqual(15);
    });
  });
  