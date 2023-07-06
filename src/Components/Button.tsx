import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';

type ButtonPropsType = {
  label: string;
  isDisable?: boolean;
  action: () => void;
  hasLeftIcon?: boolean;
  LeftIcon?: React.ReactNode;
}

export function Button({label, action, isDisable = false, hasLeftIcon = false, LeftIcon}: ButtonPropsType) {
  return (
    <StyledButton onPress={action} disabled={isDisable}>
      {hasLeftIcon && LeftIcon}
      <StyledLabel>{label}</StyledLabel>
    </StyledButton>
  );
}

const StyledButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  elevation: 3;
  background-color: black;
  padding: 8px;
`;

const StyledLabel = styled(Text)`
  color: white;
`;
