import { Button, Form } from 'antd';
import React from 'react';

const ButtonAS = ({ props, children, className }) => {
  return (
    <div>
      <Form.Item>
        <button
          className={`p-2 border-2  text-xl border-gray-300 rounded-lg font-semibold  ${className}`}
          {...props}>
          {children}
        </button>
      </Form.Item>
    </div>
  );
};

export default ButtonAS;
