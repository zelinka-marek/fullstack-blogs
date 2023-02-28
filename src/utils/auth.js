const KEY = "user";

export function saveUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser() {
  try {
    const userJSON = localStorage.getItem(KEY);
    if (!userJSON) {
      return null;
    }

    const user = JSON.parse(userJSON);

    return user;
  } catch {
    return null;
  }
}

export function removeUser() {
  localStorage.removeItem(KEY);
}
