import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View } from 'react-native';

import { Container, Titulo } from './src/styles';

export default function App() {
  return (
    <Container>
      <Titulo>Ola mundo react</Titulo>
    </Container>
  );
}

