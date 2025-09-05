import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Pagination from '../../../utils/pagination'; // Import the separate Pagination component
import { RiDeleteBinLine, RiEditLine, RiEyeLine } from '@remixicon/react';

const PurchaseList = () => {
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
                id: 1,
                po_number: 'PO-2025001',
                supplier: 'Talat Shakot',
                po_date: '14/28/2023',
                expected_delivery_date: '15/01/2023',
                total_amount: 50000.00,
                net_amount: 40000.00,
                status: 'Approved',
                note: 'Plastic pallets for production',
                created_by: 'admin',
                reacived_by: 'hamza',
                created_date: '15/01/2023',
            }
        ])
    }, []);

    // Action handlers
    const handleEdit = (employee) => {
        console.log('Edit employee:', employee.employee_id);
        // Add your edit logic here
    };

    const handleView = (employee) => {
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
            name: 'Purchase Order Number',
            selector: row => row?.po_number,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Supplier',
            selector: row => row?.supplier,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Purchase Date',
            selector: row => row?.po_date,
            width: '150px',
        },
        {
            name: 'Delivery Date',
            selector: row => row?.expected_delivery_date,
            sortable: true,
            width: '130px',
        },
        {
            name: 'Total Amount',
            selector: row => row?.total_amount,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Net Amount',
            selector: row => row?.net_amount,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Status',
            cell: row => {
                // Function to get status styling
                const getStatusStyle = (status) => {
                    switch (status?.toLowerCase()) {
                        case 'approved':
                            return 'bg-green-100 text-green-800 border-green-200';
                        case 'pending':
                            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                        case 'received':
                            return 'bg-blue-100 text-blue-800 border-blue-200';
                        case 'partially_received':
                            return 'bg-orange-100 text-orange-800 border-orange-200';
                        case 'cancelled':
                            return 'bg-red-100 text-red-800 border-red-200';
                        case 'active':
                            return 'bg-green-100 text-green-800 border-green-200';
                        case 'inactive':
                            return 'bg-gray-100 text-gray-800 border-gray-200';
                        default:
                            return 'bg-gray-100 text-gray-800 border-gray-200';
                    }
                };

                // Format status text for display
                const formatStatusText = (status) => {
                    if (!status) return 'Unknown';

                    // Handle underscore-separated statuses
                    if (status.includes('_')) {
                        return status?.split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                    }

                    // Capitalize first letter for single words
                    return status.charAt(0).toUpperCase() + status.slice(1);
                };

                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border ${getStatusStyle(row.status)}`}>
                        {formatStatusText(row?.status)}
                    </span>
                );
            },
            width: '120px', // Increased width to accommodate longer status text
        },
        {
            name: 'Purchased By',
            selector: row => row?.created_by,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Recived by',
            selector: row => row?.reacived_by,
            sortable: true,
            width: '120px',
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
                        <RiEditLine className='text-white' />
                    </button>

                    <button
                        className="flex bg-blue-500 items-center justify-center p-[7px] w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-400 rounded-md transition-all duration-200"
                        onClick={() => handleView(row)}
                        title="View Purchase Detail"
                    >
                        <RiEyeLine className='text-white' />
                    </button>

                    {/* Delete Button */}
                    <button
                        className="flex bg-red-500 items-center justify-center p-[7px] w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-400 rounded-md transition-all duration-200"
                        onClick={() => handleDelete(row)}
                        title="Delete Purchase"
                    >
                        <RiDeleteBinLine className='text-white' />
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
                        <h2 className="text-2xl font-bold text-gray-900">Purchase Management</h2>
                        <p className="text-gray-600">Manage and Update your Purchases here</p>
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

export default PurchaseList;