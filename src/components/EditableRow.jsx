import { useState } from 'react';
import PropTypes from 'prop-types';
import { defaultFormState } from '../utils';
import { BsFillSaveFill, BsXCircleFill } from 'react-icons/bs';

import styles from './EditableRow.module.css';

EditableRow.propTypes = {
  inlineEditValues: PropTypes.object,
  saveEdit: PropTypes.func,
  cancelEdit: PropTypes.func
};

export default function EditableRow({ inlineEditValues, saveEdit, cancelEdit }) {
  const [inlineFormState, setInlineFormState] = useState(inlineEditValues);
  const [errors, setErrors] = useState('');

  const handleOnChange = (e) => {
    setInlineFormState({
      ...inlineFormState,
      [e.target.name]: e.target.value.trim()
    });
  };

  const validateForm = () => {
    if (
      inlineFormState.name &&
      inlineFormState.position &&
      inlineFormState.office &&
      inlineFormState.age &&
      inlineFormState.startDate &&
      inlineFormState.salary
    ) {
      setErrors('');
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(inlineFormState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(', '));
      return false;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    saveEdit(inlineFormState);
  };

  return (
    <>
      <tr>
        {Object.entries(defaultFormState).map((entry, index) => (
          <td key={index}>
            <input
              className={styles.inline_input}
              type='text'
              required='required'
              name={entry[0]}
              value={inlineFormState[entry[0]]}
              onChange={handleOnChange}
              aria-required
            />
          </td>
        ))}
        <td>
          <span className='actions-container'>
            <BsFillSaveFill
              className={styles.save_edit_btn}
              onClick={handleSubmit}
            />
            <BsXCircleFill
              className={styles.delete_btn}
              onClick={cancelEdit}
            />
          </span>
        </td>
      </tr>
      {errors && (
        <tr>
          <td colSpan='6'>
            <div className={styles.error}>{`Please include: ${errors}`}</div>
          </td>
        </tr>
      )}
    </>
  );
}
