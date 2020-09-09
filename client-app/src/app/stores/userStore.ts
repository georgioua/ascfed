import { observable, computed, action, runInAction} from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import {ISingUpFormValues , ISingUp } from '../models/signup';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';
import { IPaymentFormValues , IPayment} from '../models/payment';
//import { isPlainObject } from 'mobx-react-lite/dist/utils';


export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;//
  }

  @observable user: IUser | null = null;
  @observable loading = false;
  @observable customer: ISingUp | null = null;
  @observable registrationStep: number | null = 0;
  @observable membershipSelected : IPayment | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action setRegistrationStep = (step: number | null) => {
   this.registrationStep = step;
   history.push('/');
  }

  @action setMembership = (values : IPayment | null) => {
    this.membershipSelected = values;
    this.setRegistrationStep(4);
    history.push('/');
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.commonStore.setRefreshToken(user.refreshToken);
      this.rootStore.modalStore.closeModal();
      history.push('/activities');
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.commonStore.setRefreshToken(user.refreshToken);
      this.rootStore.modalStore.closeModal();
      history.push('/activities')
    } catch (error) {
      throw error;
    }
  }
  @action singnup = async (values: ISingUpFormValues) => {
    const customer = await agent.User.singup(values);
    console.log(customer);
    this.rootStore.commonStore.setCustomerId(customer.customerId);
    runInAction(() => {
      this.registrationStep = 2;
    });
    console.log(this.registrationStep);
    history.push('/')
  } 

  @action payment = async (values: IPaymentFormValues) => {
    const user = await agent.User.payment(values);
      //console.log(user);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.commonStore.setRefreshToken(user.refreshToken);
      this.rootStore.modalStore.closeModal();
      runInAction(() => {
        this.user = user;
      });
      this.setRegistrationStep(5);
      history.push('/');
  } 

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.rootStore.commonStore.setRefreshToken(null);
    this.user = null;
    history.push('/');
  };

  @action fbLogin = async (response: any) => {
    this.loading = true;
    try {
      const user = await agent.User.fbLogin(response.accessToken);
      runInAction(() => {
        this.user = user;
        this.rootStore.commonStore.setToken(user.token);
        this.rootStore.commonStore.setRefreshToken(user.refreshToken);
        this.rootStore.modalStore.closeModal();
        this.loading = false;
      })
      history.push('/activities');
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }
}
