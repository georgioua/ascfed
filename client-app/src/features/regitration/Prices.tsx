import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image, Table, Icon, Popup} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import SignUp from '../regitration/SingUp';
import MembershipPayment from './MembershipPayment';

const Prices = () => {
  const token = window.localStorage.getItem('jwt');
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  const customerId  = window.localStorage.getItem('customerId');
 
  return (

    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        {customerId ?  (
            <Fragment>
            <Header as='h2' inverted content={'Select Subcriptions'} />
                <Table celled structured size='small'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={13} rowSpan='2'>Membership</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell width={1} >Basic</Table.HeaderCell>
                      <Table.HeaderCell width={1} >Premium</Table.HeaderCell>
                      <Table.HeaderCell width={1} >Elite</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Basic ASCF Member Insurance</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Access to Electronic Newsletter</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Membership Number</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>WCF Passport</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>National Ranking for Competitions</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Access to Subsidised Services and Sponsorship</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                          <Popup
                            trigger={<Icon color='orange' name='question circle outline' size='large' />}
                            content='Limited'
                            position='top center'
                          />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                            trigger={<Icon color='orange' name='question circle outline' size='large' />}
                            content='Limited'
                            position='top center'
                          />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Access to Referee Courses</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                          trigger={<Icon name='dollar sign' color='blue' size='large' />}
                          content='Discount'
                          position='top center'
                        />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                            trigger={<Icon name='dollar sign' color='blue' size='large' />}
                            content='Discount'
                            position='top center'
                          />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Access to National &amp; International Competitions</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                          trigger={<Icon name='dollar sign' color='blue' size='large' />}
                          content='Discount'
                          position='top center'
                        />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                            trigger={<Icon name='dollar sign' color='blue' size='large' />}
                            content='Discount'
                            position='top center'
                          />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>International Ranking in WCF Competitions</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Competitor Insurance Cover for National ASCF Competitions</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Support for National and International Level Individual Competitors</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon color='green' name='checkmark' size='large' />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Instructor Mentoring</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                          trigger={<Icon name='dollar sign' color='blue' size='large' />}
                          content='Discount'
                          position='top center'
                        />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                            trigger={<Icon name='checkmark' color='yellow' size='large' />}
                            content='(1 x Free 20-minute mentor consultation)'
                            position='top center'
                          />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Access to Industry Standard Micro Credential Professional Development Courses/Seminars</Table.Cell>
                      <Table.Cell textAlign='right'>
                        <Icon color='red' name='close' size='large' />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                          trigger={<Icon name='dollar sign' color='blue' size='large' />}
                          content='Discount'
                          position='top center'
                        />
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Popup
                            trigger={<Icon name='dollar sign' color='blue' size='large' />}
                            content='Discount'
                            position='top center'
                          />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                  <Table.Footer>
                  <Table.Row>
                      <Table.HeaderCell> </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Button onClick={() => openModal(
                                    <MembershipPayment 
                                    paymentValues={ {
                                        "customerId":customerId, 
                                        "decription":"Basic Memberbership", 
                                        "price": "$25.00 / yearly", 
                                        "priceId": "price_1H9QbxIHls7iQOHV4z6ADz28"}} 
                                    />)} size='small'>
                          Select
                        </Button>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                      <Button onClick={() => openModal(
                                    <MembershipPayment 
                                    paymentValues={ {
                                        "customerId":customerId, 
                                        "decription":"Premium Memberbership", 
                                        "price": "$100.00 / yearly", 
                                        "priceId": "price_1H9QXkIHls7iQOHVxTkcgsQ4"}} 
                                    />)} size='small'>
                          Select
                        </Button>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                      <Button onClick={() => openModal(
                                    <MembershipPayment 
                                    paymentValues={ {
                                        "customerId":customerId, 
                                        "decription":"Elite Memberbership", 
                                        "price": "$150.00 / yearly", 
                                        "priceId": "price_1H9QRyIHls7iQOHVkfrnnoUC"}} 
                                    />)} size='small'>
                          Select
                        </Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
            </Fragment>
        ) : isLoggedIn && user && token ? (
            <Fragment>
              <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
              <Button as={Link} to='/activities' size='huge' inverted>
                Go to activities!
              </Button>
            </Fragment>
          ) : (
            <Fragment>
            <Header as='h2' inverted content={`Welcome to Australian Sports Capoeira Federation`} />
                <Button onClick={() => openModal(<SignUp />)} size='huge' inverted>
                    Sing Up
                </Button>
            </Fragment>
        )}
        
      </Container>
    </Segment>
  );
};

export default Prices;
