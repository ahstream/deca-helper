const c = window.confirm;

window.confirm = () => {
  setTimeout(() => {
    window.confirm = c;
  }, 1000);
  return true;
};
