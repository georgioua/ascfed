import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import SignUp from '../regitration/SingUp';
import RegistrationSteps from '../regitration/RegistrationSteps';

const HomePage = () => {
  const token = window.localStorage.getItem('jwt');
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/ASCF_logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
          <Header as='h2' inverted content={`Welcome to Australian Sports Capoeira Federation`} />
          <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
            Login
          </Button>
          <Button as={Link} to='/registration/1'  size='huge' inverted>
            Register
          </Button>
          <Button onClick={() => openModal(<SignUp />)} size='huge' inverted>
            Sing Up
          </Button>
        </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
