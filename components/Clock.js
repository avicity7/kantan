import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Clock = () => { 
    const [time, setTime] = useState(null);
    useEffect(() => {
        let secTimer = setInterval( () => {
            let time = getCurrentTime();
            setTime(time);
          },1000)

    }, []);
    const getCurrentTime = () => {
      let today = new Date();
      let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
      let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
      let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
      return hours + ':' + minutes + ':' + seconds;
    }
    return (
        <Text style = {styles.highlightTime}>{time}</Text>
    );
}

const styles = StyleSheet.create ({ 
    highlightTime : { 
        fontSize : 48.6,
        color : "#6FB16D",  
        fontFamily : "Sora_600SemiBold"
    }
});



export default Clock; 