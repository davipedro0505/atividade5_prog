import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const Stack = createNativeStackNavigator();


function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.input} placeholder="Login" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

      <Button title="Entrar" onPress={() => navigation.navigate("Lista")} />
      <Button title="Cadastre-se" onPress={() => navigation.navigate("CadastroUsuario")} />
    </View>
  );
}

function CadastroUsuario({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput style={styles.input} placeholder="Nome" />
      <TextInput style={styles.input} placeholder="CPF" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Senha" />

      <Button title="Salvar" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Lista({ navigation }) {

  const [contatos, setContatos] = useState([
    {
      id: '1',
      nome: "Marcos Andrade",
      telefone: "81 988553424",
      email: "marcos@gmail.com"
    }
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>

      <Button
        title="Adicionar Contato"
        onPress={() => navigation.navigate("CadastroContato", { contatos, setContatos })}
      />

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("EditarContato", {
                contato: item,
                contatos,
                setContatos
              })
            }
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.telefone}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function CadastroContato({ route, navigation }) {

  const { contatos, setContatos } = route.params;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  function salvar() {
    const novo = {
      id: Date.now().toString(),
      nome,
      telefone,
      email
    };

    setContatos([...contatos, novo]);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Contato</Text>

      <TextInput style={styles.input} placeholder="Nome" onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Telefone" onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

function EditarContato({ route, navigation }) {

  const { contato, contatos, setContatos } = route.params;

  const [nome, setNome] = useState(contato.nome);
  const [telefone, setTelefone] = useState(contato.telefone);
  const [email, setEmail] = useState(contato.email);

  function alterar() {
    const atualizados = contatos.map(c =>
      c.id === contato.id ? { ...c, nome, telefone, email } : c
    );

    setContatos(atualizados);
    navigation.goBack();
  }

  function excluir() {
    const filtrados = contatos.filter(c => c.id !== contato.id);
    setContatos(filtrados);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Contato</Text>

      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Button title="Alterar" onPress={alterar} />
      <Button title="Excluir" onPress={excluir} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="CadastroContato" component={CadastroContato} />
        <Stack.Screen name="EditarContato" component={EditarContato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  item: {
    padding: 10,
    borderBottomWidth: 1
  },
  nome: {
    fontWeight: 'bold'
  }
});
