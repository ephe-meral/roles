import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { BackButton, Button, Fab, Col, Icon, Row, SearchInput, Select } from 'react-onsenui';
import { useCharacterStore } from '../stores/Character';
import { Log, useLogStore } from '../stores/Log';
import { TabPage } from './TabPage';
import { TextInput } from './TextInput';

const Session = ({ title, logId }) => {
  const [characters] = useCharacterStore();
  const [log, setLog] = useLogStore(logId);
  const participants = Object.values(characters);

  const [selectedParticipant, setSelectedParticipant] = useState(() => {
    const selPar = participants.findIndex(({ id }) => log.selectedParticipantId === id);
    return selPar === -1 ? 0 : selPar;
  });
  const [input, setInput] = useState();

  return (
    <TabPage label={title} leftButton={<BackButton>Back</BackButton>}>
      {log.messages.map(({ participant, message }, i) => (
        <div
          key={`${title}-${participant}-${i}`}
          css={`
            color: ${participant.color};
            margin: 0.3em 0;
            display: flex;
            justify-content: ${participant.id === log.selectedParticipantId ? 'end' : 'start'};
            flex-direction: ${participant.id === log.selectedParticipantId ? 'row-reverse' : 'row'};
          `}
        >
          <div css="background-color: white; padding: 0.3em;">[{participant.shortCode}]</div>
          <div css="background-color: white; padding: 0.3em; max-width: 70%;">{message}</div>
        </div>
      ))}
      {!!participants.length && (
        <div
          css={`
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            background-color: white;
            padding: 0 0.5em;
          `}
        >
          <Select
            css={`
              padding-right: 0.5em;

              & select {
                color: ${participants[selectedParticipant].color};
                padding-right: 1em;
              }
            `}
            value={selectedParticipant}
            onChange={event => {
              setSelectedParticipant(event.target.value);
              const selParId = participants[event.target.value].id;
              setLog(Log.setSelectedParticipantId(log, selParId));
            }}
          >
            {participants.map((participant, idx) => (
              <option
                key={participant.id}
                css={`
                  color: ${participant.color};
                `}
                value={idx}
              >
                {`[${participant.shortCode}]`}
              </option>
            ))}
          </Select>
          <TextInput
            value={input}
            css={`
              width: unset;
              flex-grow: 1;
              padding: 0 0.5em;

              & input {
                color: ${participants[selectedParticipant].color};
              }
            `}
            onChange={event => setInput(event.target.value)}
            placeholder="Hello!"
          />
          <Button
            modifier="quiet"
            onClick={() => {
              setLog(Log.addMessage(log, participants[selectedParticipant], input));
              setInput('');
            }}
          >
            <Icon icon="fa-send" fixedWidth={false} css="vertical-align: middle" />
          </Button>
        </div>
      )}
    </TabPage>
  );
};

export { Session };
