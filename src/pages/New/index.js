import React, {useState, useContext} from 'react';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Picker from '../../component/Picker/index.android';
import Header from '../../component/header';
import { Background,Input,SubmitButton,SubmitText } from './styles';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

export default function New() {
  const navigation = useNavigation();
  const [valor,setValor] = useState('');
  const [tipo,setTipo] = useState('receita');
  const { user: usuario } = useContext(AuthContext);


  async function handleAdd(){
    let uid = usuario.uid;
    let key = await firebase.database().ref('historico').child(uid).push().key;
    
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy')
    });

    //Atualizar dados 
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) =>{
      let saldo = parseFloat(snapshot.val().saldo);
      
      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);
      user.child('saldo').set(saldo);
    });

    setValor('');
    Keyboard.dismiss();
    navigation.navigate('Home');
  }
  function handleSubmit(){
    Keyboard.dismiss();
    if(isNaN(parseFloat(valor)) || valor === null){
      alert('Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - valor: ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: ()=> handleAdd()
        }
      ]
    )

  }
 return (
   <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
   <Background>
      <Header />
      
      <SafeAreaView style={{alignItems: 'center'}}>
      <Input 
        placeholder="Digite o valor desejado..."
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={ ()=>Keyboard.dismiss()}
        value={valor}
        onChangeText={(text)=>setValor(text)}
      />

      <Picker onChange={setTipo} tipo={tipo} />

      <SubmitButton onPress={handleSubmit}>
        <SubmitText>Registrar</SubmitText>
      </SubmitButton>


      </SafeAreaView>
   </Background>
   </TouchableWithoutFeedback>
  );
}