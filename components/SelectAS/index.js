import { Button, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  .ant-input,
  .ant-select-selector {
    border-radius: 7px !important;
    border: 0.5px solid gray !important;

    ${
      '' /* &:focus,
    &:active &:focus-visible {
      outline: none !important;
      box-shadow: none !important;
      border: 0 !important;
      border-bottom: 2px solid #e0e0e0 !important;
    } */
    }
  }
`;
const SelectAS = ({
  label,
  selectProps,
  optionsProps,
  options,
  defaultValue,
  mode,
}) => {
  return (
    <>
      <div className='mb-2'> {label}</div>
      <StyledSelect
        mode={mode}
        size='large'
        style={{ width: 450, margin: 3 }}
        dropdownClassName=' rounded-b-lg'
        //   style={{ width: '100%', borderTopLeftRadius: 25 }}
        {...selectProps}
        defaultValue={defaultValue}>
        {options.map((option, key) => (
          <Select.Option key={key} value={option.value} {...optionsProps}>
            {option.label}
          </Select.Option>
        ))}
      </StyledSelect>
    </>
  );
};

export default SelectAS;
