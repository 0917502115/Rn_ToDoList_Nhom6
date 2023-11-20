import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	StyleSheet,
} from "react-native";

const App = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [editIndex, setEditIndex] = useState(-1);

	const handleAddTask = () => {
		if (task) {
			if (editIndex !== -1) {
				// Edit existing task
				const updatedTasks = [...tasks];
				updatedTasks[editIndex] = task;
				setTasks(updatedTasks);
				setEditIndex(-1);
			} else {
				// Add new task
				setTasks([...tasks, task]);
			}
			setTask("");
		}
	};

	const handleEditTask = (index) => {
		const taskToEdit = tasks[index];
		setTask(taskToEdit);
		setEditIndex(index);
	};

	const handleDeleteTask = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks.splice(index, 1);
		setTasks(updatedTasks);
	};

	const renderItem = ({ item, index }) => (
		<View style={styles.task}>
			<Text
				style={styles.itemList}>{item}</Text>
			<View
				style={styles.taskButtons}>
				<TouchableOpacity
					onPress={() => handleEditTask(index)}>
					<Text
						style={styles.editButton}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleDeleteTask(index)}>
					<Text
						style={styles.deleteButton}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>👋WELCOME🎉</Text>
			<Text style={styles.title}>ARK Survival🦕</Text>
			<TextInput
				style={styles.input}
				placeholder="Nhập tên người chơi..."
				value={task}
				onChangeText={(text) => setTask(text)}
			/>
			<TouchableOpacity
				style={styles.addButton}
				onPress={handleAddTask}>
				<Text style={styles.addButtonText}>
					{editIndex !== -1 ? "Update Task" : "Bắt đầu"}
				</Text>
			</TouchableOpacity>
			<FlatList
				data={tasks}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
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
	},
	itemList: {
		fontSize: 20,
	},
	taskButtons: {
		flexDirection: "row",
	},
	editButton: {
		marginRight: 10,
		color: "green",
		fontWeight: "bold",
		fontSize: 20,
	},
	deleteButton: {
		color: "red",
		fontWeight: "bold",
		fontSize: 18,
	},
});

export default App;
