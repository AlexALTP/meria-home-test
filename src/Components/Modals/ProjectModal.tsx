import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components';

import {ProjectType} from '@app/Types/ProjectType';


import {Button} from '../Button';
import {createProject, updateProject} from '../../Reducer/projectsSlice';
import {UserCard} from '../UserCard';
import {MODAL_TYPE} from '../../utils/enums';
import {usersListSelector} from './../../Reducer/userSlice';
import {Usertype} from '@app/Types/UserType';

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
          {users.map(user => !updatedUserList.find(item => item.id === user.id) ?
            <UserCard
              key={user.id}
              user={user}
              actionLabel='Add'
              action={() => addAction(user)} /> : null)}
          <Button
            label={type === MODAL_TYPE.UPDATE ? 'Update' : 'Create'}
            action={type === MODAL_TYPE.UPDATE ? () => dispatch(updateProject({
              id: project!.id,
              description,
              title,
              ownersList: updatedUserList,
            })) : () => dispatch(createProject({description, title, ownersList: updatedUserList}))}
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
