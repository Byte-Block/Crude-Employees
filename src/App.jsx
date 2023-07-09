import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SortingDirection, sortData, getNextSortingDirection } from './utils'
import Table from './components/Table';
import Modal from './components/Modal';
import { Pagination, ConfigProvider } from 'antd';

import './App.css';

import data from './data/employees.json';

function App() {
  const [employees, setEmployees] = useState(data);
  const employeeKeys = employees.map(() => uuidv4());
  const totalEmployees = employees.length;

  const [page, setPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);

  const [sort, setSort] = useState({
    key: '',
    direction: SortingDirection.ASCENDING
  });

  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [inlineEmployeeToEdit, setInlineEmployeeToEdit] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const sortColumn = (key) => {
    const direction =
      sort.key === key ? getNextSortingDirection(sort.direction) : SortingDirection.ASCENDING;

    sortData(employees, key, direction);

    setSort({ key, direction });
  };

  const handleOnInlineEdit = (editedEmployee) => {
    setEmployees(
      employees.map((employee, index) => {
        if (index !== inlineEmployeeToEdit) return employee;

        return editedEmployee;
      })
    );
    setInlineEmployeeToEdit(null);
  };

  const handleInlineEditCancel = () => setInlineEmployeeToEdit(null);

  const handleOnSubmit = (newEmployee) => {
    employeeToEdit === null
      ? setEmployees([...employees, newEmployee])
      : setEmployees(
          employees.map((employee, index) => {
            if (index !== employeeToEdit) return employee;

            return newEmployee;
          })
        );
  };

  const indexOfLastPage = page * employeesPerPage;
  const indexOfFirstPage = indexOfLastPage - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstPage, indexOfLastPage);

  const handleDeleteEmployee = (employeeIndex) => {
    setEmployees(employees.filter((_, index) => index !== employeeIndex));
  };

  const handleEditEmployee = (employeeIndex, inlineEdit) => {
    if (inlineEdit) {
      setInlineEmployeeToEdit(employeeIndex);
    } else {
      setEmployeeToEdit(employeeIndex);
      setModalOpen(true);
    }
  };

  const handleShowSizeChange = (current, pageSize) => {
    setEmployeesPerPage(pageSize);
  };

  const handleItemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }

    return originalElement;
  };

  return (
    <div className='App'>
      <Table
        sortColumn={sortColumn}
        employees={currentEmployees}
        employeeKeys={employeeKeys}
        deleteEmployee={handleDeleteEmployee}
        editEmployee={handleEditEmployee}
        inlineEmployeeToEdit={inlineEmployeeToEdit}
        onSubmit={handleOnInlineEdit}
        onCancel={handleInlineEditCancel}
      />
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#7CB342'
        }
      }}>
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={employeesPerPage}
          total={totalEmployees}
          current={page}
          showSizeChanger
          onShowSizeChange={handleShowSizeChange}
          itemRender={handleItemRender}
        />
      </ConfigProvider>
      <button
        className='btn'
        onClick={() => setModalOpen(true)}
      >
        Add
      </button>
      {modalOpen ? (
        <Modal
          onClose={() => {
            setModalOpen(false);
            setEmployeeToEdit(null);
          }}
          onSubmit={handleOnSubmit}
          editValues={employeeToEdit !== null ? employees[employeeToEdit] : null}
        />
      ) : null}
    </div>
  );
}

export default App;
