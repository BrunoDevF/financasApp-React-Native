import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';



export const Container = styled.View `
  flex:1;
  justify-content: center;
  align-items: center;
  background-color: #121212;
  padding-top: ${ 0 + getStatusBarHeight() };
`;
export const Titulo = styled.Text `
  font-size: 25px;
  color: #fff;
`;
export const Nome = styled.Text`
    font-size:45;
    color: #fff;
`;
export const BotaoNormal = styled.TouchableOpacity`
    background-color: #121212;
    border: 2px solid #fff;
    border-radius: 10px; 
    padding: 10px;
    width: 90%;
    justify-content: center;
    align-items: center;
`;
export const BotoaoSimples = styled.Text`
    font-size: 20;
    color: #fff;
`;







