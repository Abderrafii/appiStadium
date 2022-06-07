import React from 'react';
import { Form, Input } from 'antd';

import styled from 'styled-components';

const StyledInputAS = styled(Input)`
  border-radius: 7px !important;
`;

const InputAS = ({
  name,
  placeholder,
  label,
  rules,
  type,
  props,
  formProps,
  className,
}) => {
  return (
    <>
      <div className='mb-2'>{label}</div>
      <Form.Item name={name} rules={rules} {...formProps}>
        <StyledInputAS
          type={type}
          placeholder={placeholder}
          className={`${className} h-10 w-full font-semibold text-black`}
          {...props}
        />
      </Form.Item>
    </>
  );
};

export default InputAS;
