// reference: https://dev.to/igorovic/simplest-way-to-persist-redux-state-to-localstorage-e67

// localStorage.js
const KEY='redux'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// localStorage.js
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch {
    // ignore write errors
  }
};