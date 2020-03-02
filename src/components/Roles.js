import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, Col, Icon, List, ListItem, Row, ToolbarButton } from 'react-onsenui';
import { Characters, useCharacterStore } from '../stores/Character';
import { AddRole } from './AddRole';
import { TabPage } from './TabPage';

const Roles = ({ navigator }) => {
  const [characters, setCharacters] = useCharacterStore();

  return (
    <TabPage
      label="Roles"
      rightButton={
        <ToolbarButton
          onClick={() =>
            navigator.pushPage({
              component: AddRole,
              props: {
                onSave: character => {
                  setCharacters(Characters.createOrUpdateCharacter(characters, character));
                  navigator.popPage();
                }
              }
            })
          }
        >
          <Icon icon="md-plus" size={26} fixedWidth={false} css="vertical-align: middle" />
        </ToolbarButton>
      }
    >
      <Col css="height: 100%">
        <List
          dataSource={Object.entries(characters)}
          renderRow={([id, { fullName, shortCode, color }], idx) => (
            <ListItem
              modifier={idx === Object.entries(characters).length - 1 ? 'longdivider' : null}
            >
              <p
                css={`
                  color: ${color};
                `}
              >{`[${shortCode}] ${fullName}`}</p>{' '}
              <Button
                modifier="quiet"
                onClick={() => setCharacters(Characters.removeCharacter(characters, id))}
              >
                Remove
              </Button>
            </ListItem>
          )}
        />
      </Col>
    </TabPage>
  );
};

export { Roles };
