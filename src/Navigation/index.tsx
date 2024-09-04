import React from 'react';
import {QueryClientProvider} from 'react-query';
import queryClient from '../utils/queryClient';
import AccountProvider from '../context/accountContext/AccountContextProvider';
import ModalProvider from '../context/modalContext/ModalContextProvider';
import PresetsProvider from '../context/presetsContext/PresetsContextProvider';
import Stacks from './Stacks';

const Main = (): JSX.Element => (
  <PresetsProvider>
    <QueryClientProvider client={queryClient}>
      <AccountProvider>
        <ModalProvider>
          <Stacks />
        </ModalProvider>
      </AccountProvider>
    </QueryClientProvider>
  </PresetsProvider>
);

export default Main;
