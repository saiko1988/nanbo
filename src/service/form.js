import { v4 as uuidv4 } from 'uuid';

const key = 'forms';
const newForm = () => ({
  id: uuidv4(),
  price: '0',
  amount: '0',
  discountRate: '0',
});

const init = () => {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, JSON.stringify([].concat(newForm())));
  return JSON.parse(sessionStorage.getItem(key));
};

const add = () => {
  const forms = JSON.parse(sessionStorage.getItem(key));
  sessionStorage.setItem(key, JSON.stringify(forms.concat(newForm())));
  return JSON.parse(sessionStorage.getItem(key));
};

const update = (newForms) => {
  sessionStorage.setItem(key, JSON.stringify(newForms));
  return JSON.parse(sessionStorage.getItem(key));
};

export default {
  init,
  add,
  update,
};
