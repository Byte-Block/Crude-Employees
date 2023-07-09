import PropTypes from 'prop-types';

import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';

ReadOnlyRow.propTypes = {
  employee: PropTypes.object,
  deleteEmployee: PropTypes.func,
  editEmployee: PropTypes.func,
  employeeID: PropTypes.number
};

export default function ReadOnlyRow({ employee, deleteEmployee, editEmployee, employeeID }) {
  return (
    <tr onDoubleClick={() => editEmployee(employeeID, true)}>
      <td>{employee.name}</td>
      <td>{employee.position}</td>
      <td>{employee.office}</td>
      <td>{employee.age}</td>
      <td>{employee.startDate}</td>
      <td>{employee.salary}</td>
      <td>
        <span className='actions-container'>
          <BsFillTrashFill
            className='delete-btn'
            onClick={() => deleteEmployee(employeeID)}
          />
          <BsFillPencilFill
            className='edit-btn'
            onClick={() => editEmployee(employeeID, false)}
          />
        </span>
      </td>
    </tr>
  );
}
