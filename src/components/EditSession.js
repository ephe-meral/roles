import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { BackButton, Col, Row, ToolbarButton } from 'react-onsenui';
import { TabPage } from './TabPage';
import { TextInput } from './TextInput';

const EditSession = ({ log = {}, onSave }) => {
  const [title, setTitle] = useState(log.title);

  return (
    <TabPage
      label="New"
      leftButton={<BackButton>Cancel</BackButton>}
      rightButton={
        <ToolbarButton onClick={() => onSave && onSave({ id: log.id, title })}>Save</ToolbarButton>
      }
    >
      <Col css="height: 100%">
        <Row>
          <TextInput
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Title: Sleep Issues"
          />
        </Row>
      </Col>
    </TabPage>
  );
};

export { EditSession };
