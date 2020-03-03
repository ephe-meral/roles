import React from 'react';
import { createStore, useStore } from 'react-hookstore';
import shortid from 'shortid';

const LOCALSTORAGE_ID = 'logs';

const EMPTY_LOG = (id = shortid.generate()) => ({
  id,
  title: '',
  participantIds: [
    // All available as IDs, see Role
  ],
  selectedParticipantId: '',
  messages: [
    // Shape: { participant, message }
  ]
});

// Don't access this directly
// Handles storage via LocalStorage as a side effect
const _logStore = createStore(
  '_logStore',
  JSON.parse(window.localStorage.getItem(LOCALSTORAGE_ID) || '{}'),
  (state, newState) => {
    window.localStorage.setItem(LOCALSTORAGE_ID, JSON.stringify(newState));
    return newState;
  }
);

// Ex.: `const [characters, setCharacters] = useLogStore(props.logId)`
const useLogsStore = () => useStore(_logStore);

// Ex.: `const [log, setLog] = useLogStore(props.logId)`
const useLogStore = logId => {
  const [logs, setLogs] = useStore(_logStore);
  return [logs[logId] || EMPTY_LOG(logId), log => setLogs({ ...logs, [logId]: log })];
};

class Logs {
  static edit = (
    logs,
    { id = shortid.generate(), title = '', participantIds = [], messages = [] }
  ) => ({
    ...logs,
    [id]: { id, title, participantIds, messages }
  });

  static remove = (logs, id) => {
    const res = { ...logs };
    delete res[id];
    return res;
  };
}

// Ex.: `setLog(Log.addMessage(log, 'jane', 'hello'))`
class Log {
  static setTitle = (log, title) => ({ ...log, title });

  static setParticipantIds = (log, participantIds) => ({ ...log, participantIds });

  static setSelectedParticipantId = (log, selectedParticipantId) => ({
    ...log,
    selectedParticipantId
  });

  static addMessage = (log, participant, message) => ({
    ...log,
    messages: [...log.messages, { participant, message }]
  });
}

export { Log, Logs, useLogStore, useLogsStore };
