// AddStudent.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface InstalledSoftware {
  name: string;
  installDate: string;
  image?: string; // Add image property
}

export interface Student {
  id: string;
  name: string;
  age: number;
  department: string;
  course: string;
  caddId: string;
  pcModel: string;
  installedSoftware: InstalledSoftware[];
}

interface AddStudentProps {
  onSave: (student: Student) => void;
  studentToEdit?: Student | null;
}

export default function AddStudent({ onSave, studentToEdit }: AddStudentProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    course: "",
    caddId: "",
    pcModel: "",
  });

  const [softwareList, setSoftwareList] = useState<InstalledSoftware[]>([
    { name: "", installDate: "", image: "" },
  ]);

  const departments = [
    "Computer Science",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics",
    "Architecture",
  ];

  // Populate form with student data when editing
  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name,
        age: studentToEdit.age.toString(),
        department: studentToEdit.department,
        course: studentToEdit.course,
        caddId: studentToEdit.caddId,
        pcModel: studentToEdit.pcModel,
      });
      
      if (studentToEdit.installedSoftware && studentToEdit.installedSoftware.length > 0) {
        setSoftwareList(studentToEdit.installedSoftware);
      }
    }
  }, [studentToEdit]);

  const handleAddSoftware = () => {
    setSoftwareList([...softwareList, { name: "", installDate: "", image: "" }]);
  };

  const handleRemoveSoftware = (index: number) => {
    if (softwareList.length > 1) {
      setSoftwareList(softwareList.filter((_, i) => i !== index));
    }
  };

  const handleSoftwareChange = (
    index: number,
    field: "name" | "installDate" | "image",
    value: string
  ) => {
    const updatedList = [...softwareList];
    updatedList[index][field] = value;
    setSoftwareList(updatedList);
  };

  // Mock function for image selection (in a real app, you would use ImagePicker)
  const handleSelectImage = (index: number) => {
    // This is a mock implementation - in a real app you would use:
    // 1. expo-image-picker for mobile
    // 2. HTML input for web
    // For now, we'll simulate with a placeholder
    const mockImageUri = "https://via.placeholder.com/150/0000FF/808080?text=Installation+Image";
    handleSoftwareChange(index, "image", mockImageUri);
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.department ||
      !formData.course ||
      !formData.caddId
    ) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    const validSoftware = softwareList.filter(
      (s) => s.name.trim() !== "" || s.installDate.trim() !== ""
    );

    const newStudent: Student = {
      id: studentToEdit ? studentToEdit.id : Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      department: formData.department,
      course: formData.course,
      caddId: formData.caddId,
      pcModel: formData.pcModel,
      installedSoftware: validSoftware,
    };

    onSave(newStudent);
    
    // Reset form only when adding a new student, not when editing
    if (!studentToEdit) {
      setFormData({
        name: "",
        age: "",
        department: "",
        course: "",
        caddId: "",
        pcModel: "",
      });
      setSoftwareList([{ name: "", installDate: "", image: "" }]);
      Alert.alert("Success", "Student added successfully!");
    } else {
      Alert.alert("Success", "Student updated successfully!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{studentToEdit ? "Edit Student" : "Add New Student"}</Text>
        <Text style={styles.headerSubText}>{studentToEdit ? "Update student details below" : "Enter student details below"}</Text>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.form}>
        {/* Input Fields */}
        {[
          { label: "Full Name *", key: "name", placeholder: "Enter student full name" },
          { label: "Age *", key: "age", placeholder: "Enter age", keyboardType: "numeric" },
          { label: "Department *", key: "department", placeholder: "Enter department" },
          { label: "Course *", key: "course", placeholder: "Enter course name" },
          { label: "CADD Club ID *", key: "caddId", placeholder: "Enter CADD Club ID" },
          { label: "PC Model", key: "pcModel", placeholder: "Enter PC model (optional)" },
        ].map((field) => (
          <View key={field.key} style={styles.inputGroup}>
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                keyboardType={(field as any).keyboardType}
                value={(formData as any)[field.key]}
                onChangeText={(text) =>
                  setFormData({ ...formData, [field.key]: text })
                }
              />
            </View>
          </View>
        ))}

        {/* Installed Software Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Installed Software</Text>
          <Text style={styles.sectionSubtitle}>Add software installed on student's PC</Text>
        </View>
        
        {softwareList.map((software, index) => (
          <View key={index} style={styles.softwareBox}>
            <View style={styles.softwareHeader}>
              <Text style={styles.softwareTitle}>Software #{index + 1}</Text>
              {softwareList.length > 1 && (
                <TouchableOpacity
                  onPress={() => handleRemoveSoftware(index)}
                  style={styles.removeBtn}
                >
                  <Ionicons name="close" size={20} color="#dc2626" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Software Name (e.g. AutoCAD)"
                value={software.name}
                onChangeText={(text) =>
                  handleSoftwareChange(index, "name", text)
                }
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Install Date (YYYY-MM-DD)"
                value={software.installDate}
                onChangeText={(text) =>
                  handleSoftwareChange(index, "installDate", text)
                }
              />
            </View>

            {/* Image Upload Section */}
            <View style={styles.imageUploadContainer}>
              <Text style={styles.imageLabel}>Installation Image (Optional)</Text>
              <TouchableOpacity 
                style={styles.imageUploadButton} 
                onPress={() => handleSelectImage(index)}
              >
                {software.image ? (
                  <Image source={{ uri: software.image }} style={styles.imagePreview} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="image-outline" size={24} color="#94a3b8" />
                    <Text style={styles.imagePlaceholderText}>Tap to add image</Text>
                  </View>
                )}
              </TouchableOpacity>
              
              {software.image ? (
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => handleSoftwareChange(index, "image", "")}
                >
                  <Text style={styles.removeImageText}>Remove Image</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addSoftwareBtn} onPress={handleAddSoftware}>
          <Ionicons name="add" size={20} color="#3b82f6" />
          <Text style={styles.addSoftwareText}>Add More Software</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
          <Text style={styles.saveText}>{studentToEdit ? "Update Student" : "Save Student"}</Text>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
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
  headerSubText: { 
    color: "#e0f2fe", 
    fontSize: 14
  },
  form: { 
    padding: 16, 
    paddingBottom: 100 
  },
  inputGroup: { 
    marginBottom: 16 
  },
  label: { 
    fontSize: 15, 
    fontWeight: "600", 
    color: "#1e293b", 
    marginBottom: 6 
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1e293b",
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#0f172a",
    marginBottom: 4
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  softwareBox: {
    backgroundColor: "#eff6ff",
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#93c5fd",
  },
  softwareHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  softwareTitle: { 
    color: "#1e40af", 
    fontSize: 15, 
    fontWeight: "600" 
  },
  removeBtn: {
    backgroundColor: "#fee2e2",
    borderRadius: 20,
    padding: 4,
  },
  imageUploadContainer: {
    marginTop: 12,
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  imageUploadButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagePlaceholder: {
    alignItems: "center",
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: "#94a3b8",
    fontSize: 14,
  },
  removeImageButton: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  removeImageText: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "600",
  },
  addSoftwareBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#93c5fd",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    justifyContent: "center",
    marginTop: 8,
    backgroundColor: "#fff",
  },
  addSoftwareText: { 
    color: "#3b82f6", 
    fontWeight: "600", 
    marginLeft: 8,
    fontSize: 16
  },
  saveBtn: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
    marginRight: 8,
  },
});