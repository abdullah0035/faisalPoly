import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Pagination from '../../../utils/pagination'; // Import the separate Pagination component
import { RiDeleteBinLine, RiEditLine } from '@remixicon/react';

const LabourList = () => {
    const [LabourData, setLabourData] = useState(null);

    // Custom pagination wrapper for DataTable
    const paginationComponentWrapper = (props) => {
        return (
            <Pagination
                currentPage={props.currentPage}
                totalRows={props.rowCount}
                rowsPerPage={props.rowsPerPage}
                onChangePage={props.onChangePage}
                onChangeRowsPerPage={props.onChangeRowsPerPage}
            />
        );
    };

    const paginationComponentOptions = {
        rowsPerPageText: '',
        rangeSeparatorText: 'of',
        selectAllRowsItem: false,
        selectAllRowsItemText: 'All',
        noRowsPerPage: true
    };

    useEffect(() => {
        setLabourData([
            {
                id: '#54321',
                employee_id: 'EMP001',
                name: 'Anas Ahmed',
                email: 'anas@company.com',
                phone: '+92 300 1234567',
                position: 'Operator',
                department: 'Production',
                monthly_salary: 40000.00,
                hire_date: '15/01/2023',
                status: 'Active'
            },
            {
                id: '#67890',
                employee_id: 'EMP002',
                name: 'Talha Hussain',
                email: 'talha@company.com',
                phone: '+92 300 2345678',
                position: 'Supervisor',
                department: 'Production',
                monthly_salary: 45000.00,
                hire_date: '20/11/2022',
                status: 'Active'
            },
            {
                id: '#23456',
                employee_id: 'EMP003',
                name: 'Hamza Khan',
                email: 'hamza@company.com',
                phone: '+92 300 3456789',
                position: 'Helper',
                department: 'Production',
                daily_wage: 1500.00,
                hire_date: '10/03/2023',
                status: 'Active'
            },
            {
                id: '#98765',
                employee_id: 'EMP004',
                name: 'Ali Raza',
                email: 'ali@company.com',
                phone: '+92 300 4567890',
                position: 'Quality Control',
                department: 'Quality',
                monthly_salary: 42000.00,
                hire_date: '01/02/2023',
                status: 'Active'
            },
            {
                id: '#34567',
                employee_id: 'EMP005',
                name: 'Omar Farooq',
                email: 'omar@company.com',
                phone: '+92 300 5678901',
                position: 'Maintenance',
                department: 'Maintenance',
                monthly_salary: 39000.00,
                hire_date: '15/12/2022',
                status: 'Inactive'
            },
            {
                id: '#45678',
                employee_id: 'EMP006',
                name: 'Ahmed Khan',
                email: 'ahmed@company.com',
                phone: '+92 300 6789012',
                position: 'Helper',
                department: 'Production',
                daily_wage: 1400.00,
                hire_date: '05/03/2023',
                status: 'Active'
            },
            {
                id: '#56789',
                employee_id: 'EMP007',
                name: 'Hassan Ali',
                email: 'hassan@company.com',
                phone: '+92 300 7890123',
                position: 'Operator',
                department: 'Production',
                monthly_salary: 38000.00,
                hire_date: '12/01/2023',
                status: 'Active'
            },
            {
                id: '#67890',
                employee_id: 'EMP008',
                name: 'Faisal Ahmed',
                email: 'faisal@company.com',
                phone: '+92 300 8901234',
                position: 'Admin',
                department: 'Admin',
                monthly_salary: 35000.00,
                hire_date: '20/02/2023',
                status: 'Active'
            },
            {
                id: '#78901',
                employee_id: 'EMP009',
                name: 'Usman Shah',
                email: 'usman@company.com',
                phone: '+92 300 9012345',
                position: 'Security',
                department: 'Security',
                monthly_salary: 32000.00,
                hire_date: '01/04/2023',
                status: 'Active'
            },
            {
                id: '#89012',
                employee_id: 'EMP010',
                name: 'Bilal Khan',
                email: 'bilal@company.com',
                phone: '+92 300 0123456',
                position: 'Helper',
                department: 'Maintenance',
                daily_wage: 1300.00,
                hire_date: '15/04/2023',
                status: 'Active'
            }
        ])
    }, []);

    // Action handlers
    const handleEdit = (employee) => {
        console.log('Edit employee:', employee.employee_id);
        // Add your edit logic here
    };

    const handleDelete = (employee) => {
        console.log('Delete employee:', employee.employee_id);
        // Add your delete logic here
    };

    // Define columns for react-data-table-component
    const columns = [
        {
            name: 'Employee ID',
            selector: row => row.employee_id,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            width: '150px',
        },
        {
            name: 'Position',
            selector: row => row.position,
            sortable: true,
            width: '130px',
        },
        {
            name: 'Department',
            selector: row => row.department,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Salary/Wage',
            cell: row => (
                <div className="text-sm">
                    {row.monthly_salary ? (
                        <span className="text-green-600 font-medium">
                            Rs {row.monthly_salary.toLocaleString()}/mo
                        </span>
                    ) : row.daily_wage ? (
                        <span className="text-blue-600 font-medium">
                            Rs {row.daily_wage.toLocaleString()}/day
                        </span>
                    ) : (
                        <span className="text-gray-400">N/A</span>
                    )}
                </div>
            ),
            width: '150px',
        },
        {
            name: 'Hire Date',
            selector: row => row.hire_date,
            sortable: true,
            width: '110px',
        },
        {
            name: 'Status',
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${row.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {row.status}
                </span>
            ),
            width: '100px',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex items-center gap-1">
                    {/* Edit Button */}
                    <button
                        className="flex bg-blue-500 items-center justify-center p-[7px] w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-400 rounded-md transition-all duration-200"
                        onClick={() => handleEdit(row)}
                        title="Edit Employee"
                    >
                        <RiEditLine className='text-white'/>
                    </button>

                    {/* Delete Button */}
                    <button
                        className="flex bg-red-500 items-center justify-center p-[7px] w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-400 rounded-md transition-all duration-200"
                        onClick={() => handleDelete(row)}
                        title="Delete Employee"
                    >
                        <RiDeleteBinLine className='text-white'/>
                    </button>
                </div>
            ),
            width: '120px',
            ignoreRowClick: true,
        },
    ];

    return (
        <div className='p-5'>
            <div className="py-5">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Labour Management</h2>
                        <p className="text-gray-600">Manage and Update your Labour here</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-transparent">
                {LabourData && (
                    <DataTable
                        columns={columns}
                        data={LabourData}
                        pagination
                        paginationComponent={paginationComponentWrapper}
                        paginationComponentOptions={paginationComponentOptions}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[7, 10, 15, 25, 50]}
                        highlightOnHover
                        responsive
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        selectableRows={false}
                        noDataComponent={
                            <div className="text-center py-8">
                                <p className="text-gray-500">No employees found</p>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default LabourList;