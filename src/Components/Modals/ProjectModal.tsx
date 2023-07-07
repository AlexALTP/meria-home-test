import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components';

import {Usertype} from 'src/Types/UserType';
import {ProjectType} from 'src/Types/ProjectType';
import {ProjectsSlice} from 'src/Reducer/projectsSlice';
import {Button} from 'src/Components/Button';
import {UserCard} from 'src/Components/UserCard';
import {MODAL_TYPE} from 'src/utils/enums';
import {usersListSelector} from 'src/Reducer/userSlice';
import {AppDispatch} from 'src/Reducer/store';

type ProjectModalPropsType = {
  isVisible: boolean;
  onClose: () => void;
  type: MODAL_TYPE;
  project: ProjectType | null;
}

export function ProjectModal({isVisible, onClose, type, project}: ProjectModalPropsType) {
  const [title, onChangeTitle] = useState(((project != null) && type === MODAL_TYPE.UPDATE) ? project.name : '');
  const [description, onChangeDescription] = useState(((project != null) && type === MODAL_TYPE.UPDATE) ? project.description : '');
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector(usersListSelector);
  const [updatedUserList, setUpdatedUserList] = useState(project?.ownersList ?? []);

  const removeAction = (id: number) => {
    const tmp = updatedUserList.filter(item => item.id !== id);
    setUpdatedUserList([...tmp]);
  };

  const addAction = (user: Usertype) => {
    setUpdatedUserList([...updatedUserList, user]);
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
        <ScrollView>
          {updatedUserList.map(user => (
            <UserCard key={user.id} user={user} actionLabel='Delete' action={() => removeAction(user.id)} />
          ))}
          <Separator />
          {users.map(user => !updatedUserList.find(item => item.id === user.id) ? (
            <UserCard
              key={user.id}
              user={user}
              actionLabel='Add'
              action={() => addAction(user)} />
          ) : null)}
          <Button
            label={type === MODAL_TYPE.UPDATE ? 'Update' : 'Create'}
            action={type === MODAL_TYPE.UPDATE ? () => dispatch(ProjectsSlice.actions.updateProject({
              id: project!.id,
              description,
              title,
              ownersList: updatedUserList,
            })) : () => dispatch(ProjectsSlice.actions.createProject({
              description,
              title,
              ownersList: updatedUserList,
            }))}
            isDisable={!title || !description} />
        </ScrollView>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled(View)`
  display: flex;
  width: 80%;
  height: 85%;
  align-self: center;
  margin-top: 20%;
`;

const Separator = styled(View)`
  width: 100%;
  height: 1px;
  background-color: black;
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
