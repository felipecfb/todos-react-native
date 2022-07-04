import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import trashIcon from "../assets/icons/trash/trash.png";
import closeIcon from "../assets/icons/close.png";
import editIcon from "../assets/icons/edit.png";
import Icon from "react-native-vector-icons/Feather";
import { Task } from "./TasksList";
import { EditTaskProps } from "../pages/Home";

interface TaskItemListProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskProps) => void;
}

export function TaskItem({
  task,
  editTask,
  toggleTaskDone,
  removeTask,
}: TaskItemListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  console.log(taskTitle);
  

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTaskTitle(task.title);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskTitle });
    setIsEditing(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View style={[styles.taskMarker, task.done && styles.taskMarkerDone]}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={[styles.taskText, task.done && styles.taskTextDone]}
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
            onBlur={handleSubmitEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            editable={isEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleCancelEditing()}
          >
            <Image source={closeIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleStartEditing()}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: "rgba(196, 196, 196, 0.24)",
          }}
        ></View>
        <TouchableOpacity
          style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
          disabled={isEditing ? true : false}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
