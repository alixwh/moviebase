import httpClient from '@/httpClient';
import useAuthStore from '@/stores/auth';
import { useRouter } from 'vue-router';

const useUser = () => {
  const userStore = useAuthStore();
  const router = useRouter();

  const getAccountDetails = async () => {
    if (!localStorage.getItem('accountId')) {
      const response = await httpClient.get('api/account');
      const { data } = response;
      localStorage.setItem('accountId', data.id);
      localStorage.setItem('username', data.username);
    }
  };

  const login = async (username, password) => {
    const request = {
      username,
      password,
    };
    httpClient.post('api/public/login', request)
      .then((response) => {
        if (!response.data.token) return;
        userStore.setCredentials(response.data.token);
        // TODO lisada axioses tulevikus authorization: bearer response.token
        // eslint-disable-next-line dot-notation
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        getAccountDetails();
        router.push('/');
      });
    // .catch((error) => console.log('login', error));
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
      });
    // .catch((error) => console.log('regsiter', error));
  };
  const logout = () => {
    userStore.clearCredentials();
    router.push('/');
  };

  const deleteAccount = (id) => {
    httpClient.delete(`api/delete/${id.value}`);
    logout();
  };
  return {
    login,
    logout,
    register,
    deleteAccount,
  };
};

export default useUser;
