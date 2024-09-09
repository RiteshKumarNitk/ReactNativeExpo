import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Clipboard,
} from "react-native";

const colorPalettes = [
  ["#FF5733", "#FFBD33", "#DBFF33", "#75FF33"], // Vibrant greens and oranges
  ["#33FFBD", "#33DBFF", "#3375FF", "#FF33DB"], // Cool blues and teals
  ["#8E44AD", "#2980B9", "#27AE60", "#F1C40F"], // Purple, blue, green, yellow
  ["#2ECC71", "#3498DB", "#9B59B6", "#34495E"], // Green, blue, purple, gray
  ["#E74C3C", "#E67E22", "#F1C40F", "#2ECC71"], // Reds, oranges, yellow, green
  ["#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9"], // Coral, purple, green, pink
  ["#FFABAB", "#FFC3A0", "#F7D6D0", "#CEB4A7"], // Soft pinks and neutrals
  ["#F6E58D", "#F5CD79", "#F4A261", "#2A4D69"], // Soft yellows, oranges, and a dark blue
  ["#FF9F9F", "#FFBF9F", "#FF9F8F", "#FF9F7F"], // Shades of pinks and peach
  ["#1D3557", "#457B9D", "#F1FAEE", "#A8DADC"], // Dark blue, light blue, white, turquoise
  ["#D9BF77", "#DAB5A0", "#E2B9A0", "#E5A07B"], // Warm peach and beige tones
  ["#FFBF00", "#FF8C00", "#FF6347", "#FF4500"], // Bright yellows and oranges
  ["#3A0CA3", "#F72585", "#B9FBC0", "#4CC9F0"], // Bold purples, pinks, and blues
  ["#F3D2C1", "#F7B7A3", "#F4A261", "#E63946"], // Warm tones with a pop of red
  ["#2A9D8F", "#E9C46A", "#F4A261", "#F25F4C"], // Teal, yellow, orange, red
  ["#8E9F56", "#B6D3C1", "#F2E7D5", "#E6B89C"], // Earthy greens and browns
  ["#8C7B75", "#C4B7A6", "#D8B4A6", "#E5A3A0"], // Soft pinks and browns
  ["#6A0572", "#A663CC", "#D6A4A4", "#D9BF77"], // Bold purple, soft pinks, and neutrals
  ["#0A3D62", "#1E90FF", "#4B77BE", "#5D6D7E"], // Cool blues and grays
  ["#FFC3A0", "#FF677D", "#D4A5A5", "#392F5A"], // Soft pinks, warm reds, and deep purple
  ["#C4E0E5", "#B8D8D8", "#A6D4D4", "#8CC5D9"], // Light blues and teal tones
  ["#FFE156", "#F6B93B", "#F0A500", "#F85F73"], // Bright yellows and oranges with a pink accent
  ["#C2C2C2", "#9E9E9E", "#7F7F7F", "#4F4F4F"], // Shades of gray
  ["#FF6B6B", "#FFE66D", "#6B4226", "#D9BF77"], // Bold pink, yellow, and warm neutrals
  ["#FFB6B9", "#FAE3D9", "#BB9E9E", "#F8B400"], // Soft pinks and warm neutrals
  ["#B9EBCF", "#9EBC9B", "#7D8B8C", "#6B8E23"], // Green and neutral tones
  ["#7B4B8D", "#C56D91", "#C4E1C1", "#F2C6C6"], // Purple, pinks, greens, and neutrals
  ["#B0D6F3", "#7F9A65", "#9B6F8C", "#D9C9D4"], // Soft blues, greens, and pinks
  ["#6B4226", "#A57C63", "#D9BF77", "#F8E3A6"], // Earthy tones with warm highlights
  // Add more palettes as needed...
];


export default function ColorPaletteApp() {
  const [selectedPalette, setSelectedPalette] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = (palette) => {
    setSelectedPalette(palette);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const copyToClipboard = (color) => {
    Clipboard.setString(color);
    alert(`${color} copied to clipboard!`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={colorPalettes}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.paletteContainer}
            onPress={() => handlePress(item)}
          >
            {item.map((color, index) => (
              <View
                key={index}
                style={[styles.colorBlock, { backgroundColor: color }]}
              />
            ))}
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selected Palette</Text>
            {selectedPalette.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => copyToClipboard(color)} // Copy color on press
              >
                <View style={[styles.colorBox, { backgroundColor: color }]}>
                  <Text selectable={true} style={styles.colorText}>
                    {color}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Suggestions</Text>
         
          </View> */}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  paletteContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  colorBlock: {
    flex: 1,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  colorBox: {
    width: 250,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  colorText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeText: {
    color: "#3498DB",
    marginTop: 20,
    fontWeight: "bold",
  },
  suggestionsContainer: {
    marginTop: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
