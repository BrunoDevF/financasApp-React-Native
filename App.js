import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View } from 'react-native';

/* esse getStatusBarHeight vai nos ajudar a calcular a altura da nossa view */
// import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Container, Titulo, Nome, BotaoNormal, BotoaoSimples, StatusBar } from './src/styles';
/*************************
 *  Instalar a lib react-native-status-bar-height
 *  para corrigir a altura da status bar com todos os smartphones
 *************************/
export default function App() {
  return (
    <Container>
      <StatusBar backgroundColor="transparent" barStyle="light-content"
        translucent={true}
      />

      <Titulo>Ola mundo react</Titulo>
      <Nome>Bruno Henrique </Nome>
      <BotaoNormal>
        <BotoaoSimples>Entrar</BotoaoSimples>
      </BotaoNormal>
    </Container>
  );
}

