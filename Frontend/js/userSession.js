const STORAGE_KEY = 'activeUser';

let activeUser = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;

export function setActiveUser(user) {
  activeUser = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getActiveUser() {
  return activeUser;
}

export function clearActiveUser() {
  activeUser = null;
  localStorage.removeItem(STORAGE_KEY);
}
