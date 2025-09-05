import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Pagination from '../../../utils/pagination'; // Import the separate Pagination component
import { RiDeleteBinLine, RiEditLine } from '@remixicon/react';

const SupplierList = () => {
    const [SupplierData, setSupplierData] = useState(null);

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
        setSupplierData([
            {
                id: 1,
                name: 'ABC Plastic Suppliers',
                phone: '+92 300 1234567',
                email: 'contact@abcplastic.com',
                address: 'Industrial Area, Block A, Street 5',
                city: 'Faisalabad',
                province: 'Punjab',
                country: 'Pakistan',
                supplier_type: 'plastic_pallets',
                payment_terms: 'Net 30 Days',
                credit_limit: 500000.00,
                status: 'active',
                created_at: '15/01/2023',
                updated_at: '15/01/2023'
            },
            {
                id: 2,
                name: 'Quality Chemical Co.',
                phone: '+92 300 2345678',
                email: 'sales@qualitychem.com',
                address: 'Chemical Complex, Phase 2',
                city: 'Karachi',
                province: 'Sindh',
                country: 'Pakistan',
                supplier_type: 'ingredients',
                payment_terms: 'Cash on Delivery',
                credit_limit: 200000.00,
                status: 'active',
                created_at: '20/11/2022',
                updated_at: '10/03/2023'
            },
            {
                id: 3,
                name: 'Machinery Masters',
                phone: '+92 300 3456789',
                email: 'info@machinerymasters.pk',
                address: 'Engineering Complex, Main Boulevard',
                city: 'Lahore',
                province: 'Punjab',
                country: 'Pakistan',
                supplier_type: 'equipment',
                payment_terms: 'Advance Payment',
                credit_limit: 1000000.00,
                status: 'active',
                created_at: '10/03/2023',
                updated_at: '10/03/2023'
            },
            {
                id: 4,
                name: 'Premium Raw Materials',
                phone: '+92 300 4567890',
                email: 'orders@premiumraw.com',
                address: 'Industrial Zone, Sector 15',
                city: 'Rawalpindi',
                province: 'Punjab',
                country: 'Pakistan',
                supplier_type: 'plastic_pallets',
                payment_terms: 'Net 15 Days',
                credit_limit: 300000.00,
                status: 'active',
                created_at: '01/02/2023',
                updated_at: '15/04/2023'
            },
            {
                id: 5,
                name: 'Global Trade Solutions',
                phone: '+92 300 5678901',
                email: 'contact@globaltrade.pk',
                address: 'Trade Center, Floor 3',
                city: 'Islamabad',
                province: 'Islamabad',
                country: 'Pakistan',
                supplier_type: 'other',
                payment_terms: 'Net 45 Days',
                credit_limit: 150000.00,
                status: 'inactive',
                created_at: '15/12/2022',
                updated_at: '20/12/2022'
            },
            {
                id: 6,
                name: 'Elite Chemical Industries',
                phone: '+92 300 6789012',
                email: 'sales@elitechem.com',
                address: 'Chemical Park, Block B',
                city: 'Multan',
                province: 'Punjab',
                country: 'Pakistan',
                supplier_type: 'ingredients',
                payment_terms: 'Net 30 Days',
                credit_limit: 400000.00,
                status: 'active',
                created_at: '05/03/2023',
                updated_at: '05/03/2023'
            },
            {
                id: 7,
                name: 'Modern Equipment Co.',
                phone: '+92 300 7890123',
                email: 'info@moderneq.pk',
                address: 'Tech Valley, Main Road',
                city: 'Peshawar',
                province: 'KPK',
                country: 'Pakistan',
                supplier_type: 'equipment',
                payment_terms: 'Advance Payment',
                credit_limit: 800000.00,
                status: 'active',
                created_at: '12/01/2023',
                updated_at: '12/01/2023'
            },
            {
                id: 8,
                name: 'Plastic World Suppliers',
                phone: '+92 300 8901234',
                email: 'orders@plasticworld.com',
                address: 'Plastic Market, Shop 45',
                city: 'Sialkot',
                province: 'Punjab',
                country: 'Pakistan',
                supplier_type: 'plastic_pallets',
                payment_terms: 'Cash on Delivery',
                credit_limit: 250000.00,
                status: 'active',
                created_at: '20/02/2023',
                updated_at: '20/02/2023'
            },
            {
                id: 9,
                name: 'Chemical Solutions Ltd',
                phone: '+92 300 9012345',
                email: 'contact@chemsolutions.pk',
                address: 'Industrial Estate, Plot 12',
                city: 'Gujranwala',
                province: 'Punjab',
                country: 'Pakistan',
                supplier_type: 'ingredients',
                payment_terms: 'Net 30 Days',
                credit_limit: 350000.00,
                status: 'active',
                created_at: '01/04/2023',
                updated_at: '01/04/2023'
            },
            {
                id: 10,
                name: 'Universal Trading Co.',
                phone: '+92 300 0123456',
                email: 'info@universaltrading.com',
                address: 'Commercial Area, Building 7',
                city: 'Hyderabad',
                province: 'Sindh',
                country: 'Pakistan',
                supplier_type: 'other',
                payment_terms: 'Net 15 Days',
                credit_limit: 180000.00,
                status: 'active',
                created_at: '15/04/2023',
                updated_at: '15/04/2023'
            }
        ])
    }, []);

    // Action handlers
    const handleEdit = (supplier) => {
        console.log('Edit supplier:', supplier.id);
        // Add your edit logic here
    };


    const handleDelete = (supplier) => {
        console.log('Delete supplier:', supplier.id);
        // Add your delete logic here
    };

    // Define columns for react-data-table-component
    const columns = [
        {
            name: 'Supplier ID',
            selector: row => row.id,
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
            name: 'City',
            selector: row => row.city,
            sortable: true,
            width: '130px',
        },
        {
            name: 'Supplier Type',
            selector: row => row.supplier_type,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Payment Terms',
            cell: row => (
                <div className="text-sm">
                    <span className="text-[var(--info)] font-medium">
                        {row.payment_terms}
                    </span>
                </div>
            ),
            width: '150px',
        },
        {
            name: 'Credit Limit',
            cell: row => (
                <div className="fs_14">
                    <span className="text-[var(--success)] whitespace-nowrap font-medium">
                        Rs {row.credit_limit.toLocaleString()}
                    </span>
                </div>
            ),
            sortable: true,
            width: '110px',
        },
        {
            name: 'Status',
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${row.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
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
                        title="Edit Supplier"
                    >
                        <RiEditLine className='text-white'/>
                    </button>

                    {/* Delete Button */}
                    <button
                        className="flex bg-red-500 items-center justify-center p-[7px] w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-400 rounded-md transition-all duration-200"
                        onClick={() => handleDelete(row)}
                        title="Delete Supplier"
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
                        <h2 className="text-2xl font-bold text-gray-900">Supplier Management</h2>
                        <p className="text-gray-600">Manage and Update your Suppliers here</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-transparent">
                {SupplierData && (
                    <DataTable
                        columns={columns}
                        data={SupplierData}
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
                                <p className="text-gray-500">No suppliers found</p>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default SupplierList;