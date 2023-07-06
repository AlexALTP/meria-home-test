import React, {useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components';

import {ProjectType} from '@app/Types/ProjectType';


import {Button} from '../Button';
import {createProject, updateProject} from '../../Reducer/projectsSlice';
import {UserCard} from '../UserCard';
import {MODAL_TYPE} from '../../utils/enums';

type ProjectModalPropsType = {
  isVisible: boolean;
  onClose: () => void;
  type: MODAL_TYPE;
  project: ProjectType | null;
}

export function ProjectModal({isVisible, onClose, type, project}: ProjectModalPropsType) {
  const [title, onChangeTitle] = useState(((project != null) && type === MODAL_TYPE.UPDATE) ? project.name : '');
  const [description, onChangeDescription] = useState(((project != null) && type === MODAL_TYPE.UPDATE) ? project.description : '');
  const dispatch = useDispatch();
  const [updatedUserList, setUpdatedUserList] = useState(project?.ownersList ?? []);

  const removeAction = (id: number) => {
    const tmp = updatedUserList.filter(item => item.id !== id);
    setUpdatedUserList([...tmp]);
  };

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
          <StyledTextInput placeholder='Project title' onChangeText={onChangeTitle} value={title} />
          <StyledTextInput placeholder='Project description' onChangeText={onChangeDescription} value={description} />
        </InputWrapper>
        {updatedUserList.map(user => (
          <UserCard key={user.id} user={user} action={() => removeAction(user.id)} />
        ))}
        <Button
          label={type === MODAL_TYPE.UPDATE ? 'Update' : 'Create'}
          action={type === MODAL_TYPE.UPDATE ? () => dispatch(updateProject({
            id: project!.id,
            description,
            title,
            ownersList: updatedUserList,
          })) : () => dispatch(createProject({description, title, ownersList: updatedUserList}))}
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

const StyledTextInput = styled(TextInput)`
   height: 40px;
   margin: 12px;
   border: 1px solid black;
   padding: 10px;
`;
