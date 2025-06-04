
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  PanGestureHandlerGestureEvent,
  HandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { router } from "expo-router";
import { AsyncStorage } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

type VerifyEmailModalProps = {
  visible: boolean;
  onClose: () => void;
  onVerify: () => void;
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function VerifyEmail({
  visible,
  onClose,
  onVerify,
  emailAddress,
  password,
  firstName,
  lastName,
}: VerifyEmailModalProps) {
  const verifyCardY = useSharedValue(SCREEN_HEIGHT);
  const emailSeenY = useSharedValue(SCREEN_HEIGHT);
  const lastTranslateY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      verifyCardY.value = withSpring(0, { damping: 30 });
    } else {
      verifyCardY.value = withSpring(SCREEN_HEIGHT);
      emailSeenY.value = withSpring(SCREEN_HEIGHT);
    }
  }, [visible]);

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationY } = event.nativeEvent;
    if (translationY > 0) {
      verifyCardY.value = translationY;
      lastTranslateY.value = translationY;
    }
  };


  const onGestureEnd = (
    _event: HandlerStateChangeEvent<Record<string, unknown>>
  ) => {
    if (lastTranslateY.value > 150) {
      verifyCardY.value = withSpring(SCREEN_HEIGHT);
      emailSeenY.value = withSpring(SCREEN_HEIGHT);
      runOnJS(onClose)();
    } else {
      verifyCardY.value = withSpring(0, { damping: 30 });
    }
  };

  const verifyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: verifyCardY.value }],
  }));

  const emailSeenStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: emailSeenY.value }],
  }));

  if (!visible) return null;

  return (
    <GestureHandlerRootView className="absolute inset-0 z-50">
      {/* First Card */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEnd}
      >
        <Animated.View
          style={verifyStyle}
          className="absolute bottom-0 w-full h-[450px] bg-white rounded-t-3xl shadow-xl"
        >
          <View className="flex-1 items-center px-6 pt-4 gap-[10px]">
            <Image
              source={require("../../assets/images/Grabber.png")}
              className="w-12 h-2 mb-6 rounded-full"
            />
            <Image source={require("../../assets/images/16.png")} />
            <Text className="text-2xl font-bold text-[#1D2939] text-center mt-4 mb-2">
              We’ve got to verify you
            </Text>
            <Text className="text-base text-[#344054] text-center mb-4">
              Select which verification method you prefer, and it will be sent
              to your email.
            </Text>
            <TouchableOpacity
              onPress={() => {
                verifyCardY.value = withSpring(SCREEN_HEIGHT);
                emailSeenY.value = withSpring(0, { damping: 30 });
              }}
              className="bg-[#090E24] rounded-full mt-4 w-[320px] h-[48px] flex items-center justify-center"
            >
              <Text className="text-white font-semibold text-lg">Verify Me</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>

      {/* Email Seen Card */}
      <PanGestureHandler
        onGestureEvent={(event) => {
          const { translationY } = event.nativeEvent;
          if (translationY > 0) {
            emailSeenY.value = translationY;
            lastTranslateY.value = translationY;
          }
        }}
        onHandlerStateChange={(event) => {
          if (lastTranslateY.value > 150) {
            emailSeenY.value = withSpring(SCREEN_HEIGHT);
            runOnJS(onClose)();
          } else {
            emailSeenY.value = withSpring(0, { damping: 30 });
          }
        }}
      >
        <Animated.View
          style={emailSeenStyle}
          className="absolute bottom-0 w-full h-[480px] bg-white rounded-t-3xl px-6 shadow-xl"
        >
          <View className="flex flex-col justify-center items-center mt-6">
            {/* <Image
              source={require("../../assets/images/Grabber.png")}
              className="w-12 h-2 mb-6 rounded-full"
            /> */}

<View className="w-[36px] h-[4px] bg-gray-300 self-center rounded-full mb-6 mt-0" />
            <Image source={require("../../assets/images/Clip path group.png")} />
            <Text className="text-4xl font-bold mt-4 mb-4 text-[#1D2939] text-center">
              You’ve got an email
            </Text>
            <Text className="text-base mb-4 text-[#1D2939] text-center">
              Check your email, we’ve sent you a verification code. Enter the
              code in the next screen.
            </Text>
            <TouchableOpacity
              onPress={() => {
                emailSeenY.value = withSpring(SCREEN_HEIGHT);
                verifyCardY.value = withSpring(SCREEN_HEIGHT);
                runOnJS(() => {
                  onClose();
                  setTimeout(() => {
                    router.push({
                      pathname: "/auth/codeVerification",
                      params: {
                        emailAddress,
                        password,
                        firstName,
                        lastName,
                      },
                    });
                  }, 300);
                })();
              }}
              className="bg-[#090E24] p-2 rounded-full mt-4 w-[333px] h-[45px]"
            >
              <Text className="text-white text-center mt-1">Okay, Got It</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}






















