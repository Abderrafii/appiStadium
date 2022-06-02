import React from 'react';
import {Form, Input} from 'antd';

const InputAS = ({name, label, rules, type, props, formProps, className}) => {
    return (
        <Form.Item name={name} rules={rules} {...formProps}>
            <Input
                type={type}
                className={`w-full p-3 border-2 border-gray-300 rounded-md font-semibold text-black h-10
                ${className ? ` ${className}` : ''}`}
                {...props}
                {...props}
            />
        </Form.Item>
    );
};

export default InputAS;
