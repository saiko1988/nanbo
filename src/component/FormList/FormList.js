/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const FormList = ({ forms, updateForms, removeForm, minPriceId }) => {
  const isDisabled = forms.length <= 1;

  const formList = forms.map((form) => {
    const { id, price, amount, discountRate } = form;
    const changeColorIfLowest = (from, to) => (id === minPriceId ? to : from);

    const style = {
      container: css`
        padding: 16px;
        border-radius: 4px;
        border: 1px solid ${changeColorIfLowest('#f1f1f1', '#388e3c')};
        background-color: ${changeColorIfLowest('#f1f1f1', '#e8f5e9')};
        &:not(:first-of-type) {
          margin-top: 1em;
        }
      `,
      label: css`
        display: flex;
        & + & {
          margin-top: 0.5em;
        }
      `,
      inputPrefix: css`
        width: 4em;
      `,
      inputSuffix: css`
        margin-left: 0.5em;
      `,
      wrapper: css`
        display: flex;
        justify-content: space-between;
        margin-top: 1em;
      `,
      price: css`
        margin-top: 0;
        margin-bottom: 0;
        color: ${changeColorIfLowest('#333', '#388e3c')};
        font-weight: ${changeColorIfLowest('normal', 'bold')};
      `,
    };

    const inputs = [
      { name: 'price', prefix: '単価', suffix: '円' },
      { name: 'amount', prefix: '数量', suffix: '' },
      { name: 'discountRate', prefix: '割引率', suffix: '%' },
    ];

    const labels = inputs.map((input) => (
      <label key={input.name} css={style.label}>
        <span css={style.inputPrefix}>{input.prefix}</span>
        <input
          type='number'
          name={input.name}
          className={css.number}
          onChange={(e) => {
            updateForms(e, id);
          }}
        />
        <span css={style.inputSuffix}>{input.suffix}</span>
      </label>
    ));

    return (
      <div key={id} css={style.container}>
        {labels}
        <div css={style.wrapper}>
          <p css={style.price}>
            {Number.parseInt(price * amount * (1 - 0.01 * discountRate), 10) ||
              0}
            円
          </p>
          <button
            type='button'
            onClick={() => removeForm(id)}
            disabled={isDisabled}
          >
            入力フォーム削除
          </button>
        </div>
      </div>
    );
  });

  return formList;
};

FormList.propTypes = {
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      price: PropTypes.string,
      amount: PropTypes.string,
      discountRate: PropTypes.string,
    })
  ),
};

export default FormList;
