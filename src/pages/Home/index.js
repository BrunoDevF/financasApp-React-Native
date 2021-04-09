import React, { useContext, useState, useEffect } from 'react';


import firebase from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import Header from '../../component/header';
import HistoricoList from '../../component/HistoricoList';
import { Background, Container,Nome,Saldo,Title, List } from './styles';
import {format} from 'date-fns'
export default function Home() {
  const [historico,setHistorico] = useState([]);

  const [saldo, setSaldo] = useState(0);
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;
  const navigation = useNavigation();
  
  useEffect(()=>{
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
        setSaldo(snapshot.val().saldo);
      })

      await firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date').equalTo(format(new Date, 'dd/MM/yy'))
      .limitToLast(10).on('value', (snapshot)=>{
        setHistorico([]);
        snapshot.forEach((itemChild)=>{
          let lista = {
            key: itemChild.key,
            tipo: itemChild.val().tipo,
            valor: itemChild.val().valor.toFixed(2)
          }

          setHistorico(oldArray => [...oldArray, lista].reverse());
        })
      })
    }
    loadList();
  }, []);


  return (
    <Background>
      <Header/>
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2)}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>

      <List 
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => ( <HistoricoList data={item}  /> ) }
      />


    </Background>
    );
}