// components/StudentDetails.js
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ArrowLeft, User, Calendar, Laptop, Monitor, Image as ImageIcon } from "lucide-react-native";

const StudentDetails = ({ student, onBack }) => {
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
              <Text style={styles.badgeBlue}>{student.course}</Text>
            </View>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{student.age} years</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.badgeGray}>{student.department}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>PC Model</Text>
            <Text style={styles.value}>
              {student.pcModel || "Not specified"}
            </Text>
          </View>
        </View>

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
                      Installed:{" "}
                      {new Date(software.installDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                  </View>
                )}
                
                {/* Display image if available */}
                {software.image ? (
                  <View style={styles.imageContainer}>
                    <Text style={styles.imageLabel}>Installation Screenshot:</Text>
                    <Image 
                      source={{ uri: software.image }} 
                      style={styles.softwareImage}
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <View style={styles.noImageContainer}>
                    <ImageIcon color="#94a3b8" size={16} />
                    <Text style={styles.noImageText}>No installation image provided</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentDetails;

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
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  label: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "600",
  },
  badgeGray: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "600",
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
  imageContainer: {
    marginTop: 10,
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 6,
  },
  softwareImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  noImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
  },
  noImageText: {
    color: "#94a3b8",
    fontSize: 13,
    marginLeft: 6,
  },
});