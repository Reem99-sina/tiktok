import { useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { router, useLocalSearchParams } from "expo-router";
import { FormDataResendCode, FormDataVerify } from "@/types/user";
import { resendCodeRequest, verifyEmailRequest } from "@/action/user";
import Button from "@/components/ui/Button";
import { handleApiRequest } from "@/utils/apiHandler";

export default function VerifyCode() {
  let [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ loading state
  const { email } = useLocalSearchParams<{ email: string }>();

  const onSubmit = async (data: FormDataVerify) => {
    setIsSubmitting(true); // start loading
    try {
      const result = await handleApiRequest(() => verifyEmailRequest(data));
      if (!result) return;
      // optionally navigate to another screen
      router.push("/(auth)/login");
    } catch (err: any) {
      Alert.alert(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false); // stop loading
    }
  };

  const onResendCodeRequest = async (data: FormDataResendCode) => {
    const result = await handleApiRequest(() => resendCodeRequest(data));
    if (!result) return; // error already handled inside helper

  };

  return (
    <View style={styles.container}>
      (
      <Text style={styles.mainText}>
        Enter the 4-digit code sent to you at {email}
      </Text>
      )
      {/* <Pressable
        onPress={() => {
          navigation?.navigate("acountEmail");
        }}
      >
        <Text style={styles.text}>Changed your mobile number?</Text>
      </Pressable> */}
      <View style={{ width: 200, alignSelf: "flex-start" }}>
        <OtpInput
          numberOfDigits={4}
          onTextChange={(text) => console.log(text)}
          autoFocus={false}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onFilled={(text) => {
            setCode(text);
            Keyboard?.dismiss();
          }}
          theme={{
            pinCodeContainerStyle: {
              backgroundColor: "lightgray",
              marginHorizontal: 5, // controls space between each input box
            },
            pinCodeTextStyle: { fontSize: 20 }, // optional: text size
          }}
        />
      </View>
      {/* {!checkifrightcode && <Text style={styles.error}>not right code</Text>}
      <ButtonCustom
        styleButton={styles.button}
        onPress={() => {
          if (number) {
            dispatch(sendOtp(number));
          }
        }}
      >
        <Text>Resend me code</Text>
      </ButtonCustom> */}
      <Button
        title="Verify"
        onPress={() => onSubmit({ email: email, code })}
        disabled={isSubmitting}
      />
      <TouchableOpacity onPress={() => onResendCodeRequest({ email })}>
        <Text style={styles.text}>Resend me code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 50,
    height: "100%",
    gap: 20,
  },
  mainText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    textDecorationLine: "underline",
    marginVertical: 20,
    textAlign: "center",
    color: "#555",
  },
  button: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    width: "auto",
    padding: 10,
    marginVertical: 10,
  },
  error: {
    color: "red",
  },
});
