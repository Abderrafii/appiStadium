import { Select } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Option } = Select;

const SelectAS = ({ selectProps, optionsProps, options, defaultValue }) => {
  const StyledSelect = styled(Select)`
    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border-radius: 10px;
    }
    .ant-select-selection {
      background-color: green;
      border-radius: '24px';
    }
  `;
  return (
    <StyledSelect
      style={{ width: 450, borderRadius: '20px', margin: 3 }}
      dropdownClassName=' rounded-b-lg'
      //   style={{ width: '100%', borderTopLeftRadius: 25 }}
      {...selectProps}
      defaultValue={defaultValue}>
      {options.map((option, key) => (
        <Option
          key={key}
          value={option.value}
          className='bg-white'
          {...optionsProps}>
          {option.label}
        </Option>
      ))}
    </StyledSelect>
  );
};

export default SelectAS;
