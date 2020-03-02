import React, { useState } from 'react';
import './App.css';
import { Navigator, Page, Tab, Tabbar } from 'react-onsenui';
import { Sessions } from './components/Sessions';
import { Roles } from './components/Roles';

const tabs = [
  ['Sessions', 'fa-comments', Sessions],
  ['Roles', 'fa-address-card', Roles]
];

const Main = ({ navigator }) => {
  const [tab, setTab] = useState();

  return (
    <Page>
      <Tabbar
        onPreChange={({ index }) => setTab(index)}
        position="bottom"
        index={tab}
        renderTabs={() =>
          tabs.map(([label, icon, Component]) => ({
            content: <Component key={label} navigator={navigator} />,
            tab: <Tab key={label} label={label} icon={icon} />
          }))
        }
      />
    </Page>
  );
};

const App = () => {
  return (
    <Navigator
      initialRoute={{ component: Main, props: { key: 'main' } }}
      renderPage={(route, navigator) => {
        const props = route.props || {};
        props.navigator = navigator;

        return React.createElement(route.component, props);
      }}
    />
  );
};

export default App;
