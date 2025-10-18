// StudentsList.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StudentCard from "./StudentCard";
import Logo from "./Logo";

export interface InstalledSoftware {
  name: string;
  installDate: string;
  image?: string; // Add image property
}

export interface Student {
  id: string;
  name: string;
  department: string;
  caddId: string;
  installedSoftware: InstalledSoftware[];
}

interface StudentsListProps {
  students?: Student[];
  onAddClick?: () => void;
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (studentId: string) => void;
}

export default function StudentsList({
  students = [],
  onAddClick,
  onEditStudent,
  onDeleteStudent,
}: StudentsListProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const q = search.trim().toLowerCase();

  const filteredStudents = (students || []).filter((s) => {
    if (!q) return false;
    const nameMatch = s.name.toLowerCase().includes(q);
    const idMatch = s.caddId.toLowerCase().includes(q); // match anywhere in ID
    const deptMatch = s.department.toLowerCase().includes(q);
    const softwareMatch = s.installedSoftware.some((software) =>
      software.name.toLowerCase().includes(q)
    );
    return nameMatch || idMatch || deptMatch || softwareMatch;
  });

  // Show students only when there's a search term
  // This ensures no students are displayed initially and results remain visible during interactions
  const shouldShowStudents = search.length > 0;

  const handleStudentClick = (studentId: string) => {
    router.push(`/student/${studentId}`);
  };

  const handleEditStudent = (student: Student) => {
    if (onEditStudent) {
      onEditStudent(student);
    }
  };

  const handleDeleteStudent = (student: Student) => {
    if (onDeleteStudent) {
      Alert.alert(
        "Delete Student",
        `Are you sure you want to delete ${student.name}? This action cannot be undone.`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => onDeleteStudent(student.id)
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Logo />
        <View style={styles.headerSubContainer}>
          <Text style={styles.headerSubText}>{students.length} students enrolled</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
          placeholder="Search by name, ID, department or software"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Student List */}
      {shouldShowStudents ? (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => handleStudentClick(item.id)}>
                <StudentCard
                  name={item.name}
                  caddId={item.caddId}
                  department={item.department}
                  onEdit={() => handleEditStudent(item)}
                  onDelete={() => handleDeleteStudent(item)}
                />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color="#94a3b8" />
              <Text style={styles.emptyText}>No students found</Text>
              <Text style={styles.emptySubText}>Try adjusting your search or add a new student</Text>
            </View>
          }
        />
      ) : (
        // Show empty state when not searching
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={48} color="#94a3b8" />
          <Text style={styles.emptyText}>Search for students</Text>
          <Text style={styles.emptySubText}>Enter a name or ID in the search box above to find students</Text>
        </View>
      )}

      {/* Add Button */}
      {/* {onAddClick && (
        <TouchableOpacity style={styles.addBtn} onPress={onAddClick}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9"
  },
  header: {
    backgroundColor: "#2563eb",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 40,
    paddingBottom: 25,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4
  },
  headerSubContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  headerSubText: {
    color: "#e0f2fe",
    fontSize: 14,
    fontWeight: "500"
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -25,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
  },
  clearButton: {
    padding: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptySubText: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 6,
    maxWidth: 250,
  },
  addBtn: {
    position: "absolute",
    bottom: 100,
    right: 25,
    backgroundColor: "#3b82f6",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});