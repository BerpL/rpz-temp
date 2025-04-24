
const appString = '@roshpinahzinc';
const appToken = `${appString}/token`;
const appRefreshToken = `${appString}/refreshToken`;
const appStartSession = `${appString}/startSession`;
const appLastTimeSession = `${appString}/lastTimeSession`;
const appUser = `${appString}/user`;
const appModulesAccess = `${appString}/modulesAccess`;

class Storage {
  static getToken() {
    return localStorage.getItem(appToken);
  }

  static getRefreshToken(token) {
    return localStorage.getItem(appRefreshToken, token);
  }

  static saveToken(token) {
    return localStorage.setItem(appToken, token);
  }

  static saveRefresToken(token) {
    return localStorage.setItem(appRefreshToken, token);
  }

  static saveStartSession(time) {
    return localStorage.setItem(appStartSession, time);
  }

  static saveLastTimeSession(time) {
    return localStorage.setItem(appLastTimeSession, time);
  }

  static getLastTimeSession(time) {
    return localStorage.getItem(appLastTimeSession, time);
  }

  static getStartSession() {
    return localStorage.getItem(appStartSession);
  }

  static saveUser(user) {
    return localStorage.setItem(appUser, JSON.stringify(user));
  }

  static getUser() {
    const user = localStorage.getItem(appUser);
    return JSON.parse(user);
  }

  static saveModulesAccess(access) {
    return localStorage.setItem(appModulesAccess, JSON.stringify(access));
  }

  static getModulesAccess() {
    const access = localStorage.getItem(appModulesAccess);
    return JSON.parse(access);
  }

  static cleanStorage() {
    localStorage.clear();
  }
}

export default Storage;
