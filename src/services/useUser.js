import httpClient from '@/httpClient';
import useAuthStore from '@/stores/auth';
import { useRouter } from 'vue-router';

const useUser = () => {
  const userStore = useAuthStore();
  const router = useRouter();

  const login = async (username, password) => {
    const request = {
      username,
      password,
    };
    httpClient.post('api/public/login', request)
      .then((response) => {
        if (!response.data.token) return;
        userStore.setCredentials(response.data.token);
        router.push('/');
        // TODO lisada axioses tulevikus authorization: bearer response.token
        // axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      }).catch((error) => console.log('login', error));
  };
  const register = (username, password) => {
    const request = {
      username,
      password,
    };
    httpClient.post('api/public/register', request)
      .then((response) => {
        if (response.data.reason !== 'register successful');
        login(username, password);
      }).catch((error) => console.log('regsiter', error));
  };
  const logout = () => {
    userStore.clearCredentials();
  };

  return {
    login,
    logout,
    register,
  };
};

export default useUser;
