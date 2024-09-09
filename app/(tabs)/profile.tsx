import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Button,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "should be min of 4 characters")
    .max(16, "should be max of 16 characters")
    .required("length is required"),
});

export default function profile() {
  const [password, setPassword] = useState("");
  const [isPasswordGenrated, setIsPasswordGenrated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [numberCase, setNumberCase] = useState(true);
  const [myname,setNewName]=useState("Rohit");
  const [numberIncrese,increaseNumber] = useState(0);
  const toggleName =()=>{
    if (myname === "Rohit"){
        setNewName("Ritesh KKr");
    }
    else{
        setNewName("Rohit");
    }
  }

  const badhao=()=>{
    increaseNumber(numberIncrese+1);
  }

  const genratedPasswordString = (passwordLength: number) => {
    let characterList = "";
    const UpperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const Digits = "0123456789";
    const specialChars = "!@#$%^&*()_+";
  
    if (upperCase) {
      characterList += UpperCaseChars;
    }
    if (lowerCase) {
      characterList += LowerCaseChars;
    }
    if (numberCase) {
      characterList += Digits;
    }
    if (symbols) {
      characterList += specialChars;
    }
  
    if (characterList.length === 0) {
      // Ensure that at least one type of character is selected
      alert("Please select at least one character type");
      return;
    }
  
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenrated(true);
  };
  
  

  const createPassword = (characters: string, passwordLength: number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword("");

    setIsPasswordGenrated(false);
    setLowerCase(true);
    setUpperCase(false);
    setSymbols(false);
    setNumberCase(false);
  };
 


  return (
    <ScrollView keyboardShouldPersistTaps="handled">
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
          initialValues={{ passwordLength: "" }}
          validationSchema={passwordSchema}
          onSubmit={(values) => {
            genratedPasswordString(+values.passwordLength);
          }}
        >
          {({
            errors,
            touched,
            isValid,
            handleReset,
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>{errors.passwordLength}</Text>
                  )}
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange("passwordLength")}
                    placeholder="Ex. 9"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include lowercase</Text>
                <BouncyCheckbox
                  style={styles.inputStyle2}
                  isChecked={lowerCase}
                  onPress={() => setLowerCase(!lowerCase)}
                  fillColor="#29AB87"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include upperCase</Text>
                <BouncyCheckbox
                  style={styles.inputStyle2}
                  isChecked={upperCase}
                  onPress={() => setUpperCase(!upperCase)}
                  fillColor="green"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include number</Text>
                <BouncyCheckbox
                  style={styles.inputStyle2}
                  isChecked={numberCase}
                  onPress={() => setNumberCase(!numberCase)}
                  fillColor="orange"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include special symbols</Text>
                <BouncyCheckbox
                  style={styles.inputStyle2}
                  isChecked={symbols}
                  onPress={() => setSymbols(!symbols)}
                  fillColor="pink"
                />
              </View>
              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={styles.primaryBtn}
                >
                  <Text style={styles.buttonText}>Generate password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReset}>
                  <Text style={styles.DarkButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.DarkButtonText}>{myname} </Text>
                <TouchableOpacity onPress={toggleName} style={styles.DarkButtonText}><Text style={styles.DarkButtonText}>Change</Text></TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.DarkButtonText}>{numberIncrese} </Text>
                <TouchableOpacity onPress={badhao} style={styles.DarkButtonText}><Text style={styles.DarkButtonText}>HSIPK1827C</Text></TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      {isPasswordGenrated && (
        <View style={[styles.card]}>
          <Text style={styles.subTitle}>Result:</Text>
          <Text style={styles.description}>Long press to copy</Text>
          <Text selectable={true} style={styles.genratedPassword}>{password}</Text>
        </View>
      )}
    </SafeAreaView>
  </ScrollView>
  
  );
}
const styles = StyleSheet.create({
    card: {
      width: '90%', // Adjusted width to be more responsive
      backgroundColor: "#F5F7F8",
      alignItems: "center",
      padding: 20,
      borderRadius: 10,
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardElevated: {
      backgroundColor: "#fff", // Elevated cards should stand out
      borderColor: "#ccc",
      borderWidth: 1,
    },
    subTitle: {
      color: "#1E3A8A", // Changed to a more readable dark blue
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 5,
    },
    description: {
      color: "#64748B", // Softened the red to a subtle grayish-blue
      fontSize: 14,
      marginBottom: 10,
    },
    genratedPassword: {
      fontSize: 20, // Reduced font size for better layout
      fontWeight: "500",
      color: "#000",
      textAlign: "center",
      letterSpacing: 1.2,
    },
    errorText: {
      color: "#DC2626", // Changed to a more visually pleasing red
      fontSize: 14,
      marginVertical: 5,
    },
    appContainer: {
      flex: 1,
      backgroundColor: "#F3F4F6",
      justifyContent: "center",
      alignItems: "center",
    },
    primaryBtn: {
      backgroundColor: "#22C55E", // Changed to a brighter green for better visibility
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      alignItems: "center",
    },
    formContainer: {
      flexDirection: "column",
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 6,
      marginVertical: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#1F2937", // Changed to a more readable dark color
      marginBottom: 20,
    },
    inputStyle2: {
      height: 40,
      paddingHorizontal: 12,
      fontSize: 14,
      color: "#374151", // Adjusted to a readable dark gray
      borderRadius: 8,
      borderWidth: 1,
      display:"flex",
      justifyContent:"center",
      borderColor: "#D1D5DB", // Light border color for better contrast
    },
    inputWrapper: {
      width: "100%",
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    heading: {
      color: "#111827",
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
    },
    inputStyle: {
      height: 44,
      width:150,
      borderColor: "#E5E7EB", // Softer border color for better aesthetics
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontSize: 14,
      color: "#4B5563", // Darker text color for better readability
    },
    formAction: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 25,
      width: '100%',
    },
    buttonText: {
      fontSize: 16,
      color: "#FFFFFF", // Kept white for contrast
      fontWeight: "bold",
    },
    DarkButtonText: {
      backgroundColor: "#374151", // Changed to a consistent dark color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      color: "#FFFFFF",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  