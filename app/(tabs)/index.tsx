import React, { useState } from 'react';
import { Image,Text, StyleSheet,ScrollView, Platform,View, Pressable } from 'react-native';

export default function HomeScreen() {
  const [display, setDisplay] = useState("0");
  const [input, setInput] = useState("");

  // Handle button presses
  const handlePress = (value) => {
    if (value === "AC") {
      setDisplay("0");
      setInput("");
    } else if (value === "back") {
      setInput(input.slice(0, -1));
      setDisplay(input.slice(0, -1) || "0");
    } else if (value === "=") {
      try {
        const result = eval(input);
        setDisplay(result.toString());
        setInput(result.toString());
      } catch {
        setDisplay("Error");
        setInput("");
      }
    } else {
      const newInput = input + value;
      setInput(newInput);
      setDisplay(newInput);
    }
  };

  return (
    <View style={styles.main_screen}>
      <ScrollView style={styles.main_screen_display}>
        <Text style={styles.main_screen_display_text}>{display}</Text>
      </ScrollView>
      <View style={styles.main_screen_keypad}>
        {[
          ["AC", "()", "%", "/"],
          ["7", "8", "9", "*"],
          ["4", "5", "6", "-"],
          ["1", "2", "3", "+"],
          ["0", ".", "back", "="]
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.main_screen_keypad_row}>
            {row.map((btn, btnIndex) => (
              <Pressable key={btnIndex} onPress={() => handlePress(btn)}>
                <View
                  style={
                    btn === "AC" ? styles.btn1_outer :
                    btn === "()" || btn === "%" || btn === "/" || btn === "*" || btn === "-" || btn === "+" || btn === "="
                    ? styles.btn2_outer
                    : styles.btn_outer
                  }
                >
                  <Text
                    style={
                      btn === "AC" ? styles.bg1_button :
                      btn === "()" || btn === "%" || btn === "/" || btn === "*" || btn === "-" || btn === "+" || btn === "="
                      ? styles.bg2_button
                      : styles.bg_button
                    }
                  >
                    {btn}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_screen: {
    marginTop: 30,
    display:"flex",
    flexDirection:'column',
    backgroundColor:"white",
    alignItems:'center',
    width:"100%",
    height:"100%"
  },
  main_screen_display: {
    elevation:10,
    width:"95%",
    backgroundColor:"white",
    borderRadius:10,
    marginBottom:10,
  },
  main_screen_display_text: {
    fontSize:50,
    textAlign:"right"
  },
  main_screen_keypad: {
    width:"100%",
    height:"70%",
    display:"flex",
    // flexDirection:"row"
  },
  main_screen_keypad_row: {
    display:"flex",
    flexDirection:"row",
    backgroundColor:"white",
    width:"100%",
    justifyContent:"space-between",
    padding:10
  },
  btn_outer:{
    width:70,
    height:70,
    backgroundColor:'white',
    elevation:10,
    overflow:"hidden",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20
  },
  bg_button:{
    backgroundColor:'white',
    color:"black",
    fontSize:30,
    
  },
  btn1_outer:{
    width:70,
    height:70,
    backgroundColor:'#FF5757',
    elevation:10,
    overflow:"hidden",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:50
  },
  bg1_button:{
    backgroundColor:'#FF5757',
    color:"white",
    fontSize:30
  },
  btn2_outer:{
    width:70,
    height:70,
    backgroundColor:'gray',
    elevation:10,
    overflow:"hidden",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:50
  },
  bg2_button:{
    backgroundColor:'gray',
    color:"white",
    fontSize:30
  },
});
