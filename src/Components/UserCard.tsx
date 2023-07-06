import React from 'react';
import {Usertype} from '../Types/UserType';
import styled from 'styled-components';
import {Image, Text, View} from 'react-native';

type UserCardPropsType = {
  user: Usertype;
};

export function UserCard({user}: UserCardPropsType) {
  console.log(user);
  return (
    <Wrapper>
      <PictureWrapper>
        <StyledImage source={{uri: user.picture}} />
      </PictureWrapper>
      <InfoWrapper>
        <Text>{user.firstName}</Text>
        <Text>{user.lastName}</Text>
      </InfoWrapper>
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
  width: 70%;
  align-items: center;
  justify-content: center;
`;
