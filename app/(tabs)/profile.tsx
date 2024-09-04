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
    height:100,
    width:500,
    backgroundColor:"#F5F7F8",
    flex:1,
    alignItems:"center"
  },
  cardElevated: {
    color: "red",
  },
  subTitle: {
    color: "blue",

  },
  description: {
    color: "red",
  },
  genratedPassword: {
    display:'flex',
    justifyContent:"center",
    alignItems:'center',
    fontSize:25
  },
  errorText: {
    color: "red",
  },

  appContainer: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtn: {
    fontSize: 24,
    backgroundColor: "green",
    color: "black",

    borderRadius: 15,
  },
  formContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputStyle2: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#333",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
  },
  inputStyle: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#333",
  },
  formAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    padding: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  DarkButtonText: {
    fontSize: 18,
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 15,
    color: "#fff",
    fontWeight: "bold",
  },
});
