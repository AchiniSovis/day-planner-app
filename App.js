import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TextInput, Button, Card, Title, Provider as PaperProvider } from "react-native-paper";
import styles from "./styles";

const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9 AM - 5 PM

export default function App() {
  const [tasks, setTasks] = useState({});

  // Load saved tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const saved = await AsyncStorage.getItem("dayTasks");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (typeof parsed === "object" && parsed !== null) setTasks(parsed);
        }
      } catch (e) {
        console.log("Error loading tasks:", e);
        Alert.alert("Error", "Failed to load saved tasks.");
      }
    };
    loadTasks();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("dayTasks", JSON.stringify(tasks));
      } catch (e) {
        console.log("Error saving tasks:", e);
        Alert.alert("Error", "Failed to save tasks.");
      }
    };
    saveTasks();
  }, [tasks]);

  const handleChange = (hour, text) => {
    setTasks((prev) => ({ ...prev, [hour]: text }));
  };

  const handleClearAll = () => {
    Alert.alert("Confirm", "Are you sure you want to clear all tasks?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setTasks({}) },
    ]);
  };

  const renderItem = ({ item: hour }) => {
    const currentHour = new Date().getHours();
    let bgColor = "#e0f7fa"; // future
    if (hour < currentHour) bgColor = "#eeeeee"; // past
    else if (hour === currentHour) bgColor = "#ffebee"; // present

    return (
      <Card style={[styles.card, { backgroundColor: bgColor }]}>
        <Card.Content style={styles.cardContent}>
          <Title style={styles.hourText}>
            {hour <= 12 ? hour + " AM" : hour - 12 + " PM"}
          </Title>
          <TextInput
            mode="outlined"
            placeholder="Enter task..."
            value={tasks[hour] || ""}
            onChangeText={(text) => handleChange(hour, text)}
            style={styles.input}
          />
        </Card.Content>
      </Card>
    );
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title} variant="headlineLarge">
          Day Planner
        </Text>
        <FlatList
          data={hours}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
        />
        <Button
          mode="contained"
          onPress={handleClearAll}
          buttonColor="#ff5252"
          style={styles.clearButton}
        >
          Clear All
        </Button>
      </View>
    </PaperProvider>
  );
}

