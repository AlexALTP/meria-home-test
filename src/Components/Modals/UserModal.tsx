import React, {useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styled from 'styled-components';

import {MODAL_TYPE} from 'src/utils/enums';
import {Button} from 'src/Components/Button';
import {Usertype} from 'src/Types/UserType';
import {UserSlice} from 'src/Reducer/userSlice';

type UserModalPropsType = {
  isVisible: boolean;
  onClose: () => void;
  type: MODAL_TYPE;
  user: Usertype | null;
}

export function UserModal({isVisible, onClose, type, user}: UserModalPropsType) {
  const [firstName, onChangeFirstName] = useState(((user != null) && type === MODAL_TYPE.UPDATE) ? user.firstName : '');
  const [lastName, onChangeLastName] = useState(((user != null) && type === MODAL_TYPE.UPDATE) ? user.lastName : '');
  const dispatch = useDispatch();
  // const [updateProjectList, setUpdateProjectList] = useState(user?.ownersList ?? []);

  /* const removeAction = (id: number) => {
    const tmp = updateProjectList.filter(item => item.id !== id);
    setUpdateProjectList([...tmp]);
  }; */

  return (
    <Modal animationType='slide' transparent={false} visible={isVisible}>
      <Wrapper>
        <HeaderWrapper>
          <Text>{type === MODAL_TYPE.CREATION ? 'Create a new user' : 'Update a user'}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name='close' color='black' size={22} />
          </Pressable>
        </HeaderWrapper>
        <InputWrapper>
          <StyledTextInput placeholder='User First Name' onChangeText={onChangeFirstName} value={firstName} />
          <StyledTextInput placeholder='User Last Name' onChangeText={onChangeLastName} value={lastName} />
        </InputWrapper>
        {/* {updatedUserList.map(user => (
          <UserCard key={user.id} user={user} action={() => removeAction(user.id)} />
        ))} */}
        <Button
          label={type === MODAL_TYPE.UPDATE ? 'Update' : 'Create'}
          action={type === MODAL_TYPE.UPDATE ? () => dispatch(UserSlice.actions.updateUser({
            id: user!.id,
            firstName,
            lastName,
          })) : () => dispatch(UserSlice.actions.createUser({firstName, lastName}))}
          isDisable={!firstName || !lastName} />
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
