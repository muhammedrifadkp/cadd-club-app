// components/StudentDetails.js
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ArrowLeft, User, Calendar, Laptop, Monitor } from "lucide-react-native";
import ImageViewer from "./ImageViewer";

const StudentDetails = ({ student, onBack, onEdit, onDelete }) => {
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageViewer = (imageUri) => {
    setSelectedImage(imageUri);
    setImageViewerVisible(true);
  };

  const closeImageViewer = () => {
    setImageViewerVisible(false);
    setSelectedImage(null);
  };

  // Function to format date properly
  const formatInstallDate = (dateString) => {
    if (!dateString) return "";

    try {
      // Handle different date formats
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If standard parsing fails, try to parse YYYY-MM-DD format
        const parts = dateString.split('-');
        if (parts.length === 3) {
          const year = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
          const day = parseInt(parts[2], 10);
          const parsedDate = new Date(year, month, day);
          if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          }
        }
        return dateString; // Return original string if parsing fails
      }

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString; // Return original string if any error occurs
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.profileContainer}>
            <View style={styles.avatar}>
              <User color="#fff" size={40} />
            </View>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.id}>ID: {student.caddId}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeBlue}>{student.department}</Text>
            </View>
          </View>
        </View>
        {/* (buttons moved below image section) */}

        {/* Installed Software */}
        <View style={styles.card}>
          <View style={styles.softwareHeader}>
            <Laptop color="#2563eb" size={20} />
            <Text style={styles.softwareTitle}>Installed Software</Text>
          </View>

          {!student.installedSoftware ||
            !Array.isArray(student.installedSoftware) ||
            student.installedSoftware.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Monitor color="#94a3b8" size={32} />
              <Text style={styles.emptyText}>No software installed</Text>
            </View>
          ) : (
            student.installedSoftware.map((software, index) => (
              <View key={index} style={styles.softwareCard}>
                <View style={styles.softwareTop}>
                  <Text style={styles.softwareName}>{software.name}</Text>
                  <Text style={styles.softwareBadge}>#{index + 1}</Text>
                </View>
                {software.installDate && (
                  <View style={styles.softwareDate}>
                    <Calendar color="#6b7280" size={16} />
                    <Text style={styles.softwareDateText}>
                      Installed: {formatInstallDate(software.installDate)}
                    </Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* Student Image Section - Always visible */}
        <View style={styles.card}>
          <View style={styles.imageSectionHeader}>
            <Text style={styles.imageSectionTitle}>Student Image</Text>
          </View>

          {/* Display image if available, otherwise show empty bordered box */}
          {student.imageUrl && student.imageUrl.trim() !== "" ? (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => openImageViewer(student.imageUrl)}
            >
              <Image
                source={{ uri: student.imageUrl }}
                style={styles.studentImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyImageContainer}>
              <Text style={styles.emptyImageText}>No image available</Text>
            </View>
          )}
        </View>
        {/* Action buttons: Edit / Delete (placed after image) */}
        <View style={styles.actionRow}>
          {onEdit && (
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Image Viewer Modal */}
      <ImageViewer
        visible={imageViewerVisible}
        imageUri={selectedImage}
        onClose={closeImageViewer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  header: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 6,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  scroll: {
    padding: 16,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  profileContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#dbeafe",
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  id: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  badgeBlue: {
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "#93c5fd",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  softwareHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  softwareTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 12,
  },
  softwareCard: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#93c5fd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  softwareTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  softwareName: {
    color: "#1e40af",
    fontWeight: "700",
    fontSize: 16,
  },
  softwareBadge: {
    backgroundColor: "#fff",
    color: "#2563eb",
    borderWidth: 1,
    borderColor: "#93c5fd",
    borderRadius: 20,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontWeight: "600",
  },
  softwareDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  softwareDateText: {
    color: "#475569",
    fontSize: 14,
  },
  imageSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  imageSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  imageContainer: {
    alignItems: "center",
  },
  studentImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  emptyImageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  emptyImageText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 8,
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    shadowColor: "#3b82f6",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: "#ef4444",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default StudentDetails;