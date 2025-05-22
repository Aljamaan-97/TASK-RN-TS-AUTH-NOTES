import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../data/styling/colors";
import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { router } from "expo-router";
import AuthContext from "@/context/AuthContext";
import { storeToken } from "@/api/Storage";
const Index = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, data } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login({ email, password }),
    onSuccess: async (response) => {
      if (response?.token) {
        await storeToken(response.token);
      }
      setIsAuthenticated(true);
      router.replace("/");
    },
  });
  console.log("token: ", data);

  const handelLogin = () => {
    // Check if email and password are not empty
    // If empty, show alert
    if (email === "" || password === "") {
      alert("Please fill all fields");
    }
    mutate();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Login to your account
          </Text>

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={() => handelLogin()}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <Text style={{ color: colors.white, fontSize: 16 }}>
            Don't have an account?{" "}
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              Register
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({});
