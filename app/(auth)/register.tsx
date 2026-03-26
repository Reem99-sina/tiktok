import { registerRequest } from "@/action/user";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { FormDataRegister } from "@/types/user";
import { handleApiRequest } from "@/utils/apiHandler";
import { schemaRegister } from "@/validation/user";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormDataRegister>({
    resolver: yupResolver(schemaRegister),
  });
  const avatar = watch("avatar");
  const pickAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted)
      return alert("Permission is required to access images");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setValue("avatar", result.assets[0].uri);
    }
  };
  const onSubmit = async (data: FormDataRegister) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.avatar) {
      const uriParts = data.avatar.split("/");
      const fileName = uriParts[uriParts.length - 1];
      const fileType = `image/${fileName.split(".").pop()}`;

      formData.append("avatar", {
        uri: data.avatar,
        name: fileName,
        type: fileType,
      } as any); // 'any' is required in React Native
    }

    const result = await handleApiRequest(() => registerRequest(formData));
    if (!result) return; // error already handled inside helper
    router.push(`/(auth)/login`);
    // router.push(`/(auth)/confirmCode/${data?.email}`);
  };
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Avatar Picker */}
      <TouchableOpacity style={styles.avatarContainer} onPress={pickAvatar}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarPlaceholder}>Select Avatar</Text>
        )}
      </TouchableOpacity>
      {errors.avatar && (
        <Text style={styles.error}>{errors.avatar.message}</Text>
      )}

      {/* Username */}
      <Controller
        control={control}
        name="username"
        render={({ field: { value, onChange } }) => (
          <InputField
            label="Username"
            placeholder="Enter your username"
            value={value}
            onChangeText={onChange}
            error={errors.username?.message}
          />
        )}
      />

      {/* Email */}
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

      {/* Password */}
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

      {/* Submit Button */}
      <Button
        title="Register"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.registerText}>Already have an account? Login</Text>
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
    marginBottom: 20,
    textAlign: "center",
  },
  registerText: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
  },
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarPlaceholder: {
    color: "#888",
    textAlign: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
});
