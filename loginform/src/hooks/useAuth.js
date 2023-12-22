// hooks/useAuth.js
import { useMutation } from 'react-query';
import authService from '../services/authService';

const useAuth = () => {
  const { mutate: login } = useMutation(authService.login);

  return { login };
};

export default useAuth;
