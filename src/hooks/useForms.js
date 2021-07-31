import { useState, useEffect } from 'react';
import formService from '../service/form';

const useForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    setForms(formService.init());
  }, []);

  const addForm = () => {
    setForms(formService.add());
  };

  const updateForms = (e, id) => {
    const target = forms.find((form) => form.id === id);
    const newForms = forms.map((form) =>
      form === target ? { ...target, [e.target.name]: e.target.value } : form
    );
    setForms(formService.update(newForms));
  };

  const removeForm = (id) => {
    const newForms = forms.filter((form) => form.id !== id);
    setForms(formService.update(newForms));
  };

  // const validateInputs = (price, rate) => {
  //   if (price < 0) {
  //     console.error('エラー: 元値は正の数値を入力してください');
  //     return;
  //   }
  //   if (rate < 0 || rate > 100) {
  //     console.error('エラー: 割引率の入力値が正しくありません');
  //     return;
  //   }
  //   return true;
  // };

  // const calcDisCountedPrice = (price, rate) => {
  //   (validateInputs(price, rate) ? price * (1 - rate * 0.01) : undefined);
  // };

  // return { forms, calcDisCountedPrice };
  return { forms, addForm, updateForms, removeForm };
};

export default useForms;
