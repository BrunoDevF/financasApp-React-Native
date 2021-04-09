import React from 'react';
import { View,Text, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
                <TipoText>Receita</TipoText>
import {Container,Tipo,IconView,ValorText,TipoText} from './styles';

// 
export default function HistoricoList({ data, deleteItem }) {
 return (
<TouchableWithoutFeedback onLongPress={()=>{deleteItem(data)}}>
   <Container>
       <Tipo>
           <IconView tipo={data.tipo}>
                <FontAwesome.Button 
                    name={data.tipo === 'despesa' ? "arrow-down" : "arrow-up" }
                    color="#fff" 
                    size={15} 
                    backgroundColor="transparent" 
                />
                <TipoText>{data.tipo}</TipoText>
           </IconView>
       </Tipo>
       <ValorText>
           R$ {data.valor} 
       </ValorText>
   </Container>
</TouchableWithoutFeedback>
  );
}