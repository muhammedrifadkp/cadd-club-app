// StudentCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StudentCardProps {
  name: string;
  caddId: string;
  course: string;
  department: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function StudentCard({
  name,
  caddId,
  course,
  department,
  onEdit,
  onDelete,
}: StudentCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color="#2563eb" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.caddId}>ID: {caddId}</Text>

          <View style={styles.tags}>
            <View style={[styles.tag, styles.courseTag]}>
              <Text style={styles.tagText}>{course}</Text>
            </View>
            <View style={[styles.tag, styles.deptTag]}>
              <Text style={styles.tagText}>{department}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          {onEdit && (
            <View style={styles.actionButton}>
              <Ionicons name="pencil" size={18} color="#3b82f6" onPress={onEdit} />
            </View>
          )}
          {onDelete && (
            <View style={styles.actionButton}>
              <Ionicons name="trash" size={18} color="#ef4444" onPress={onDelete} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderColor: "#dbeafe",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: { 
    flex: 1,
    paddingRight: 8
  },
  name: { 
    fontSize: 17, 
    fontWeight: "700", 
    color: "#0f172a",
    marginBottom: 4
  },
  caddId: { 
    fontSize: 14, 
    color: "#3b82f6", 
    fontWeight: "500",
    marginBottom: 6
  },
  tags: { 
    flexDirection: "row", 
    flexWrap: "wrap",
    gap: 6
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginTop: 4,
  },
  courseTag: { 
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#93c5fd"
  },
  deptTag: { 
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1"
  },
  tagText: { 
    fontSize: 12, 
    color: "#1e293b",
    fontWeight: "600"
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
});