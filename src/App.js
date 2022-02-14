/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import FormList from './component/FormList/FormList';
import useForms from './hooks/useForms';
import './index.css';

function App() {
  const { forms, addForm, updateForms, removeForm } = useForms();
  const [minPriceId, setMinPriceId] = useState('');

  const style = {
    header: css`
      & > h1 {
        margin-bottom: 0;
      }
      & > p {
        margin-top: 0.5em;
      }
    `,
    buttonWrapper: css`
      margin-top: 1em;
      & > * + * {
        margin-left: 0.75em;
      }
    `,
  };

  const getCaliculatedPriceObj = (e) => {
    e.preventDefault();
    return forms.map((form) => {
      const { id, price, amount, discountRate } = form;
      return {
        id,
        caliculatedPrice: price * amount * (1 - discountRate * 0.01),
      };
    });
  };

  const handleButtonClick = (e) => {
    const minPriceObj = getCaliculatedPriceObj(e).sort(
      (a, b) => a.caliculatedPrice - b.caliculatedPrice
    )[0];
    setMinPriceId(minPriceObj.id);
  };

  return (
    <>
      <header css={style.header}>
        <h1>Nanbo</h1>
        <p>最安値がわかる金額計算アプリ</p>
      </header>
      <form>
        <FormList
          forms={forms}
          updateForms={updateForms}
          removeForm={removeForm}
          minPriceId={minPriceId}
        />
        <div css={style.buttonWrapper}>
          <button type='button' onClick={(e) => handleButtonClick(e)}>
            最安値を計算する
          </button>
          <button type='button' onClick={addForm}>
            入力フォームを追加する
          </button>
        </div>
      </form>
    </>
  );

  // const [ price, setPrice ] = useState( 0 );
  // const [ disCountRate, setDisCountRate ] = useState( 0 );

  // const validateInputs = ( price, rate ) => {
  //   if ( price >= 0 ) {
  //     console.error( 'エラー: 元値は正の数値を入力してください' );
  //     return;
  //   }
  //   if ( rate < 0 || 100 < rate ) {
  //     console.error( 'エラー: 割引率の入力値が正しくありません' );
  //     return;
  //   }
  //   return true;
  // };
  // const calcDisCountPrice = ( price, rate ) => {
  //   return validateInputs( price, rate ) ? price * ( 1 - rate * 0.01 ) : undefined;
  // };

  // return (
  //   <>
  //     <label>
  //   元値
  //   <input type="number" onChange={( e ) => setPrice( () => e.target.value )} />
  //   円
  // </label>
  //     <label>
  // 割引率
  // <input type="number" onChange={( e ) => setDisCountRate( () => e.target.value )} />
  // %引き
  // </label>
  //     <p>{calcDisCountPrice( price, disCountRate )}</p>
  //   </>
  // );
}

export default App;
