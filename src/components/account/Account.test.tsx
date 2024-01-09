import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Account } from './Account';

const mockStore = configureStore<any>([]);

describe('Account component', () => {
  let store: MockStoreEnhanced<any, {}>;
  let component1: ReactTestRenderer;

  beforeEach(() => {
    store = mockStore({
      auth: {
        member: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          avios: 100,
        },
      },
    });

    component1 = renderer.create(
      <Provider store={store}>
        <Account />
      </Provider>,
    );
  });

  it('renders correctly', () => {
    const tree = component1.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Add more test cases as needed

  it('displays correct member information', () => {
    const instance = component1.root;

    // Replace with the actual selectors if needed
    const firstNameNode = instance.findByProps({ headline: 'FirstName' });
    const lastNameNode = instance.findByProps({ headline: 'LastName' });
    const emailNode = instance.findByProps({ headline: 'Email' });
    const aviosNode = instance.findByProps({ headline: 'Avious Points' });

    expect(firstNameNode.props.value).toEqual('John');
    expect(lastNameNode.props.value).toEqual('Doe');
    expect(emailNode.props.value).toEqual('john.doe@example.com');
    expect(aviosNode.props.value).toEqual(100);
  });
});
