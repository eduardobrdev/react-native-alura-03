import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
//import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Nota } from "./src/componentes/Nota"
import { buscaNotas, criaTabela } from "./src/servicos/Notas"

export default function App() {

  useEffect(() => {
    criaTabela()
    mostraNotas()
  },[])

  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])

  // AsyncStorage
  // async function mostraNotas() {
  //   const todasChaves = await AsyncStorage.getAllKeys()
  //   const todasNotas = await AsyncStorage.multiGet(todasChaves)
  //   setNotas(todasNotas)
  // }

  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />}
        keyExtractor={nota => nota.id}
      />
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
    paddingTop: 16
	},
})

