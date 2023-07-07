import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {UserModal} from 'src/Components/Modals/UserModal';
import {ProjectModal} from 'src/Components/Modals/ProjectModal';
import {UserCard} from 'src/Components/UserCard';
import {ProjectCard} from 'src/Components/ProjectCard';
import {Button} from 'src/Components/Button';
import {projectsListSelector, ProjectsSlice} from 'src/Reducer/projectsSlice';
import {MODAL_TYPE} from 'src/utils/enums';
import {UserSlice, usersListSelector} from 'src/Reducer/userSlice';
import {ProjectType} from 'src/Types/ProjectType';
import {Usertype} from 'src/Types/UserType';

export default function Homepage() {
  const dispatch = useDispatch();
  const projects = useSelector(projectsListSelector);
  const users = useSelector(usersListSelector);
  const [isProjectModalDisplayed, setProjectModalDisplayed]:
    {displayed: boolean; type: MODAL_TYPE; project: ProjectType | null} = useState({
    displayed: false,
    type: MODAL_TYPE.CREATION,
    project: projects[0] ?? null,
  });
  const [isUserModalDisplayed, setUserModalDisplayed]:
    {displayed: boolean; type: MODAL_TYPE; user: Usertype | null} = useState({
    displayed: false,
    type: MODAL_TYPE.CREATION,
    user: users[0] ?? null,
  });

  useEffect(() => {
    dispatch(ProjectsSlice.actions.requestProjects());
    dispatch(UserSlice.actions.requestUsers());
  }, [dispatch]);

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
      {isProjectModalDisplayed.displayed ? (
        <ProjectModal
          type={isProjectModalDisplayed.type}
          isVisible={isProjectModalDisplayed.displayed}
          onClose={() => {
            setProjectModalDisplayed({displayed: false, type: MODAL_TYPE.CREATION, project: null});
          }}
          project={isProjectModalDisplayed?.project}
        />
      ) : null}
      {isUserModalDisplayed ? (
        <UserModal
          isVisible={isUserModalDisplayed.displayed}
          onClose={() => setUserModalDisplayed({
            displayed: false,
            type: MODAL_TYPE.CREATION,
            user: null,
          })} type={isUserModalDisplayed.type}
          user={isUserModalDisplayed.user} />
      ) : null}
      <Button
        label='New project'
        action={() => {
          setProjectModalDisplayed({displayed: true, type: MODAL_TYPE.CREATION, project: null});
        }}
        hasLeftIcon
        LeftIcon={<MaterialIcons name='add' color='#fff' size={22} />}
      />
      <Text>User list</Text>
      {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            actionLabel='Delete'
            action={() => dispatch(UserSlice.actions.removeUser({id: user.id}))}
            secondAction={() => setUserModalDisplayed({displayed: true, type: MODAL_TYPE.UPDATE, user})}
            secondActionLabel='Update'
          />
        ),
      )}
      <Button
        label='New user'
        action={() => setUserModalDisplayed({displayed: true, type: MODAL_TYPE.CREATION, user: null})}
        hasLeftIcon
        LeftIcon={<MaterialIcons name='add' color='#fff' size={22} />}
      />
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

