import React from 'react';
import Root from './navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <Root></Root>
    </Provider>
  );
};
export default App;
