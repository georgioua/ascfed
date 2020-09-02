import React, { Component, useContext } from 'react';
import { IPayment , IPaymentFormValues} from '../../app/models/payment';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Button, Header, Container, Icon}  from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { Form as FinalForm, Field } from 'react-final-form';
import { RootStoreContext } from '../../app/stores/rootStore';
const MembershipPayment: React.FC<{ paymentValues : IPayment  }> = ({ paymentValues }) => {
   
    const stripe = useStripe();
    const elements = useElements();
    const rootStore = useContext(RootStoreContext);
    const { payment } = rootStore.userStore;
    const handleSubmit = async (event : any) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);
        //var cardholderName = document.getElementById('cardholder');
        // Use your card Element with other Stripe.js APIs;
        if(cardElement){
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                //billing_details: {
                //   name: cardholderName.nodeValue,
                //},

            });
            if (error) {
                console.log('[error]', error);
            } else {
                //
                console.log('[PaymentMethod]', paymentMethod);
                if(paymentMethod)
                {
                    payment({ customerId : paymentValues.customerId,
                        priceId: paymentValues.priceId,
                        paymentMethodId:  paymentMethod.id });
                }
            }
        } 
      };
      return (
       
            <form onSubmit={handleSubmit}>
                <Container text>
                <Header as="h3" icon>
                    <Icon name="payment"></Icon>
                    Payment
                    <Header.Subheader>
                        {paymentValues.decription} {paymentValues.price}
                    </Header.Subheader>
                </Header>
                </Container>
                <input name='cardholder' type="text" placeholder="Card holder's name" />
                <CardElement />
                <Button type="submit" disabled={!stripe}>
                    Pay
                </Button>
                
            </form>
      
        

    
      );
};


export default MembershipPayment;