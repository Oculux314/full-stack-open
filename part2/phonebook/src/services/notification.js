function create(setNotification, message, isError) {
  setNotification({message, isError});
  setTimeout(() => {
    setNotification(null);
  }, 5000);
}

function success(setNotification, message) {
  create(setNotification, message, false);
}

function error(setNotification, message) {
  create(setNotification, message, true);
}

export default { success, error };
