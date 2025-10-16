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
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export interface InstalledSoftware {
  name: string;
  installDate: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  department: string;
  course: string;
  caddId: string;
  pcModel: string;
  imageUrl?: string; // Add student image property
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
    imageUrl: "",
  });

  const [softwareList, setSoftwareList] = useState<InstalledSoftware[]>([
    { name: "", installDate: "" },
  ]);

  // State for date picker visibility
  const [showDatePicker, setShowDatePicker] = useState<{[key: number]: boolean}>({});
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  
  // State for department dropdown
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);

  // Updated departments list with the 4 specific departments
  const departments = [
    "CADD",
    "LIVE WIRE",
    "DREAM ZONE",
    "SYNERGY",
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
        imageUrl: studentToEdit.imageUrl || "",
      });
      
      if (studentToEdit.installedSoftware && studentToEdit.installedSoftware.length > 0) {
        setSoftwareList(studentToEdit.installedSoftware);
      }
    }
  }, [studentToEdit]);

  const handleAddSoftware = () => {
    setSoftwareList([...softwareList, { name: "", installDate: "" }]);
  };

  const handleRemoveSoftware = (index: number) => {
    if (softwareList.length > 1) {
      setSoftwareList(softwareList.filter((_, i) => i !== index));
    }
  };

  const handleSoftwareChange = (
    index: number,
    field: "name" | "installDate",
    value: string
  ) => {
    const updatedList = [...softwareList];
    updatedList[index][field] = value;
    setSoftwareList(updatedList);
  };

  // Function to format date as MM/DD/YYYY
  const formatDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Function to handle date change for software installation
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDateIndex === null) return;
    
    if (selectedDate) {
      handleSoftwareChange(selectedDateIndex, "installDate", formatDate(selectedDate));
    }
    
    // Hide the date picker
    setShowDatePicker(prev => ({ ...prev, [selectedDateIndex]: false }));
    setSelectedDateIndex(null);
  };

  // Function to show date picker for software installation
  const openDatePicker = (index: number) => {
    setSelectedDateIndex(index);
    setShowDatePicker(prev => ({ ...prev, [index]: true }));
  };

  // Function for student image selection using device gallery
  const handleSelectStudentImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Permission to access camera roll is required!");
      return;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setFormData({ ...formData, imageUrl: selectedImage.uri });
    }
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.department ||
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
        imageUrl: "",
      });
      setSoftwareList([{ name: "", installDate: "" }]);
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter student full name"
              value={formData.name}
              onChangeText={(text) =>
                setFormData({ ...formData, name: text })
              }
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age (Optional)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter age (optional)"
              keyboardType="numeric"
              value={formData.age}
              onChangeText={(text) =>
                setFormData({ ...formData, age: text })
              }
            />
          </View>
        </View>

        {/* Department Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Department *</Text>
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowDepartmentDropdown(true)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={[styles.input, !formData.department && styles.placeholderText]}>
                {formData.department || "Select department"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Course (Optional)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter course name (optional)"
              value={formData.course}
              onChangeText={(text) =>
                setFormData({ ...formData, course: text })
              }
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CADD Club ID *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter CADD Club ID"
              value={formData.caddId}
              onChangeText={(text) =>
                setFormData({ ...formData, caddId: text })
              }
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PC Model</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter PC model (optional)"
              value={formData.pcModel}
              onChangeText={(text) =>
                setFormData({ ...formData, pcModel: text })
              }
            />
          </View>
        </View>

        {/* Student Image Upload Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Student Image (Optional)</Text>
          <TouchableOpacity 
            style={styles.imageUploadButton} 
            onPress={handleSelectStudentImage}
          >
            {formData.imageUrl ? (
              <Image source={{ uri: formData.imageUrl }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={24} color="#94a3b8" />
                <Text style={styles.imagePlaceholderText}>Tap to add student image</Text>
              </View>
            )}
          </TouchableOpacity>
          
          {formData.imageUrl ? (
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={() => setFormData({ ...formData, imageUrl: "" })}
            >
              <Text style={styles.removeImageText}>Remove Image</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Department Dropdown Modal */}
        <Modal
          visible={showDepartmentDropdown}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDepartmentDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            onPress={() => setShowDepartmentDropdown(false)}
            activeOpacity={1}
          >
            <View style={styles.dropdownModal}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Select Department</Text>
                <TouchableOpacity onPress={() => setShowDepartmentDropdown(false)}>
                  <Ionicons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              {departments.map((dept, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFormData({ ...formData, department: dept });
                    setShowDepartmentDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{dept}</Text>
                  {formData.department === dept && (
                    <Ionicons name="checkmark" size={20} color="#3b82f6" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

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
            
            {/* Date Input with Calendar Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Install Date</Text>
              <TouchableOpacity 
                style={styles.dateInputContainer}
                onPress={() => openDatePicker(index)}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Select install date"
                  value={software.installDate}
                  editable={false}
                />
                <Ionicons name="calendar" size={20} color="#6b7280" style={styles.calendarIcon} />
              </TouchableOpacity>
              
              {/* Date picker - only show for the selected index */}
              {showDatePicker[index] && (
                <DateTimePicker
                  value={software.installDate ? new Date(software.installDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            // Image field removed as per requirements
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
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  placeholderText: {
    color: "#94a3b8",
  },
  dateInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 14,
  },
  calendarIcon: {
    marginLeft: 10,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1e293b",
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownModal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "80%",
    maxHeight: "50%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  dropdownItemText: {
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