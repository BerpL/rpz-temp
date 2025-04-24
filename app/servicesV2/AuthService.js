import Service from './Service';
import Storage from '../storage';

class AuthService extends Service {
  signIn(credentials) {
    const self = this;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await self.fetchApi().post('auth/login', {
          usuario: credentials.username,
          password: credentials.password,
        });
        const { data: { token, refreshToken, ...user } } = response;
        if (token) Storage.saveToken(token);
        if (refreshToken) Storage.saveRefresToken(refreshToken);
        if (user) Storage.saveUser(user);
        var now = new Date();
        var utc_timestamp = Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds(),
          now.getUTCMilliseconds()
        );
        Storage.saveStartSession(utc_timestamp);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

  async signOut() {
    try {
      if (response.status === 200) {
        // Successful logout
        Storage.cleanStorage();
      } else {
        // Handle other response statuses if needed
        console.error('Failed to log out:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  }
}

export default AuthService;
