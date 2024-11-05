import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import Card from "./Card";

const { width } = Dimensions.get("window");
const CARD_SIZE = width / 5 - 10;

const cards = ["👿", "🤙", "🔥", "🍆", "👌", "🏳️‍🌈"];

export default function App() {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
      setScore(score + 1); // Aumentar el puntaje solo cuando hay coincidencia
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    // Ignorar clics en cartas ya emparejadas
    if (selectedCards.length >= 2 || selectedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }
    setSelectedCards([...selectedCards, index]);
  };

  const resetGame = () => {
    setBoard(shuffle([...cards, ...cards]));
    setSelectedCards([]);
    setMatchedCards([]);
    setScore(0);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {didPlayerWin() ? "Congratulations 🎉" : "Memory"}
      </Text>
      <Text style={styles.title}>Score: {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              isTurnedOver={isTurnedOver}
              onPress={() => handleTapCard(index)}
              size={CARD_SIZE}
            >
              {card}
            </Card>
          );
        })}
      </View>
     <TouchableOpacity style={styles.boton} onPress={resetGame}>
             <Text style={styles.botonTexto}>Reiniciar Juego</Text>
     </TouchableOpacity>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "snow",
    marginVertical: 15,
  },
  boton: {
    width: 150,
    padding: 10,
    backgroundColor: '#0391b4',
    borderRadius: 25,
    alignItems: 'center', // Centra horizontalmente
    justifyContent: 'center', // Centra verticalmente
    marginVertical: 15, // Añade un margen vertical si es necesario
  },
  botonTexto: {
    color: 'white', // Cambia el color del texto del botón
    fontSize: 16, // Ajusta el tamaño de la fuente si es necesario
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
