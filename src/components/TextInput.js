import React from 'react';
import styled from 'styled-components/macro';
import { Input } from 'react-onsenui';

const TextInput = ({ className, value, onChange, placeholder }) => (
  <Input
    value={value}
    type="text"
    css="width: 100%"
    className={className}
    modifier="underbar"
    onChange={onChange}
    placeholder={placeholder}
  />
);

export { TextInput };
