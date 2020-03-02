import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { BackButton, Fab, Col, Row, SearchInput } from 'react-onsenui';
import { Log, useLogStore } from '../stores/Log';
import { TabPage } from './TabPage';

const Session = ({ title }) => {
  const [log, setLog] = useLogStore(title);
  const [input, setInput] = useState();

  return (
    <TabPage label={title} leftButton={<BackButton>Back</BackButton>}>
      {log.messages.map(({ participant, message }, i) => (
        <p key={`${title}-${participant}-${i}`}>
          {participant}: {message}
        </p>
      ))}
      <Fab onClick={() => setLog(Log.addMessage(log, '><)))°>', 'bLuB'))} />
    </TabPage>
  );
};

export { Session };
