import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const protectedLayout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Redirect href={"/Login"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default protectedLayout;
