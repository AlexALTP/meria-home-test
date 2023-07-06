import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {UserModal} from '../Components/Modals/UserModal';
import {UserCard} from '../Components/UserCard';
import {projectsListSelector, requestProjects} from '../Reducer/projectsSlice';
import {ProjectCard} from '../Components/ProjectCard';
import {Button} from '../Components/Button';
import {ProjectModal} from '../Components/Modals/ProjectModal';
import {MODAL_TYPE} from '../utils/enums';
import {removeUser, requestUsers, usersListSelector} from '../Reducer/userSlice';

export default function Homepage() {
  const dispatch = useDispatch();
  const projects = useSelector(projectsListSelector);
  const users = useSelector(usersListSelector);
  const [isProjectModalDisplayed, setProjectModalDisplayed] = useState({
    displayed: false,
    type: MODAL_TYPE.CREATION,
    project: projects[0] ?? null,
  });
  const [isUserModalDisplayed, setUserModalDisplayed] = useState({
    displayed: false,
    type: MODAL_TYPE.CREATION,
    user: users[0] ?? null,
  });

  useEffect(() => {
    dispatch(requestProjects());
    dispatch(requestUsers());
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
      {isProjectModalDisplayed.displayed ?
        <ProjectModal
          type={isProjectModalDisplayed.type}
          isVisible={isProjectModalDisplayed.displayed}
          onClose={() => {
            setProjectModalDisplayed({displayed: false, type: MODAL_TYPE.CREATION, project: null});
          }}
          project={isProjectModalDisplayed?.project}
        /> : null}
      {isUserModalDisplayed ?
        <UserModal
          isVisible={isUserModalDisplayed.displayed}
          onClose={() => setUserModalDisplayed({
            displayed: false,
            type: MODAL_TYPE.CREATION,
            user: null,
          })} type={isUserModalDisplayed.type}
          user={isUserModalDisplayed.user} /> : null}
      <Button
        label='New project'
        action={() => {
          setProjectModalDisplayed({displayed: true, type: MODAL_TYPE.CREATION, project: null});
        }}
        hasLeftIcon
        LeftIcon={<MaterialIcons name='add' color='#fff' size={22} />}
      />
      <Text>User list</Text>
      {users.map(user =>
        <UserCard
          key={user.id}
          user={user}
          actionLabel='Delete'
          action={() => dispatch(removeUser({id: user.id}))}
          secondAction={() => setUserModalDisplayed({displayed: true, type: MODAL_TYPE.UPDATE, user})}
          secondActionLabel='Update'
        />,
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

