// components/BottomNav.js

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Users, Plus } from "lucide-react-native";

const BottomNav = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {/* Students Button */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "students" && styles.activeTab]}
        onPress={() => onTabChange("students")}
        activeOpacity={0.7}
      >
        <Users
          color={activeTab === "students" ? "#3b82f6" : "#94a3b8"}
          size={35}
          strokeWidth={activeTab === "students" ? 2.5 : 2}
        />
        <Text
          style={[
            styles.label,
            activeTab === "students" && styles.activeLabel,
          ]}
        >
          Students
        </Text>
        {activeTab === "students" && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      {/* Add Student Button */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "add" && styles.activeTab]}
        onPress={() => onTabChange("add")}
        activeOpacity={0.7}
      >
        <View style={activeTab === "add" ? styles.addButtonActive : styles.addButton}>
          <Plus
            color={activeTab === "add" ? "#fff" : "#3b82f6"}
            size={24}
            strokeWidth={activeTab === "add" ? 3 : 2.5}
          />
        </View>
        <Text
          style={[
            styles.label,
            activeTab === "add" && styles.activeLabel,
          ]}
        >
          Add Student
        </Text>
        {activeTab === "add" && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingVertical: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -4 },
    paddingBottom: 20,
    zIndex: 100,
    height:160
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeTab: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 6,
    fontWeight: "500",
  },
  activeLabel: {
    color: "#3b82f6",
    fontWeight: "700",
  },
  activeIndicator: {
    width: 4,
    height: 4,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
    marginTop: 6,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  addButtonActive: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#dbeafe",
    elevation: 3,
    shadowColor: "#3b82f6",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});