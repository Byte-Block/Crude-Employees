import { useState } from 'react';
import PropTypes from 'prop-types';
import { defaultFormState, camelCaseToText } from '../utils';
import ReactDom from 'react-dom';

import styles from './Modal.module.css';

Modal.propTypes = {
  editValues: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default function Modal({ editValues, onClose, onSubmit }) {
  const [formState, setFormState] = useState(editValues || defaultFormState);
  const [errors, setErrors] = useState('');

  const handleOnChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    onClose();
  };

  const validateForm = () => {
    if (
      formState.name &&
      formState.position &&
      formState.office &&
      formState.age &&
      formState.startDate &&
      formState.salary
    ) {
      setErrors('');
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(', '));
      return false;
    }
  };

  return ReactDom.createPortal(
    <>
      <div
        className={styles.backdrop}
        onClick={onClose}
      ></div>
      <div className={styles.modal}>
        <form>
          {Object.entries(defaultFormState).map((entry) => (
            <div
              key={entry[0]}
              className={styles.form_group}
            >
              <label htmlFor={entry[0]}>{camelCaseToText(entry)}</label>
              <input
                name={entry[0]}
                onChange={handleOnChange}
                value={formState[entry[0]]}
              />
            </div>
          ))}

          {/* <div className={styles.form_group}>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              onChange={handleOnChange}
              value={formState.name}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor='position'>Position</label>
            <input
              name='position'
              onChange={handleOnChange}
              value={formState.position}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor='office'>Office</label>
            <input
              name='office'
              onChange={handleOnChange}
              value={formState.office}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor='age'>Age</label>
            <input
              name='age'
              onChange={handleOnChange}
              value={formState.age}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor='startDate'>Start Date</label>
            <input
              name='startDate'
              onChange={handleOnChange}
              value={formState.startDate}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor='salary'>Salary</label>
            <input
              name='salary'
              onChange={handleOnChange}
              value={formState.salary}
            />
          </div> */}
          {errors && <div className={styles.error}>{`Please include: ${errors}`}</div>}
          <button
            type='submit'
            className={`${styles.btn} btn`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>,
    document.getElementById('portal')
  );
}
