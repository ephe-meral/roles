import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { BackButton, Col, Input, Row, ToolbarButton } from 'react-onsenui';
import { TabPage } from './TabPage';
import { TextInput } from './TextInput';

const EditRole = ({ character = {}, onSave }) => {
  const [fullName, setFullName] = useState(character.fullName);
  const [shortCode, setShortCode] = useState(character.shortCode);
  const [color, setColor] = useState(character.color);

  return (
    <TabPage
      label="New"
      leftButton={<BackButton>Cancel</BackButton>}
      rightButton={
        <ToolbarButton
          onClick={() => onSave && onSave({ id: character.id, fullName, shortCode, color })}
        >
          Save
        </ToolbarButton>
      }
    >
      <Col css="height: 100%">
        <Row>
          <TextInput
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            placeholder="Full name: Jane Doe"
          />
        </Row>
        <Row>
          <TextInput
            value={shortCode}
            onChange={event => setShortCode(event.target.value)}
            placeholder="Short code: JD"
          />
        </Row>
        <Row>
          <TextInput
            value={color}
            onChange={event => setColor(event.target.value)}
            placeholder="Color: #aa0000"
          />
        </Row>
      </Col>
    </TabPage>
  );
};

export { EditRole };
