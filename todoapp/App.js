import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
  StyleSheet,
} from "react-native";

const TaskItem = ({ item, index, onToggleComplete, onDelete }) => {
  return (
    <View style={styles.task}>
      <Switch
        style={styles.switch}
        value={item.completed}
        onValueChange={() => onToggleComplete(index)}
      />
      <Text style={[styles.itemList, item.completed && styles.completedTask]}>
        {item.text} ➞  {item.category}
      </Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => onDelete(index)}>
          <Text style={styles.deleteButton}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState(""); // Thêm state cho phân loại
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchText, setSearchText] = useState("");
  const [switchStates, setSwitchStates] = useState({});

  const handleAddTask = () => {
    if (task && category) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { ...tasks[editIndex], text: task, category: category };
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([
          ...tasks,
          { id: Date.now().toString(), text: task, category: category, completed: false },
        ]);
      }
      setTask("");
      setCategory("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    const updatedSwitchStates = { ...switchStates };
    delete updatedSwitchStates[index];
    setSwitchStates(updatedSwitchStates);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...tasks[index],
      completed: !tasks[index].completed,
    };
    setTasks(updatedTasks);
    setSwitchStates({ ...switchStates, [index]: !tasks[index].completed });
  };

  const renderItem = ({ item, index }) => (
    <TaskItem
      item={item}
      index={index}
      onToggleComplete={handleToggleComplete}
      onDelete={handleDeleteTask}
    />
  );

  const filteredTasks = tasks.filter(
    (item) =>
      item.text.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.completed && item.text.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👋WELCOME🎉</Text>
      <Text style={styles.title}>🍔Work App🦕</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung công việc . . ."
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập phân loại . . ."
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update Task" : "Thêm"}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 công việc & phân loại..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <View style={styles.resultContainer}>
        {filteredTasks.length > 0 && (
          <FlatList
            data={filteredTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    padding: 30,
    marginTop: 45,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 7,
    color: "blue",
    textAlign: "center",
  },
  input: {
    borderWidth: 3,
    borderColor: "red",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
  },
  itemList: {
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  taskButtons: {
    flexDirection: "row",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  switch: {
    marginRight: 10,
  },
  completedTask: {
    textDecorationLine: "underline",
    color: "red",
  },
  searchInput: {
    borderWidth: 3,
    borderColor: "green",
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  resultContainer: {
    width: 300,
    marginTop: 5,
    borderStyle: "solid",
    borderColor: "blue",
    borderWidth: 0,
    backgroundColor:'lightpink',
  },
});

export default App;
