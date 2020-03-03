import React, { useEffect, useState } from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components/macro';
import {
  Col,
  Icon,
  List,
  ToolbarButton
} from 'react-onsenui';
import { Characters, useCharacterStore } from '../stores/Character';
import { DeletableListItem } from './DeletableListItem';
import { EditRole } from './EditRole';
import { TabPage } from './TabPage';

const RoleListItem = ({
  character: { fullName, shortCode, color },
  onEdit,
  onDelete,
  modifier
}) => (
  <DeletableListItem onClick={onEdit} onDelete={onDelete} modifier={modifier}>
    <div
      css={`
        color: ${color};
      `}
    >{`[${shortCode}] ${fullName}`}</div>
    <Icon icon="fa-edit" fixedWidth={false} css="color: gray; vertical-align: middle" />
  </DeletableListItem>
);

const Roles = ({ navigator }) => {
  const [characters, setCharacters] = useCharacterStore();

  const saveCharacter = character => {
    setCharacters(Characters.edit(characters, character));
    navigator.popPage();
  };

  return (
    <TabPage
      label="Roles"
      rightButton={
        <ToolbarButton
          onClick={() =>
            navigator.pushPage({
              component: EditRole,
              props: {
                onSave: saveCharacter
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
          css="width: 100%"
          dataSource={Object.values(characters)}
          renderRow={(character, idx) => (
            <RoleListItem
              character={character}
              onEdit={() =>
                navigator.pushPage({
                  component: EditRole,
                  props: {
                    character,
                    onSave: saveCharacter
                  }
                })
              }
              onDelete={() => setCharacters(Characters.remove(characters, character.id))}
              modifier={idx === Object.entries(characters).length - 1 ? 'longdivider' : null}
            />
          )}
        />
      </Col>
    </TabPage>
  );
};

export { Roles };
