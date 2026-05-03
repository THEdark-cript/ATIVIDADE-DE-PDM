import React, { useState } from 'react';
import { View, Text, FlatList, Button, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function ListScreen() {
  const [items, setItems] = useState([{ id: '1', name: 'Item inicial' }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [editando, setEditando] = useState<null | string>(null);

  const salvarItem = () => {
    if (newItem.trim() === '') return;
    if (editando) {
    
      setItems(items.map(i => i.id === editando ? { ...i, name: newItem } : i));
      setEditando(null);
    } else {

      setItems([...items, { id: Date.now().toString(), name: newItem }]);
    }
    setNewItem('');
    setModalVisible(false);
  };

  const deletarItem = () => {
    if (editando) {
      setItems(items.filter(i => i.id !== editando));
      setEditando(null);
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
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setEditando(item.id);
            setNewItem(item.name);
            setModalVisible(true);
          }}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Adicionar a lista" onPress={() => { setEditando(null); setNewItem(''); setModalVisible(true); }} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{editando ? "Editar Objeto" : "Novo Objeto"}</Text>
          <TextInput
            style={styles.input}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Digite o nome do objeto"
          />
          <Button title={editando ? "Salvar alterações" : "Criar"} onPress={salvarItem} />
          {editando && <Button title="Deletar" onPress={deletarItem} />}
          <Button title="Cancelar" onPress={() => { setEditando(null); setModalVisible(false); }} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fffff' },
  title: { fontSize: 20, marginBottom: 10, color: '#000000', fontWeight: 'bold' },
  item: { fontSize: 16, marginVertical: 5, color: '#000000' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  input: { borderWidth: 1, borderColor: '#cccccc', padding: 8, width: '80%', marginVertical: 10, backgroundColor: '#f9f9f9', color: '#000000' }
});
