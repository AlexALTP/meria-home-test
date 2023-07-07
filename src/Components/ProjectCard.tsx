import React from 'react';
import styled from 'styled-components';
import {Image, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {ProjectType} from 'src/Types/ProjectType';
import {removeProject} from 'src/Reducer/projectsSlice';
import {Button} from 'src/Components/Button';

type ProjectCardPropsType = {
  project: ProjectType;
  updateAction: () => void;
};

export function ProjectCard({project, updateAction}: ProjectCardPropsType) {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <StyledImage source={{uri: project.picture}} />
      <InfoWrapper>
        <Text>{project.name}</Text>
        <Text>{project.description}</Text>
      </InfoWrapper>
      <Button label='Delete' action={() => dispatch(removeProject({id: project.id}))} />
      <Button label='Update' action={updateAction} />
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  display: flex;
  background-color: red;
  padding: 10px;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #ff592b;
`;

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const InfoWrapper = styled(View)`
  flex-direction: column;
  padding-right: 10px;
  padding-left: 10px;
`;
