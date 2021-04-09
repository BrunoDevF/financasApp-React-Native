import React, { useContext, useState, useEffect } from 'react';

import {Alert, TouchableOpacity, Platform} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import firebase from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import Header from '../../component/header';
import HistoricoList from '../../component/HistoricoList';
import { Background, Container,Nome,Saldo,Title, List, Area,ButtonIcon } from './styles';
import { DatePicker } from '../../component/DatePicker';
import {format, isPast,isBefore} from 'date-fns';

export default function Home() {
  const [historico,setHistorico] = useState([]);

  const [saldo, setSaldo] = useState(0);
  const [newDate,setNewDate] = useState(new Date());

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  useEffect(()=>{
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value',(snapshot)=>{
        setSaldo(snapshot.val().saldo);
      })

      await firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(10).on('value', (snapshot)=>{
        setHistorico([]);
        snapshot.forEach((itemChild)=>{
          let lista = {
            key: itemChild.key,
            tipo: itemChild.val().tipo,
            valor: itemChild.val().valor.toFixed(2),
            date: itemChild.val().date
          }

          setHistorico(oldArray => [...oldArray, lista].reverse());
        })
      })
    }
    loadList();
  }, []);

  function handleDelete(data) {

    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dataItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
    

    //
    const formatDiaHoje = format(new Date(), 'dd/mm/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    


    if( isBefore(dataItem,dateHoje) ){
      alert('Você não pode excluir um registro antigo!');
      return;
    }
    Alert.alert(
      'Cuidado atenção',
      `Você deseja excluir ${data.tipo} no valor de ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )
  }
  async function handleDeleteSuccess(data) {
    await firebase.database().ref('historico')
    .child(uid).child(data.key).remove()
    .then(async ()=>{
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('users').child(uid)
      .child('saldo').set(saldoAtual)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function handleShowPicker(){
    setShow(true);
  }
  function handleClose(){
    setShow(false);
    value={newDate}
  }
  function onChange(date){
    setShow(Platform.OS === 'ios');
    setNewDate(date);
  }

  return (
    <Background>
      <Header/>
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2)}</Saldo>
      </Container>
    <Area>
      <FontAwesome.Button 
        name="calendar"
        color="#fff" 
        size={25} 
        backgroundColor="transparent" 
        onPress={()=>{handleShowPicker}}
      />
      <Title>Ultimas movimentações</Title>
    </Area>

      <List 
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => ( <HistoricoList data={item} deleteItem={handleDelete}  /> ) }
      />

    {show && (
      <DatePicker 
        onClose={handleClose}
        date={newDate}
        onChange={onChange}
      />
    )}

    </Background>
    );
}