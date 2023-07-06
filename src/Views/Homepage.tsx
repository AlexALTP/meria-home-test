import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {projectsListSelector, requestProjects} from '../Reducer/projectsSlice';
import {type ProjectType} from '../Types/ProjectType';
import {ProjectCard} from '../Components/ProjectCard';
import {Button} from '../Components/Button';
import {ProjectModal} from '../Components/Modals/ProjectModal';
import {MODAL_TYPE} from '../utils/enums';

export default function Homepage() {
  const dispatch = useDispatch();
  const projects: ProjectType[] = useSelector(projectsListSelector);
  const [isProjectModalDisplayed, setProjectModalDisplayed] = useState({
    displayed: false,
    type: MODAL_TYPE.CREATION,
    project: null,
  });

  useEffect(() => {
    dispatch(requestProjects());
  }, []);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Text style={{color: 'white'}}>Project management app !</Text>
      </HeaderWrapper>
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          updateAction={() => {
            setProjectModalDisplayed({
              displayed: true,
              type: MODAL_TYPE.UPDATE,
              project,
            });
          }}
        />
      ))}
      {isProjectModalDisplayed.displayed ? <ProjectModal
        type={isProjectModalDisplayed.type}
        isVisible={isProjectModalDisplayed.displayed}
        onClose={() => {
          setProjectModalDisplayed({displayed: false, type: MODAL_TYPE.CREATION, project: null});
        }}
        project={isProjectModalDisplayed?.project}
      /> : null}
      <Button
        label='New project'
        action={() => {
          setProjectModalDisplayed({displayed: true, type: MODAL_TYPE.CREATION, project: null});
        }}
        hasLeftIcon
        LeftIcon={<MaterialIcons name='add' color='#fff' size={22} />}
      />
      <Text>User list</Text>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  display: flex;
  flex: 1;
  padding-top: 13%;
  align-items: center;
`;

const HeaderWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

