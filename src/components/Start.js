import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Col, Row, SearchInput } from 'react-onsenui';
import { TabPage } from './TabPage';

const Start = () => {
  const [input, setInput] = useState();

  return (
    <TabPage label="Start">
      <Col css="height: 100%">
        <Row css="margin-bottom: 0.5em">
          <SearchInput
            css="width: 100%"
            value={input}
            placeholder="example"
            onChange={event => {
              setInput(event.target.value);
            }}
          />
        </Row>
        <Row>
          <p>Input: {input ? input : '...'}</p>
        </Row>
      </Col>
    </TabPage>
  );
};

export { Start };
