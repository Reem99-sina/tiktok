import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useAuthStore } from "@/store/useAuthStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {  StyleSheet, Text, TouchableOpacity } from "react-native";
import { schemaLogin } from "@/validation/user";
import { FormDataLogin } from "@/types/user";
import { loginRequest } from "@/action/user";
import { handleApiRequest } from "@/utils/apiHandler";
import { ThemedView } from "@/components/themed-view";

export default function LoginScreen() {
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataLogin>({
    resolver: yupResolver(schemaLogin),
  });

  const setToken = useAuthStore((state) => state.setToken);

  const onSubmit = async (data: FormDataLogin) => {
    const result = await handleApiRequest(() => loginRequest(data));
  
    if (!result) return; // error already handled inside helper
    setToken(result.data.token);
    router.push("/")

  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.registerText}>
          {" "}
          Don&apos;t have an account? Sign up
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  registerText: { textAlign: "center", color: "#555", marginTop: 20 },
});
