import React from 'react';
import { Container, ButtonMenu } from './styles';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
  const navigation = useNavigation();

  return (
    <Container>
        <ButtonMenu onPress={ () => navigation.toggleDrawer() }>
            <FontAwesome.Button name="bars" size={30} backgroundColor="#131313" />

        </ButtonMenu>
    </Container>
  );
}