import React from 'react';
import { View,Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
                <TipoText>Receita</TipoText>
import {Container,Tipo,IconView,ValorText,TipoText} from './styles';

// 
export default function HistoricoList({ data }) {
 return (
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
  );
}