import React from 'react';

import {AuthProvider} from './AuthContext'
import {ToastProvider} from './Toast'

const AppProvider: React.FC = ({children}) => {
  return (
      <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
  );
}

export default AppProvider;