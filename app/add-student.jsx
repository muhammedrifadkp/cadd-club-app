import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddStudent from "./components/AddStudent";
import BottomNav from "./components/BottomNav";
import { useRouter } from "expo-router";

export default function AddStudentScreen() {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("add");
  const router = useRouter();

  // Load students from AsyncStorage on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const savedStudents = await AsyncStorage.getItem("caddClubStudents");
        if (savedStudents) {
          setStudents(JSON.parse(savedStudents));
        }
      } catch (error) {
        console.log("Error loading students:", error);
      }
    };
    loadStudents();
  }, []);

  // Save student to AsyncStorage
  const handleSaveStudent = async (newStudent) => {
    try {
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      await AsyncStorage.setItem("caddClubStudents", JSON.stringify(updatedStudents));
      // Navigate back to students list after saving
      router.push('/students');
    } catch (error) {
      console.log("Error saving student:", error);
    }
  };

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "students") {
      router.push('/students');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <AddStudent onSave={handleSaveStudent} />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingBottom: 100, // Space for bottom navigation
  },
});