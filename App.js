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
  StyleSheet,
  Alert
} from 'react-native';

const Stack = createNativeStackNavigator();

function Login({ navigation, usuarios, contatos, setContatos }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    if (!login || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    navigation.navigate("Lista");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.input} placeholder="Login" onChangeText={setLogin} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={setSenha} />

      <Button title="Entrar" onPress={entrar} />
      <Button title="Cadastre-se" onPress={() => navigation.navigate("CadastroUsuario")} />
    </View>
  );
}

function CadastroUsuario({ navigation, usuarios, setUsuarios }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function salvar() {
    if (!nome || !cpf || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const novoUsuario = {
      id: Date.now().toString(),
      nome,
      cpf,
      email,
      senha
    };

    setUsuarios([...usuarios, novoUsuario]);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput style={styles.input} placeholder="Nome" onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="CPF" onChangeText={setCpf} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" onChangeText={setSenha} />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

function Lista({ navigation, contatos, setContatos }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>

      <Button title="Adicionar Contato" onPress={() => navigation.navigate("CadastroContato")} />

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("EditarContato", { contato: item })
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

function CadastroContato({ navigation, contatos, setContatos }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  function salvar() {
    if (!nome || !telefone || !email) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

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

function EditarContato({ navigation, route, contatos, setContatos }) {
  const { contato } = route.params;

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
  const [contatos, setContatos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => (
            <Login {...props} usuarios={usuarios} contatos={contatos} setContatos={setContatos} />
          )}
        </Stack.Screen>

        <Stack.Screen name="CadastroUsuario">
          {(props) => (
            <CadastroUsuario {...props} usuarios={usuarios} setUsuarios={setUsuarios} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Lista">
          {(props) => (
            <Lista {...props} contatos={contatos} setContatos={setContatos} />
          )}
        </Stack.Screen>

        <Stack.Screen name="CadastroContato">
          {(props) => (
            <CadastroContato {...props} contatos={contatos} setContatos={setContatos} />
          )}
        </Stack.Screen>

        <Stack.Screen name="EditarContato">
          {(props) => (
            <EditarContato {...props} contatos={contatos} setContatos={setContatos} />
          )}
        </Stack.Screen>
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
