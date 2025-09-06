import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Pagination from '../../../utils/pagination'; // Import the separate Pagination component
import { RiDeleteBinLine, RiEditLine, RiAddLine } from '@remixicon/react';
import AddQualityCheck from './addQualityCheck';

const QualityCheckList = () => {
    const [QualityCheckData, setQualityCheckData] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

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
        setQualityCheckData([
            {
                id: 1,
                check_number: 'QC-2025-090601',
                check_type: 'incoming_material',
                reference_type: 'purchase_receipt',
                reference_document: 'PO-2025-001',
                product_name: 'Plastic Pallets - Type A',
                checked_quantity: 2000.000,
                passed_quantity: 1950.000,
                failed_quantity: 50.000,
                check_date: '10/09/2025',
                checked_by: 'Ahmed Khan',
                overall_grade: 'A',
                pass_rate: 97.5,
                remarks: 'Minor color variations detected in small batch',
                created_at: '10/09/2025'
            },
            {
                id: 2,
                check_number: 'QC-2025-090602',
                check_type: 'finished_goods',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-001',
                product_name: 'Jali Bags - Small',
                checked_quantity: 1000.000,
                passed_quantity: 980.000,
                failed_quantity: 20.000,
                check_date: '11/09/2025',
                checked_by: 'Fatima Ali',
                overall_grade: 'A',
                pass_rate: 98.0,
                remarks: 'Excellent quality, minor stitching issues',
                created_at: '11/09/2025'
            },
            {
                id: 3,
                check_number: 'QC-2025-090603',
                check_type: 'in_process',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-002',
                product_name: 'Plastic Bags - 2kg',
                checked_quantity: 500.000,
                passed_quantity: 450.000,
                failed_quantity: 50.000,
                check_date: '12/09/2025',
                checked_by: 'Muhammad Hassan',
                overall_grade: 'B',
                pass_rate: 90.0,
                remarks: 'Thickness variations noted, adjusting machine settings',
                created_at: '12/09/2025'
            },
            {
                id: 4,
                check_number: 'QC-2025-090604',
                check_type: 'incoming_material',
                reference_type: 'purchase_receipt',
                reference_document: 'PO-2025-002',
                product_name: 'Color Masterbatch',
                checked_quantity: 100.000,
                passed_quantity: 95.000,
                failed_quantity: 5.000,
                check_date: '13/09/2025',
                checked_by: 'Ahmed Khan',
                overall_grade: 'A',
                pass_rate: 95.0,
                remarks: 'Color consistency good, moisture content acceptable',
                created_at: '13/09/2025'
            },
            {
                id: 5,
                check_number: 'QC-2025-090605',
                check_type: 'finished_goods',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-003',
                product_name: 'Jali Bags - Medium',
                checked_quantity: 800.000,
                passed_quantity: 720.000,
                failed_quantity: 80.000,
                check_date: '14/09/2025',
                checked_by: 'Fatima Ali',
                overall_grade: 'B',
                pass_rate: 90.0,
                remarks: 'Mesh density issues in some batches',
                created_at: '14/09/2025'
            },
            {
                id: 6,
                check_number: 'QC-2025-090606',
                check_type: 'waste_material',
                reference_type: 'waste_generation',
                reference_document: 'WG-2025-001',
                product_name: 'Plastic Scraps',
                checked_quantity: 150.000,
                passed_quantity: 120.000,
                failed_quantity: 30.000,
                check_date: '15/09/2025',
                checked_by: 'Muhammad Hassan',
                overall_grade: 'B',
                pass_rate: 80.0,
                remarks: 'Recyclable material separated successfully',
                created_at: '15/09/2025'
            },
            {
                id: 7,
                check_number: 'QC-2025-090607',
                check_type: 'incoming_material',
                reference_type: 'purchase_receipt',
                reference_document: 'PO-2025-003',
                product_name: 'Stabilizer',
                checked_quantity: 50.000,
                passed_quantity: 48.000,
                failed_quantity: 2.000,
                check_date: '16/09/2025',
                checked_by: 'Ahmed Khan',
                overall_grade: 'A',
                pass_rate: 96.0,
                remarks: 'Chemical composition within specifications',
                created_at: '16/09/2025'
            },
            {
                id: 8,
                check_number: 'QC-2025-090608',
                check_type: 'finished_goods',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-004',
                product_name: 'Plastic Bags - 5kg',
                checked_quantity: 600.000,
                passed_quantity: 540.000,
                failed_quantity: 60.000,
                check_date: '17/09/2025',
                checked_by: 'Fatima Ali',
                overall_grade: 'B',
                pass_rate: 90.0,
                remarks: 'Seal strength adequate, minor surface defects',
                created_at: '17/09/2025'
            },
            {
                id: 9,
                check_number: 'QC-2025-090609',
                check_type: 'in_process',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-005',
                product_name: 'Jali Bags - Large',
                checked_quantity: 300.000,
                passed_quantity: 285.000,
                failed_quantity: 15.000,
                check_date: '18/09/2025',
                checked_by: 'Muhammad Hassan',
                overall_grade: 'A',
                pass_rate: 95.0,
                remarks: 'Production process stable, good quality output',
                created_at: '18/09/2025'
            },
            {
                id: 10,
                check_number: 'QC-2025-090610',
                check_type: 'incoming_material',
                reference_type: 'purchase_receipt',
                reference_document: 'PO-2025-004',
                product_name: 'Anti-static Agent',
                checked_quantity: 25.000,
                passed_quantity: 20.000,
                failed_quantity: 5.000,
                check_date: '19/09/2025',
                checked_by: 'Ahmed Khan',
                overall_grade: 'C',
                pass_rate: 80.0,
                remarks: 'Some batches below specification, supplier contacted',
                created_at: '19/09/2025'
            }
        ]);
    }, []);

    // Action handlers
    const handleEdit = (qualityCheck) => {
        console.log('Edit quality check:', qualityCheck.id);
        // Add your edit logic here
    };

    const handleDelete = (qualityCheck) => {
        console.log('Delete quality check:', qualityCheck.id);
        // Add your delete logic here
    };

    const handleAddQualityCheck = () => {
        setShowAddForm(true);
    };

    const handleCloseAddForm = () => {
        setShowAddForm(false);
    };

    // Status color helpers
    const getCheckTypeColor = (type) => {
        switch (type) {
            case 'incoming_material':
                return 'bg-blue-100 text-blue-800';
            case 'in_process':
                return 'bg-yellow-100 text-yellow-800';
            case 'finished_goods':
                return 'bg-green-100 text-green-800';
            case 'waste_material':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getGradeColor = (grade) => {
        switch (grade) {
            case 'A':
                return 'bg-green-100 text-green-800';
            case 'B':
                return 'bg-yellow-100 text-yellow-800';
            case 'C':
                return 'bg-orange-100 text-orange-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPassRateColor = (passRate) => {
        if (passRate >= 95) return 'text-green-600';
        if (passRate >= 85) return 'text-yellow-600';
        if (passRate >= 75) return 'text-orange-600';
        return 'text-red-600';
    };

    // Define columns for react-data-table-component
    const columns = [
        {
            name: 'Check ID',
            selector: row => row.id,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Check Number',
            selector: row => row.check_number,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Check Type',
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getCheckTypeColor(row.check_type)}`}>
                    {row.check_type.replace('_', ' ').charAt(0).toUpperCase() + row.check_type.replace('_', ' ').slice(1)}
                </span>
            ),
            width: '140px',
        },
        {
            name: 'Product/Material',
            selector: row => row.product_name,
            sortable: true,
            width: '180px',
        },
        {
            name: 'Reference',
            selector: row => row.reference_document,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Check Date',
            selector: row => row.check_date,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Checked Qty',
            cell: row => (
                <div className="fs_14">
                    <span className="text-gray-700 whitespace-nowrap font-medium">
                        {row.checked_quantity.toLocaleString()}
                    </span>
                </div>
            ),
            sortable: true,
            width: '110px',
        },
        {
            name: 'Pass Rate',
            cell: row => (
                <div className="fs_14">
                    <span className={`whitespace-nowrap font-bold ${getPassRateColor(row.pass_rate)}`}>
                        {row.pass_rate.toFixed(1)}%
                    </span>
                </div>
            ),
            sortable: true,
            width: '100px',
        },
        {
            name: 'Grade',
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getGradeColor(row.overall_grade)}`}>
                    Grade {row.overall_grade}
                </span>
            ),
            width: '100px',
        },
        {
            name: 'Checked By',
            selector: row => row.checked_by,
            sortable: true,
            width: '140px',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex items-center gap-1">
                    {/* Edit Button */}
                    <button
                        className="flex bg-blue-500 items-center justify-center p-[7px] w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-400 rounded-md transition-all duration-200"
                        onClick={() => handleEdit(row)}
                        title="Edit Quality Check"
                    >
                        <RiEditLine className='text-white'/>
                    </button>

                    {/* Delete Button */}
                    <button
                        className="flex bg-red-500 items-center justify-center p-[7px] w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-400 rounded-md transition-all duration-200"
                        onClick={() => handleDelete(row)}
                        title="Delete Quality Check"
                    >
                        <RiDeleteBinLine className='text-white'/>
                    </button>
                </div>
            ),
            width: '120px',
            ignoreRowClick: true,
        },
    ];

    // If add form is shown, render it instead of the list
    if (showAddForm) {
        return <AddQualityCheck onClose={handleCloseAddForm} />;
    }

    return (
        <div className='p-5'>
            <div className="py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Quality Check Management</h2>
                            <p className="text-gray-600">Manage and Track Quality Inspections and Test Results</p>
                        </div>
                    </div>
                    <button
                        onClick={handleAddQualityCheck}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                    >
                        <RiAddLine size={20} />
                        Add Quality Check
                    </button>
                </div>
            </div>
            
            <div className="bg-transparent">
                {QualityCheckData && (
                    <DataTable
                        columns={columns}
                        data={QualityCheckData}
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
                                <p className="text-gray-500">No quality checks found</p>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default QualityCheckList;