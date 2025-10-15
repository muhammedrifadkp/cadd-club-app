import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentDetails from "../components/StudentDetails";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);

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
          setStudent(foundStudent);
        }
      } catch (error) {
        console.log("Error loading students:", error);
      }
    };
    loadStudents();
  }, [id]);

  const handleBackToList = () => {
    router.push('/students');
  };

  if (!student) {
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
      <StudentDetails student={student} onBack={handleBackToList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});