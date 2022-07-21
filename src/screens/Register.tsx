import { VStack } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert(
          'Registar',
          'Preencha todos os campos'
      );
    }

    setIsLoading(true);

    firestore()
        .collection('orders')
        .add({
          patrimony,
          description,
          status: 'open',
          created_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          Alert.alert(
              'Solicitação',
              'Solicitação registrada com sucesso!'
          );
          navigation.goBack();
        })
        .catch((error) => {
          setIsLoading(false);
          return Alert.alert(
              'Solicitação',
              'Não foi possível registrar o pedido.'
          )
        })
  }

  return (
      <VStack flex={ 1 }
              p={ 6 }
              bg="gray.600">
        <Header title="Nova solicitação"/>

        <Input placeholder="Número do patrimônio"
               onChangeText={setPatrimony}
               mt={ 4 }/>

        <Input placeholder="Descrição do problema"
               flex={ 1 }
               onChangeText={setDescription}
               mt={ 5 }
               multiline
               textAlignVertical="top"/>

        <Button title="Cadastrar"
                isLoading={isLoading}
                onPress={handleNewOrderRegister}
                mt={ 5 }/>
      </VStack>
  );
}