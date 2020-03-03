import React, { useState } from 'react';
import ons from 'onsenui/esm';
import 'onsenui/esm/elements/ons-toast';
import styled from 'styled-components/macro';
import { Button, Icon, List, ListItem, Popover } from 'react-onsenui';
import { useCharacterStore } from '../stores/Character';
import { useLogsStore } from '../stores/Log';

const SettingsPopover = ({ getTarget, isOpen, onClose }) => {
  const [characters, setCharacters] = useCharacterStore();
  const [logs, setLogs] = useLogsStore();
  const [importFile, setImportFile] = useState();

  const exportData = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ chars: characters, logs })
    )}`;
    const node = document.createElement('a');
    node.setAttribute('href', dataStr);
    node.setAttribute('download', `roles-export-${Date.now()}.json`);
    document.body.appendChild(node); // required for firefox
    node.click();
    node.remove();

    onClose && onClose();
    ons.notification.toast('Export done.', { timeout: 1000, animation: 'fall' });
  };

  const mergeCharacters = c => setCharacters({ ...characters, ...c });

  // TODO: Merge properly?
  const mergeLogs = l => setLogs({ ...logs, ...l });

  const importData = () => {
    const fr = new FileReader();
    fr.onload = e => {
      const result = JSON.parse(e.target.result);
      mergeCharacters(result.chars);
      mergeLogs(result.logs);
    };
    fr.readAsText(importFile);

    onClose && onClose();
    ons.notification.toast('Import done.', { timeout: 1000, animation: 'fall' });
  };

  return (
    <Popover isOpen={isOpen} onCancel={onClose} getTarget={getTarget}>
      <div css="text-align: center">
        <List css="height: 100%">
          <ListItem tabable onClick={exportData}>
            <Button modifier="quiet">Export Data</Button>
          </ListItem>
          <ListItem>
            <div className="center">
              <label htmlFor="importUpload" css={importFile ? 'display: none' : ''}>
                <Button modifier="quiet">
                  <span>Choose Import File</span>
                </Button>
              </label>
              <input
                id="importUpload"
                type="file"
                accept=".json"
                css="opacity: 0; width: 0; height: 0;"
                onChange={e =>
                  e.target.files && e.target.files.length && setImportFile(e.target.files[0])
                }
              />
              {importFile && (
                <Button onClick={importData} modifier="quiet">
                  <div css="display: inline-block; max-width: 10em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    Import&nbsp;{importFile.name}
                  </div>
                </Button>
              )}
            </div>
          </ListItem>
        </List>
        <p>
          <Button onClick={onClose}>Cancel</Button>
        </p>
      </div>
    </Popover>
  );
};

export { SettingsPopover };
