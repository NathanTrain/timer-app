import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

export default function Contador(props) {

    var done = false;

    useEffect(()=>{

        const timer = setInterval(()=>{

            props.setSegundos(props.segundos-1);

            if(props.segundos <= 0){
                if(props.minutos > 0){
                    props.setMinutos(props.minutos-1);
                    props.setSegundos(59);
                }
                else{
                    if(!done){
                        done = true;
                        props.setEstado('select');
                        props.setMinutos(0);
                        props.setSegundos(0);
                        playSound();
                    }
                }
            }

        },1000)

        return () => clearInterval(timer);
    })

    async function playSound(){
        const soundObject = new Audio.Sound();
        try{
            var alarme;
            props.alarmes.map((val)=>{
                if (val.selecionado){
                    alarme = val.file;
                }
            })
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();
            // som toca e aplicativo roda, depois ele limpa
            // await soundObject.unloadAsync();
        }catch(error){

        }
    }






    function reset(){
        props.setEstado('select');
        props.setMinutos(0);
        props.setSegundos(0);
    };

    function formatarNum(number){
        var finalNumber = "";

        (number < 10)?
            finalNumber = '0'+number
        :
            finalNumber = number;

        return finalNumber
    }

    var segundos = formatarNum(props.segundos);
    var minutos = formatarNum(props.minutos);



    return(
        <View style={styles.container}>
            <StatusBar style='light'/>
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
            <View style={{flexDirection:'row', marginBottom:30}}>
                <Text style={styles.textContador}>{minutos}:</Text>
                <Text style={styles.textContador}>{segundos}</Text>
            </View>

            <TouchableOpacity onPress={()=>reset()} style={styles.btnStart}>
                    <Text style={styles.btnStart_Text}>Reiniciar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContador:{
    color:'#fff',
    fontSize:50,
    fontFamily:'Ubuntu_500Medium'
  },
  btnStart:{
    backgroundColor:'#65e',
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
