import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Pagination from '../../../utils/pagination'; // Import the separate Pagination component
import { RiDeleteBinLine, RiEditLine } from '@remixicon/react';

const PurchaseList = () => {
    const [PurchaseData, setPurchaseData] = useState(null);

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
        setPurchaseData([
            {
                id: 1,
                purchase_number: 'PO-2025-001',
                supplier_name: 'ABC Plastic Suppliers',
                order_date: '05/09/2025',
                expected_delivery_date: '12/09/2025',
                actual_delivery_date: '10/09/2025',
                total_ordered_amount: 50000.00,
                total_received_amount: 50000.00,
                discount_amount: 0.00,
                tax_amount: 0.00,
                net_amount: 50000.00,
                status: 'fully_received',
                payment_status: 'pending',
                quality_check_status: 'passed',
                vehicle_number: 'LES-1234',
                driver_name: 'Ahmad Ali',
                driver_phone: '+92 300 1234567',
                created_by: 'admin',
                received_by: 'warehouse_manager'
            },
            {
                id: 2,
                purchase_number: 'PO-2025-002',
                supplier_name: 'Quality Chemical Co.',
                order_date: '08/09/2025',
                expected_delivery_date: '15/09/2025',
                actual_delivery_date: null,
                total_ordered_amount: 25000.00,
                total_received_amount: 15000.00,
                discount_amount: 500.00,
                tax_amount: 4250.00,
                net_amount: 28750.00,
                status: 'partially_received',
                payment_status: 'partial',
                quality_check_status: 'pending',
                vehicle_number: null,
                driver_name: null,
                driver_phone: null,
                created_by: 'procurement_manager',
                received_by: null
            },
            {
                id: 3,
                purchase_number: 'PO-2025-003',
                supplier_name: 'Premium Raw Materials',
                order_date: '10/09/2025',
                expected_delivery_date: '17/09/2025',
                actual_delivery_date: null,
                total_ordered_amount: 75000.00,
                total_received_amount: 0.00,
                discount_amount: 1500.00,
                tax_amount: 12750.00,
                net_amount: 86250.00,
                status: 'approved',
                payment_status: 'pending',
                quality_check_status: 'pending',
                vehicle_number: null,
                driver_name: null,
                driver_phone: null,
                created_by: 'admin',
                received_by: null
            },
            {
                id: 4,
                purchase_number: 'PO-2025-004',
                supplier_name: 'Elite Chemical Industries',
                order_date: '12/09/2025',
                expected_delivery_date: '19/09/2025',
                actual_delivery_date: '18/09/2025',
                total_ordered_amount: 35000.00,
                total_received_amount: 35000.00,
                discount_amount: 0.00,
                tax_amount: 5950.00,
                net_amount: 40950.00,
                status: 'fully_received',
                payment_status: 'paid',
                quality_check_status: 'passed',
                vehicle_number: 'KHI-5678',
                driver_name: 'Hassan Khan',
                driver_phone: '+92 300 2345678',
                created_by: 'procurement_manager',
                received_by: 'quality_manager'
            },
            {
                id: 5,
                purchase_number: 'PO-2025-005',
                supplier_name: 'Plastic World Suppliers',
                order_date: '14/09/2025',
                expected_delivery_date: '21/09/2025',
                actual_delivery_date: null,
                total_ordered_amount: 42000.00,
                total_received_amount: 0.00,
                discount_amount: 800.00,
                tax_amount: 7140.00,
                net_amount: 48340.00,
                status: 'pending',
                payment_status: 'pending',
                quality_check_status: 'pending',
                vehicle_number: null,
                driver_name: null,
                driver_phone: null,
                created_by: 'admin',
                received_by: null
            },
            {
                id: 6,
                purchase_number: 'PO-2025-006',
                supplier_name: 'Modern Equipment Co.',
                order_date: '16/09/2025',
                expected_delivery_date: '23/09/2025',
                actual_delivery_date: null,
                total_ordered_amount: 120000.00,
                total_received_amount: 60000.00,
                discount_amount: 2000.00,
                tax_amount: 20400.00,
                net_amount: 138400.00,
                status: 'partially_received',
                payment_status: 'partial',
                quality_check_status: 'failed',
                vehicle_number: 'LHR-9012',
                driver_name: 'Muhammad Tariq',
                driver_phone: '+92 300 3456789',
                created_by: 'procurement_manager',
                received_by: 'warehouse_manager'
            },
            {
                id: 7,
                purchase_number: 'PO-2025-007',
                supplier_name: 'Chemical Solutions Ltd',
                order_date: '18/09/2025',
                expected_delivery_date: '25/09/2025',
                actual_delivery_date: '24/09/2025',
                total_ordered_amount: 28000.00,
                total_received_amount: 28000.00,
                discount_amount: 0.00,
                tax_amount: 4760.00,
                net_amount: 32760.00,
                status: 'fully_received',
                payment_status: 'pending',
                quality_check_status: 'passed',
                vehicle_number: 'GUJ-3456',
                driver_name: 'Ali Ahmed',
                driver_phone: '+92 300 4567890',
                created_by: 'admin',
                received_by: 'quality_manager'
            },
            {
                id: 8,
                purchase_number: 'PO-2025-008',
                supplier_name: 'Universal Trading Co.',
                order_date: '20/09/2025',
                expected_delivery_date: '27/09/2025',
                actual_delivery_date: null,
                total_ordered_amount: 18000.00,
                total_received_amount: 0.00,
                discount_amount: 300.00,
                tax_amount: 3060.00,
                net_amount: 20760.00,
                status: 'cancelled',
                payment_status: 'pending',
                quality_check_status: 'pending',
                vehicle_number: null,
                driver_name: null,
                driver_phone: null,
                created_by: 'procurement_manager',
                received_by: null
            },
            {
                id: 9,
                purchase_number: 'PO-2025-009',
                supplier_name: 'ABC Plastic Suppliers',
                order_date: '22/09/2025',
                expected_delivery_date: '29/09/2025',
                actual_delivery_date: null,
                total_ordered_amount: 65000.00,
                total_received_amount: 0.00,
                discount_amount: 1300.00,
                tax_amount: 11050.00,
                net_amount: 74750.00,
                status: 'approved',
                payment_status: 'pending',
                quality_check_status: 'pending',
                vehicle_number: null,
                driver_name: null,
                driver_phone: null,
                created_by: 'admin',
                received_by: null
            },
            {
                id: 10,
                purchase_number: 'PO-2025-010',
                supplier_name: 'Global Trade Solutions',
                order_date: '24/09/2025',
                expected_delivery_date: '01/10/2025',
                actual_delivery_date: null,
                total_ordered_amount: 32000.00,
                total_received_amount: 16000.00,
                discount_amount: 640.00,
                tax_amount: 5440.00,
                net_amount: 36800.00,
                status: 'partially_received',
                payment_status: 'pending',
                quality_check_status: 'partial',
                vehicle_number: 'ISB-7890',
                driver_name: 'Farhan Sheikh',
                driver_phone: '+92 300 5678901',
                created_by: 'procurement_manager',
                received_by: 'warehouse_manager'
            }
        ]);
    }, []);

    // Action handlers
    const handleEdit = (purchase) => {
        console.log('Edit purchase:', purchase.id);
        // Add your edit logic here
    };

    const handleDelete = (purchase) => {
        console.log('Delete purchase:', purchase.id);
        // Add your delete logic here
    };

    // Status color helper
    const getStatusColor = (status) => {
        switch (status) {
            case 'fully_received':
                return 'bg-green-100 text-green-800';
            case 'partially_received':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-gray-100 text-gray-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'partial':
                return 'bg-yellow-100 text-yellow-800';
            case 'pending':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Define columns for react-data-table-component
    const columns = [
        {
            name: 'Purchase ID',
            selector: row => row.id,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Purchase Number',
            selector: row => row.purchase_number,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Supplier',
            selector: row => row.supplier_name,
            sortable: true,
            width: '180px',
        },
        {
            name: 'Order Date',
            selector: row => row.order_date,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Expected Delivery',
            selector: row => row.expected_delivery_date,
            width: '150px',
        },
        {
            name: 'Net Amount',
            cell: row => (
                <div className="fs_14">
                    <span className="text-[var(--success)] whitespace-nowrap font-medium">
                        Rs {row.net_amount.toLocaleString()}
                    </span>
                </div>
            ),
            sortable: true,
            width: '130px',
        },
        {
            name: 'Status',
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(row.status)}`}>
                    {row.status.replace('_', ' ').charAt(0).toUpperCase() + row.status.replace('_', ' ').slice(1)}
                </span>
            ),
            width: '140px',
        },
        {
            name: 'Payment Status',
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getPaymentStatusColor(row.payment_status)}`}>
                    {row.payment_status.charAt(0).toUpperCase() + row.payment_status.slice(1)}
                </span>
            ),
            width: '130px',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex items-center gap-1">
                    {/* Edit Button */}
                    <button
                        className="flex bg-blue-500 items-center justify-center p-[7px] w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-400 rounded-md transition-all duration-200"
                        onClick={() => handleEdit(row)}
                        title="Edit Purchase"
                    >
                        <RiEditLine className='text-white'/>
                    </button>

                    {/* Delete Button */}
                    <button
                        className="flex bg-red-500 items-center justify-center p-[7px] w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-400 rounded-md transition-all duration-200"
                        onClick={() => handleDelete(row)}
                        title="Delete Purchase"
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
                        <h2 className="text-2xl font-bold text-gray-900">Purchase Management</h2>
                        <p className="text-gray-600">Manage and Track your Purchase Orders here</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-transparent">
                {PurchaseData && (
                    <DataTable
                        columns={columns}
                        data={PurchaseData}
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
                                <p className="text-gray-500">No purchase orders found</p>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default PurchaseList;