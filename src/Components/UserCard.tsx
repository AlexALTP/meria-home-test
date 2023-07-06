import React from 'react';
import {Usertype} from '../Types/UserType';
import styled from 'styled-components';
import {Image, Text, View} from 'react-native';
import {Button} from './Button';

type UserCardPropsType = {
  user: Usertype;
  action: () => void;
  actionLabel: string;
  secondAction?: () => void;
  secondActionLabel?: string;
};

export function UserCard({user, action, secondAction, actionLabel, secondActionLabel}: UserCardPropsType) {
  return (
    <Wrapper>
      <PictureWrapper>
        <StyledImage source={{uri: user.picture}} />
      </PictureWrapper>
      <InfoWrapper>
        <Text>{user.firstName}</Text>
        <Text>{user.lastName}</Text>
      </InfoWrapper>
      <ButtonWrapper>
        <Button label={actionLabel} action={action} />
        {secondAction && <Button label={secondActionLabel ?? ''} action={secondAction} />}
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  display: flex;
  height: 100px;
  margin: 20px;
  flex-direction: row;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: white;
`;

const PictureWrapper = styled(View)`
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

const InfoWrapper = styled(View)`
  width: 40%;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled(View)`
  width: 30%;
  align-items: center;
  justify-content: center;
`;
