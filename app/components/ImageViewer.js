// components/ImageViewer.js
import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { X } from "lucide-react-native";
import { Image } from "react-native";

const ImageViewer = ({ visible, imageUri, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X color="#fff" size={28} />
        </TouchableOpacity>
        
        <ScrollView
          maximumZoomScale={3}
          minimumZoomScale={1}
          contentContainerStyle={styles.imageContainer}
        >
          {imageUri ? (
            <Image 
              source={{ uri: imageUri }} 
              style={styles.image}
              resizeMode="contain"
            />
          ) : null}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ImageViewer;