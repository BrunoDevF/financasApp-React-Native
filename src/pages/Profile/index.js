import React,{ useContext} from 'react';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';

import { Container, Nome, NewLink, NewText, Logout,LogoutText } from './styles';

function Profile() {

    const navigation = useNavigation();
    const { user, signOut } = useContext(AuthContext);


    return (
        <Container>
            <Nome>
                {user && user.nome}
            </Nome>

            <NewLink onPress={ () => navigation.navigate('Registrar') }>
                <NewText>Registar Gastos</NewText>
            </NewLink>

            <Logout onPress={()=>signOut()}>
                <LogoutText>Sair</LogoutText>
            </Logout>
        </Container>
  );
}
export default Profile;