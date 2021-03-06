import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, Col, Icon, List, Row, SearchInput, ToolbarButton } from 'react-onsenui';
import { Logs, useLogsStore } from '../stores/Log';
import { DeletableListItem } from './DeletableListItem';
import { EditSession } from './EditSession';
import { Session } from './Session';
import { TabPage } from './TabPage';
import { SettingsPopover } from './SettingsPopover';

const SessionListItem = ({ title, onClick, onDelete, modifier }) => (
  <DeletableListItem onClick={onClick} onDelete={onDelete} modifier={modifier}>
    <div>{title}</div>
    <Icon icon="fa-chevron-right" fixedWidth={false} css="color: gray; vertical-align: middle" />
  </DeletableListItem>
);

const Sessions = ({ navigator }) => {
  const [logs, setLogs] = useLogsStore();
  const [input, setInput] = useState();
  const [settingsButtonRef, setSettingsButtonRef] = useState();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const saveLog = log => {
    setLogs(Logs.edit(logs, log));
    navigator.popPage();
  };

  return (
    <TabPage
      label="Sessions"
      leftButton={
        <ToolbarButton
          onClick={() => setSettingsVisible(true)}
          ref={ref => setSettingsButtonRef(ref)}
        >
          <Icon icon="fa-bars" fixedWidth={false} css="vertical-align: middle" />
        </ToolbarButton>
      }
      rightButton={
        <ToolbarButton
          onClick={() =>
            navigator.pushPage({
              component: EditSession,
              props: {
                onSave: saveLog
              }
            })
          }
        >
          <Icon icon="md-plus" size={26} fixedWidth={false} css="vertical-align: middle" />
        </ToolbarButton>
      }
    >
      <SettingsPopover
        getTarget={() => settingsButtonRef}
        isOpen={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
      <Col css="height: 100%">
        <List
          css="width: 100%"
          dataSource={Object.values(logs)}
          renderRow={(log, idx) => (
            <SessionListItem
              title={log.title}
              onClick={() =>
                navigator.pushPage({
                  component: Session,
                  props: { key: log.id, title: log.title, logId: log.id }
                })
              }
              onDelete={() => setLogs(Logs.remove(logs, log.id))}
              modifier={idx === Object.entries(logs).length - 1 ? 'longdivider' : null}
            />
          )}
        />
      </Col>
    </TabPage>
  );
};

export { Sessions };
