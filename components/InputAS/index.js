import React from 'react';
import { Form, Input } from 'antd';

const InputAS = ({ props, name, rules, type }) => {
  return (
    <Form.Item name={name} rules={rules}>
      <Input
        type={type}
        className=' w-full p-3 border-2 border-gray-300 rounded-md font-semibold text-black h-10'
        {...props}
      />
    </Form.Item>
  );
};

export default InputAS;
