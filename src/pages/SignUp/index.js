import React, {useState, useContext} from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText,
         } from '../SignIn/styles';

import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext);


  function handleSignUp() {
    signUp(email,password,nome);
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
            placeholder="Digite seu nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={ nome }
            onChangeText={ (text) => setNome(text) }
          />
        </AreaInput>

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
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp} >
        {
            loadingAuth ? 
            (
              <ActivityIndicator 
                size={20}
                color="#fff"
              />
            ) : 
            (
              <SubmitText>Acessar conta</SubmitText>
            )
          }
          
        </SubmitButton>

      </Container>
   </Background>
  );
}