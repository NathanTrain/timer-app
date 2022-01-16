import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useFonts, Ubuntu_400Regular, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import AppLoading from 'expo-app-loading';
import Contador from './Contador';

export default function App() {

  console.disableYellowBox = true;

  const [estado, setEstado] = useState('select')
  const [segundos,setSegundos] = useState(0);
  const [minutos,setMinutos] = useState(0);

  const [alarmeSound, setAlarmSound] = useState([
    {
      id:1,
      selecionado: true,
      som:'Alarme 1',
      file: require('./assets/alarme1.mp3')
    },
    {
      id:2,
      selecionado: false,
      som:'Alarme 2',
      file: require('./assets/alarme2.mp3')
    },
    {
      id:3,
      selecionado: false,
      som:'Alarme 3',
      file: require('./assets/alarme3.mp3')
    }
  ]);

  function setAlarme(id){
    let alarmesTemp = alarmeSound.map((val)=>{
      if (id != val.id){
        val.selecionado = false;
      }else{
        val.selecionado = true;
      }
      return val;
    })
    setAlarmSound(alarmesTemp);
  }

  var numeros = [];
  for (var i = 0; i<=59; i++){
    numeros.push(i);
  }

  let [fontsLoaded] = useFonts({ Ubuntu_400Regular, Ubuntu_500Medium});
  if (!fontsLoaded) {
    return <AppLoading />
  }


  if (estado == 'select'){
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#509', '#56b']}
        style={{
          position:'absolute',
          left:0,
          right:0,
          top:0,
          height:'100%'
        }}
      />
      <StatusBar style="light" />
      <Text style={styles.principalText}>Selecione seu tempo:</Text>
      <View style={styles.selectionPickers}>
        <Text style={styles.information}>Min:</Text>
          <Picker
            style={styles.pickerNum}
            selectedValue={minutos}
            onValueChange={(itemValue, itemIndex) => setMinutos(itemValue)}
          >
            {
              numeros.map((val)=>{
                return(
                  <Picker.Item label={val.toString()} value={val.toString()}/>
                );
              })
            }
          </Picker>
        <View style={{paddingLeft:20}}>
          <Text style={styles.information}>Seg:</Text>
        </View>
          <Picker
            style={styles.pickerNum}
            selectedValue={segundos}
            onValueChange={(itemValue, itemIndex) => setSegundos(itemValue)}
          >
            {
              numeros.map((val)=>{
                return(
                  <Picker.Item label={val.toString()} value={val.toString()}/>
                );
              })
            }
          </Picker>
      </View>

      <View style={styles.alarmSelection}>
        {
          alarmeSound.map((val)=>{
            if (val.selecionado){
              return(
                <TouchableOpacity onPress={()=>setAlarme(val.id)} style={styles.btnSelected}>
                  <Text style={styles.btnEscolher_Text}>{val.som}</Text>
                </TouchableOpacity>
              )
            }else{
              return(
                <TouchableOpacity onPress={()=>setAlarme(val.id)} style={styles.btnEscolher}>
                  <Text style={styles.btnEscolher_Text}>{val.som}</Text>
                </TouchableOpacity>
              )
            }
          })
        }
      </View>

        <TouchableOpacity
          onPress={()=>{
            (segundos == 0 && minutos == 0)? alert('selecione um tempo válido') : setEstado('start')
          }}
          style={styles.btnStart}>
          <Text style={styles.btnStart_Text}>Iniciar</Text>
        </TouchableOpacity>

    </View>
  );
  }else if(estado == 'start'){
    return(
      <Contador alarmes={alarmeSound} setMinutos={setMinutos} setSegundos={setSegundos} setEstado={setEstado} minutos={minutos} segundos={segundos} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  principalText:{
    color: '#fff',
    fontFamily: 'Ubuntu_500Medium',
    fontSize:30,
    marginBottom:30,
  },
  selectionPickers:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:30,
  },
  pickerNum:{
    height: 25,
    width: 90,
    color:'#fff',
  },
  information:{
    color:'#fff',
    fontSize:15,
    paddingRight:10,
  },
  btnEscolher:{
    padding:8,
    paddingHorizontal:15,
    backgroundColor:'#76f',
    marginBottom:20,
    borderRadius:13,
    borderColor:'#0000',
    borderWidth:1,
    marginHorizontal:5,
  },
  btnEscolher_Text:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Ubuntu_400Regular',
    fontSize:17,
  },
  btnSelected:{
    padding:8,
    paddingHorizontal:15,
    backgroundColor:'#76f8',
    borderColor:'#fff',
    borderWidth:1,
    marginBottom:20,
    borderRadius:13,
    marginHorizontal:5,
  },
  alarmSelection:{
    flexDirection:'row',
    marginHorizontal:30,
  },
  btnStart:{
    backgroundColor:'#76f',
    width:100, height:100,
    borderRadius:50,
    borderColor:'#fff',
    borderWidth:1.5,
    alignItems:'center',
    justifyContent:'center'
  },
  btnStart_Text:{
    color:'#fff',
    fontSize:20,
    fontFamily:'Ubuntu_500Medium'
  },  
});
