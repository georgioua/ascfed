import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import {ISingUpFormValues} from '../../app/models/signup';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { observer } from 'mobx-react-lite';

const validate = combineValidators({
  email: isRequired('Email')
});
const SingUp = () => {
  const rootStore = useContext(RootStoreContext);
  const { singnup } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: ISingUpFormValues) =>
        singnup(values).catch(error => ({
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
            content='SignUp to Australian Sports Capoeira Federation'
            color='teal'
            textAlign='center'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text='Invalid email'
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content='SignUp'
            fluid
          />
        </Form>
      )}
    />
  );
};

export default observer(SingUp);

