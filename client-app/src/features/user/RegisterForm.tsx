import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import SelectInput from '../../app/common/form/SelectInput';
import { prices } from '../../app/common/options/productOptions';
import DateInput from '../../app/common/form/DateInput';

const validate = combineValidators({
  username: isRequired('Username'),
  displayName: isRequired('DisplayName'),
  email: isRequired('Email'),
  password: isRequired('Password'),
  dob: isRequired('DOB'),
  addressLine1: isRequired('AddressLine1'),
  city: isRequired('City'),
  state: isRequired('State'),
  country: isRequired('Country'),
  priceId: isRequired('PriceId')
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Sign up to Australian Sports Capoeira Federation'
            color='teal'
            textAlign='center'
          />
          <Field name='username' component={TextInput} placeholder='Username' />
          <Field
            name='displayName'
            component={TextInput}
            placeholder='Display Name'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field name='groupName' component={TextInput} placeholder='Name of group' />
          <Field name='level' component={TextInput} placeholder='your level / title' />
          <Field name='trainingYears' component={TextInput} number={true} placeholder='Number of years training' />
          <Field name='dob' component={DateInput} date={true} placeholder='Date of Birth' />
         
          <Field name='addressLine1' component={TextInput} placeholder='Address' />
          <Field name='addressLine2' component={TextInput} placeholder='Other Address' />
          <Field name='city' component={TextInput} placeholder='City' />
          <Field name='state' component={TextInput} placeholder='State' />
          <Field name='postcode' component={TextInput} placeholder='Postcode' />
          <Field name='country' component={TextInput} placeholder='Country' />
          
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          <Field
                  component={SelectInput}
                  options={prices}
                  name='priceId'
                  placeholder='Membership'
                  //value={register.}
                />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content='Register'
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
