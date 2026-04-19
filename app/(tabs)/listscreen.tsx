import React, { useState } from 'react';
import { View, Text, FlatList, Button, Modal, TextInput, StyleSheet } from 'react-native';

export default function ListScreen() {
  const [items, setItems] = useState([
    { id: '1', name: 'Item inicial' }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { id: Date.now().toString(), name: newItem }]);
      setNewItem('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Objetos</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      <Button title="Adicionar novo" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Digite o nome do objeto:</Text>
          <TextInput
            style={styles.input}
            value={newItem}
            onChangeText={setNewItem}
          />
          <Button title="Salvar" onPress={addItem} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  item: { fontSize: 16, marginVertical: 5 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { borderWidth: 1, padding: 8, width: '80%', marginVertical: 10 }
});
