import React, {useState, useContext} from 'react';
import { Platform } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText,
        Link, LinkText } from './styles';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';



export default function SignIn() {
  const navigation = useNavigation();
  
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  function handleLogin(){
    signIn(email, password);
  }
  
 return (
   <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <Logo source={require('../../assets/Logo.png')}/>

        <AreaInput>
          <Input 
            placeholder="Digite seu email"
            autoCorrect={false}
            autoCapitalize="none"
            value={ email }
            onChangeText={ (text) => setEmail(text) }
          />
        </AreaInput>
        <AreaInput>
          <Input 
            placeholder="Digite sua senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={ password }
            onChangeText={ (text) => setPassword(text) }
          />
        </AreaInput>

        <SubmitButton onPress={handleLogin} >
          <SubmitText>Acessar conta</SubmitText>
        </SubmitButton>

        <Link onPress={ () =>navigation.navigate('SignUp') }>
          <LinkText>Criar uma conta</LinkText>
        </Link>
      </Container>
   </Background>
  );
}