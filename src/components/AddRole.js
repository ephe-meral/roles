import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { BackButton, Col, Input, Row, ToolbarButton } from 'react-onsenui';
import { TabPage } from './TabPage';

const AddRole = ({ character = {}, onSave }) => {
  const [fullName, setFullName] = useState(character.fullName);
  const [shortCode, setShortCode] = useState(character.shortCode);
  const [color, setColor] = useState(character.color);

  return (
    <TabPage
      label="New"
      leftButton={<BackButton>Cancel</BackButton>}
      rightButton={
        <ToolbarButton onClick={() => onSave && onSave({ fullName, shortCode, color })}>
          Save
        </ToolbarButton>
      }
    >
      <Col css="height: 100%">
        <Row>
          <Input
            value={fullName}
            type="text"
            onChange={event => setFullName(event.target.value)}
            placeholder="Full name: Jane Doe"
          />
        </Row>
        <Row>
          <Input
            value={shortCode}
            type="text"
            onChange={event => setShortCode(event.target.value)}
            placeholder="Short code: JD"
          />
        </Row>
        <Row>
          <Input
            value={color}
            type="text"
            onChange={event => setColor(event.target.value)}
            placeholder="Color: #aa0000"
          />
        </Row>
      </Col>
    </TabPage>
  );
};

export { AddRole };
