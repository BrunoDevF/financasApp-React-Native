import React, { useState, createContext }  from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    //logar com email e senha
    async function signIn(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid =  value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then( (snap) => {
                let data = {
                    uid: uid,
                    nome: snap.val().nome,
                    email: value.user.email
                };
                setUser(data); 
            } )
        } )
        .catch( (error) =>{
            alert('Houve um erro ao fazer login! '+ error.code);
        } )
    }
    //Cadastrar usuario
    async function signUp(email,password,nome){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                };
                setUser(data);
            })
        })
        .catch( (error) =>{
            alert( error.code);
        } )
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn }} >
            { children }
        </AuthContext.Provider>
    );
}








