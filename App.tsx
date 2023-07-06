import React from 'react';
import {makeServer} from './src/mock/server';
import {Provider} from 'react-redux';
import {store} from './src/Reducer/store';
import Homepage from './src/Views/Homepage';
import {StatusBar, View} from 'react-native';
import styled from 'styled-components';

makeServer({environment: 'development'});

export default function App() {

  return (
    <Wrapper>
      <Provider store={store}>
        <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
        <Homepage />
      </Provider>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  flex: 1;
  background-color: #333;
`;
