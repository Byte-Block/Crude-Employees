import { defaultFormState, camelCaseToText } from '../utils';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';

import styles from './Table.module.css';

import PropTypes from 'prop-types';

Table.propTypes = {
  sortColumn: PropTypes.func,
  employees: PropTypes.array,
  inlineEmployeeToEdit: PropTypes.number,
  employeeKeys: PropTypes.array,
  deleteEmployee: PropTypes.func,
  editEmployee: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default function Table({
  sortColumn,
  employees,
  inlineEmployeeToEdit,
  employeeKeys,
  deleteEmployee,
  editEmployee,
  onSubmit,
  onCancel
}) {
  return (
    <div className={styles.table_wrapper}>
      <form>
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.entries(defaultFormState).map((entry) => (
                <th
                  key={entry[0]}
                  onClick={() => sortColumn(entry[0])}
                >
                  {camelCaseToText(entry)}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <>
                {inlineEmployeeToEdit === index ? (
                  <EditableRow
                    key={employeeKeys[index]}
                    inlineEditValues={
                      inlineEmployeeToEdit !== null ? employees[inlineEmployeeToEdit] : null
                    }
                    saveEdit={onSubmit}
                    cancelEdit={onCancel}
                  />
                ) : (
                  <ReadOnlyRow
                    key={employeeKeys[index]}
                    employee={employee}
                    deleteEmployee={deleteEmployee}
                    editEmployee={editEmployee}
                    employeeID={index}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
