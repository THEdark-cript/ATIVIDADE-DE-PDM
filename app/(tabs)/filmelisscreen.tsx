import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Location from 'expo-location';

export default function FilmeListScreen() {
  const [items, setItems] = useState([{ id: '1', name: 'Item inicial' }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [editando, setEditando] = useState<null | string>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      const dadosSalvos = await AsyncStorage.getItem('filmes');
      if (dadosSalvos) {
        setItems(JSON.parse(dadosSalvos));
      }
    };
    carregarDados();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('filmes', JSON.stringify(items));
  }, [items]);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão negada');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const salvarItem = () => {
    if (newItem.trim() === '') return;
    if (editando) {
      setItems(
        items.map((i) => (i.id === editando ? { ...i, name: newItem } : i)),
      );
      setEditando(null);
    } else {
      setItems([...items, { id: Date.now().toString(), name: newItem }]);
    }
    setNewItem('');
    setModalVisible(false);
  };

  const deletarItem = () => {
    if (editando) {
      setItems(items.filter((i) => i.id !== editando));
      setEditando(null);
      setNewItem('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de FILMES</Text>

      {location && (
        <Text style={styles.item}>
          📍 Localização atual: {location.coords.latitude}, {location.coords.longitude}
        </Text>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setEditando(item.id);
              setNewItem(item.name);
              setModalVisible(true);
            }}
          >
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Button
        title="Adicionar Filme"
        onPress={() => {
          setEditando(null);
          setNewItem('');
          setModalVisible(true);
        }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {editando ? 'Editar Filme' : 'Novo Filme'}
          </Text>
          <TextInput
            style={styles.input}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Digite o nome do filme"
            placeholderTextColor="#888"
          />
          <Button
            title={editando ? 'Salvar alterações' : 'Criar'}
            onPress={salvarItem}
          />
          {editando && <Button title="Deletar" onPress={deletarItem} />}
          <Button
            title="Cancelar"
            onPress={() => {
              setEditando(null);
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  title: { fontSize: 20, marginBottom: 10, color: '#fff', fontWeight: 'bold' },
  item: { fontSize: 16, marginVertical: 5, color: '#fff' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 8,
    width: '80%',
    marginVertical: 10,
    backgroundColor: '#222',
    color: '#fff',
  },
});
