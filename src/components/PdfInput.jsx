/* import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import DocumentPicker from "react-native-document-picker";

const PdfInput = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const selectPdf = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setSelectedPdf(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // El usuario canceló la selección de archivo
      } else {
        // Manejar otros errores
        console.error("Error al seleccionar el archivo PDF:", err);
      }
    }
  };

  return (
    <View>
      <Button title="Seleccionar PDF" onPress={selectPdf} />
      {selectedPdf && (
        <View>
          <Text>PDF seleccionado:</Text>
          <Text>{selectedPdf.name}</Text>
        </View>
      )}
    </View>
  );
};

export default PdfInput;
 */
