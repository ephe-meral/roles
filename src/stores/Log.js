import React from 'react';
import { createStore, useStore } from 'react-hookstore';

const LOCALSTORAGE_ID = 'logs';

const EMPTY_LOG = {
  participants: [
    // All available as IDs, see Role
  ],
  messages: [
    // Shape: { participant, message }
  ]
};

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

// Ex.: `const [log, setLog] = useLogStore(props.logId)`
const useLogStore = logId => {
  const [logs, setLogs] = useStore(_logStore);
  return [logs[logId] || EMPTY_LOG, log => setLogs({ ...logs, [logId]: log })];
};

// Ex.: `setLog(Log.addMessage(log, 'jane', 'hello'))`
class Log {
  static addMessage = (log, participant, message) => ({
    ...log,
    messages: [...log.messages, { participant, message }]
  });
}

export { Log, useLogStore };
