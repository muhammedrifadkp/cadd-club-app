import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export default function Logo({ size = "medium" }: LogoProps) {
  const styles = getStyles(size);

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.iconText}>C</Text>
      </View>
      <Text style={styles.appName}>Cadd Club</Text>
    </View>
  );
}

const getStyles = (size: string) => {
  const sizeConfig = {
    small: { boxSize: 50, fontSize: 28, textSize: 12 },
    medium: { boxSize: 80, fontSize: 40, textSize: 16 },
    large: { boxSize: 120, fontSize: 60, textSize: 22 },
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  return StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    iconBox: {
      width: config.boxSize,
      height: config.boxSize,
      backgroundColor: "#2563eb", // Bright blue background
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
    },
    iconText: {
      color: "#fff", // White "C"
      fontSize: config.fontSize,
      fontWeight: "900",
    },
    appName: {
      marginTop: 8,
      color: "#1e293b", // Slate dark text
      fontSize: config.textSize,
      fontWeight: "700",
    },
  });
};
