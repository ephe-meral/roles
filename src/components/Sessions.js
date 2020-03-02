import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, Col, Row, SearchInput } from 'react-onsenui';
import { Session } from './Session';
import { TabPage } from './TabPage';

const Sessions = ({ navigator }) => {
  const [input, setInput] = useState();

  return (
    <TabPage label="Sessions">
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
          <p>Input: {input || '...'}</p>
        </Row>
        <Row>
          <Button
            onClick={() =>
              navigator.pushPage({ component: Session, props: { key: 'Session', title: 'Test' } })
            }
          >
            Try me!{' '}
          </Button>
        </Row>
      </Col>
    </TabPage>
  );
};

export { Sessions };
