import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

// Mock initial data
const mockStudents = [
  {
    id: "1",
    name: "Rahul Sharma",
    department: "CADD",
    caddId: "CADD2024001",
    installedSoftware: [
      { name: "AutoCAD 2024", installDate: "2024-01-15", image: "" },
      { name: "SolidWorks 2023", installDate: "2024-02-10", image: "" },
    ],
  },
  {
    id: "2",
    name: "Priya Patel",
    department: "LIVE WIRE",
    caddId: "CADD2024002",
    installedSoftware: [
      { name: "SolidWorks 2023", installDate: "2024-01-20", image: "" },
      { name: "CATIA V5", installDate: "2024-03-05", image: "" },
    ],
  },
];

export default function App() {
  // Load students from AsyncStorage on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const savedStudents = await AsyncStorage.getItem("caddClubStudents");
        if (!savedStudents) {
          await AsyncStorage.setItem("caddClubStudents", JSON.stringify(mockStudents));
        }
      } catch (error) {
        console.log("Error loading students:", error);
      }
    };
    loadStudents();
  }, []);

  // Redirect to students list by default
  return <Redirect href="/students" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
});