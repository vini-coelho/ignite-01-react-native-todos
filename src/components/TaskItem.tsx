import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput
} from 'react-native';

import trashIcon from '../assets/icons/trash/trash.png'
import EditIcon from '../assets/icons/edit/Edit.png'
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';
export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface Props {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({ 
  index, 
  item, 
  toggleTaskDone, 
  removeTask, 
  editTask 
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  function handleStartEditing() {
    if(!item.done) setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditedTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, editedTitle);
    setIsEditing(false);
  }

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={[
              item.done ? styles.taskTextDone : styles.taskText,
              { padding: 0 }
            ]}
            value={editedTitle}
            onChangeText={setEditedTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {
          isEditing ?
            <TouchableOpacity
              style={{ paddingRight: 12 }}
              onPress={handleCancelEditing}
            >
              <Icon name='x' color='#B2B2B2' size={24} />
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={{ paddingRight: 12 }}
              onPress={handleStartEditing}
            >
              <Image source={EditIcon} />
            </TouchableOpacity>
        }

        <View style={styles.divider} />

        <TouchableOpacity
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
          style={{ opacity: isEditing ? 0.3 : 1, paddingLeft: 12 }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
});
