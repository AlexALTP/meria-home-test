import React, {useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {MODAL_TYPE} from '../../utils/enums';
import {ProjectType} from '../../Types/ProjectType';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Button} from '../Button';
import {createProject, updateProject} from '../../Reducer/projectsSlice';
import styled from 'styled-components';
import {UserCard} from '../UserCard';

type ProjectModalPropsType = {
  isVisible: boolean;
  onClose: () => void;
  type: MODAL_TYPE;
  project: ProjectType | null;
};

export function ProjectModal({isVisible, onClose, type, project}: ProjectModalPropsType) {
  const [title, onChangeTitle] = useState((project && type === MODAL_TYPE.UPDATE) ? project.name : '');
  const [description, onChangeDescription] = useState((project && type === MODAL_TYPE.UPDATE) ? project.description : '');
  const dispatch = useDispatch();

  return (
    <Modal animationType='slide' transparent={false} visible={isVisible}>
      <Wrapper>
        <HeaderWrapper>
          <Text>{type === MODAL_TYPE.CREATION ? 'Create a new project' : 'Update your project'}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name='close' color='black' size={22} />
          </Pressable>
        </HeaderWrapper>
        <InputWrapper>
          <TextInput placeholder='Project title' onChangeText={onChangeTitle} value={title} />
          <TextInput placeholder='Project description' onChangeText={onChangeDescription} value={description} />
        </InputWrapper>
        {project?.ownersList?.map(user => (
          <UserCard user={user} />
        ))}
        <Button
          label={type === MODAL_TYPE.UPDATE ? 'Update' : 'Create'}
          action={type === MODAL_TYPE.UPDATE ? () => dispatch(updateProject({
            id: project.id,
            description,
            title,
            ownersList: [],
          })) : () => dispatch(createProject({description, title, ownersList: []}))}
          isDisable={!title || !description} />
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled(View)`
  display: flex;
  width: 80%;
  height: 50%;
  align-self: center;
  margin-top: 20%;
`;

const HeaderWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const InputWrapper = styled(View)`
   flex-direction: column;
`;
