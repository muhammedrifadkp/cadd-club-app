import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentsList from "./components/StudentsList";
import BottomNav from "./components/BottomNav";
import { useRouter } from "expo-router";

// Mock initial data
const mockStudents = [
  {
    id: "1",
    name: "Rahul Sharma",
    age: 21,
    department: "Computer Science",
    course: "AutoCAD Advanced",
    caddId: "CADD2024001",
    pcModel: "Dell Optiplex 7090",
    installedSoftware: [
      { name: "AutoCAD 2024", installDate: "2024-01-15", image: "" },
      { name: "SolidWorks 2023", installDate: "2024-02-10", image: "" },
    ],
  },
  {
    id: "2",
    name: "Priya Patel",
    age: 20,
    department: "Mechanical Engineering",
    course: "SolidWorks Fundamentals",
    caddId: "CADD2024002",
    pcModel: "HP EliteDesk 800",
    installedSoftware: [
      { name: "SolidWorks 2023", installDate: "2024-01-20", image: "" },
      { name: "CATIA V5", installDate: "2024-03-05", image: "" },
    ],
  },
];

export default function StudentsScreen() {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("students");
  const router = useRouter();

  // Load students from AsyncStorage on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const savedStudents = await AsyncStorage.getItem("caddClubStudents");
        if (savedStudents) {
          setStudents(JSON.parse(savedStudents));
        } else {
          setStudents(mockStudents);
          await AsyncStorage.setItem("caddClubStudents", JSON.stringify(mockStudents));
        }
      } catch (error) {
        console.log("Error loading students:", error);
      }
    };
    loadStudents();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "add") {
      router.push('/add-student');
    }
  };

  const handleEditStudent = (student) => {
    router.push(`/edit-student/${student.id}`);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const updatedStudents = students.filter(student => student.id !== studentId);
      setStudents(updatedStudents);
      await AsyncStorage.setItem("caddClubStudents", JSON.stringify(updatedStudents));
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StudentsList
        students={students}
        onAddClick={() => handleTabChange("add")}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
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
  },
});