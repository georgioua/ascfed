import React, { useContext } from 'react'
import { Icon, Step, Segment} from 'semantic-ui-react'
import SingUp from './SingUp'
import { RootStoreContext } from '../../app/stores/rootStore'
import IndividualPrices from './IndividualPrices'
import LoginForm from '../user/LoginForm'
import GroupPrices from './GroupPrices'
import MembershipPayment from './MembershipPayment'
import RegisterForm from '../user/RegisterForm'


const RegistrationSteps  = () => {
    
    const rootStore = useContext(RootStoreContext);
   
    const { registrationStep, membershipSelected, setRegistrationStep} = rootStore.userStore;

    //const [activeStep, setStep] = useState(0);


    //(registrationStep != null && registrationStep != activeStep) ? setStep(registrationStep) : setRegistrationStep(0);
    
     console.log(registrationStep);
    const steps = [
        {key: 0, disabled: false, active: (registrationStep === 0),  icon: <Icon name='unlock'></Icon>, title: 'Login', description: ''},
        {key: 1, disabled: false, active: (registrationStep === 1),  icon: <Icon name='signup'></Icon>, title: 'Sign Up', description: 'Enter your email address'},
        {key: 2, disabled: (registrationStep ? registrationStep < 2 : true), active: (registrationStep === 2), icon: <Icon name='user'></Icon>, title: 'Individual Membership', description: 'Choose your individual membership options'},
        {key: 3, disabled: (registrationStep ? registrationStep < 2 : true), active: (registrationStep === 3), icon: <Icon name='group'></Icon>, title: 'School/Group Membership', description: 'Choose your School Group Membership options'},
        {key: 4, disabled: (registrationStep ? registrationStep < 4 : true), active: (registrationStep === 4), icon: <Icon name='payment'></Icon>, title: 'Billing', description: 'Enter billing information'},
        {key: 5, disabled: true, active: (registrationStep === 5), icon: <Icon name='info'></Icon>, title: 'Registration'},
      ];

      

    return (
      

    <Segment inverted textAlign='center' placeholder className='masthead'>
        <Segment.Group horizontal stackable='tablet'>
            <Segment vertical stacked> 
                <Step.Group vertical stackable='tablet'>
                    {steps.map(step => 
                      step.active ? (
                        <Step active>
                                {step.icon}
                                <Step.Content>
                                    <Step.Title>{step.title}</Step.Title>
                                </Step.Content>
                            </Step>   
                      ) : step.disabled ? (
                            <Step disabled>
                                {step.icon}
                                <Step.Content>
                                    <Step.Title>{step.title}</Step.Title>
                                </Step.Content>
                            </Step>   
                      ) : (
                        <Step onClick={() => setRegistrationStep(step.key)}>
                            {step.icon}
                            <Step.Content>
                                <Step.Title>{step.title}</Step.Title>
                            </Step.Content>
                        </Step>   
                      )
                    )}
                    </Step.Group>
                </Segment>
            <Segment stacked>
            { 
                    registrationStep === 1  ? 
                    ( <SingUp></SingUp>)
                    : registrationStep === 2 ? 
                     (<IndividualPrices></IndividualPrices> )
                     : registrationStep === 3 ? 
                     (<GroupPrices></GroupPrices> )
                     : registrationStep === 4 ? 
                     ( <MembershipPayment 
                        paymentValues = {membershipSelected ? membershipSelected : {
                          "customerId":"", 
                          "decription":"None Selected", 
                          "price": "None", 
                          "priceId": ""} }
                      />)
                     : registrationStep === 5 ? 
                     ( <RegisterForm></RegisterForm>)

                    : <LoginForm></LoginForm>
                    }

                    
            </Segment>
        </Segment.Group>

</Segment>
)
}


export default RegistrationSteps