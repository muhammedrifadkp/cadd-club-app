import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export default function Logo({ size = "medium" }: LogoProps) {
  const styles = getStyles(size);
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.redC}>C</Text>
        <Text style={styles.restText}>ADD</Text>
      </View>
      <Text style={styles.clubText}>Club</Text>
    </View>
  );
}

const getStyles = (size: string) => {
  const sizeConfig = {
    small: { fontSize: 16, padding: 4 },
    medium: { fontSize: 22, padding: 6 },
    large: { fontSize: 32, padding: 8 }
  };
  
  const config = sizeConfig[size] || sizeConfig.medium;
  
  return StyleSheet.create({
    container: {
      alignItems: "center",
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: config.padding,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    redC: {
      color: "#dc2626", // Red color for the C
      fontSize: config.fontSize,
      fontWeight: "800",
      backgroundColor: "#dbeafe", // Light blue background
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
    },
    restText: {
      color: "#1e293b", // Dark gray for "ADD"
      fontSize: config.fontSize,
      fontWeight: "700",
      marginLeft: 2,
    },
    clubText: {
      color: "#64748b", // Medium gray for "Club"
      fontSize: config.fontSize * 0.6,
      fontWeight: "600",
      marginTop: 2,
    },
  });
};