import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddStudent from "../components/AddStudent.tsx";
import BottomNav from "../components/BottomNav.js";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function EditStudentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [activeTab, setActiveTab] = useState("students");

  // Load students from AsyncStorage on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const savedStudents = await AsyncStorage.getItem("caddClubStudents");
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          setStudents(parsedStudents);
          
          // Find the student with the matching ID
          const foundStudent = parsedStudents.find(s => s.id === id);
          setStudentToEdit(foundStudent);
        }
      } catch (error) {
        console.log("Error loading students:", error);
      }
    };
    loadStudents();
  }, [id]);

  // Update student in AsyncStorage
  const handleUpdateStudent = async (updatedStudent) => {
    try {
      const updatedStudents = students.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      );
      setStudents(updatedStudents);
      await AsyncStorage.setItem("caddClubStudents", JSON.stringify(updatedStudents));
      // Navigate back to students list after saving
      router.push('/students');
    } catch (error) {
      console.log("Error updating student:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "students") {
      router.push('/students');
    }
  };

  if (!studentToEdit) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          {/* You can add a loading indicator here */}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <AddStudent 
        onSave={handleUpdateStudent} 
        studentToEdit={studentToEdit} 
      />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingBottom: 80, // Space for bottom navigation
    minHeight: "100vh",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});