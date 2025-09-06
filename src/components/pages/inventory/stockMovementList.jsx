import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Pagination from '../../../utils/pagination'; // Import the separate Pagination component
import { RiSearchLine, RiFilterLine, RiDownloadLine } from '@remixicon/react';

const StockMovementList = () => {
    const [StockMovementData, setStockMovementData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

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
        setStockMovementData([
            {
                id: 1,
                movement_number: 'SM-2025-001',
                product_name: 'Plastic Pallets - Type A',
                product_code: 'RM001',
                movement_type: 'purchase_receipt',
                reference_type: 'purchase_receipt',
                reference_document: 'PO-2025-001',
                quantity: 2000.000,
                unit_cost: 25.00,
                total_value: 50000.00,
                movement_date: '10/09/2025',
                shift: null,
                operator_name: 'Warehouse Manager',
                notes: 'Purchase receipt - Plastic Pallets Type A',
                created_at: '10/09/2025 14:30'
            },
            {
                id: 2,
                movement_number: 'SM-2025-002',
                product_name: 'Plastic Pallets - Type A',
                product_code: 'RM001',
                movement_type: 'production_consumption',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-001',
                quantity: -200.000,
                unit_cost: 25.00,
                total_value: -5000.00,
                movement_date: '11/09/2025',
                shift: 'morning',
                operator_name: 'Ahmad Ali',
                notes: 'Raw material consumption for Jali Bags production',
                created_at: '11/09/2025 09:15'
            },
            {
                id: 3,
                movement_number: 'SM-2025-003',
                product_name: 'Jali Bags - Small',
                product_code: 'FG001',
                movement_type: 'production_output',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-001',
                quantity: 1000.000,
                unit_cost: 8.50,
                total_value: 8500.00,
                movement_date: '11/09/2025',
                shift: 'morning',
                operator_name: 'Production Supervisor',
                notes: 'Finished goods production - Jali Bags Small',
                created_at: '11/09/2025 16:45'
            },
            {
                id: 4,
                movement_number: 'SM-2025-004',
                product_name: 'Jali Bags - Small',
                product_code: 'FG001',
                movement_type: 'sales_delivery',
                reference_type: 'sales_delivery',
                reference_document: 'SO-2025-001',
                quantity: -500.000,
                unit_cost: 8.50,
                total_value: -4250.00,
                movement_date: '12/09/2025',
                shift: 'morning',
                operator_name: 'Hassan Khan',
                notes: 'Customer delivery to ABC Traders',
                created_at: '12/09/2025 10:20'
            },
            {
                id: 5,
                movement_number: 'SM-2025-005',
                product_name: 'Color Masterbatch',
                product_code: 'RM003',
                movement_type: 'purchase_receipt',
                reference_type: 'purchase_receipt',
                reference_document: 'PO-2025-002',
                quantity: 100.000,
                unit_cost: 150.00,
                total_value: 15000.00,
                movement_date: '13/09/2025',
                shift: null,
                operator_name: 'Warehouse Manager',
                notes: 'Purchase receipt - Color Masterbatch',
                created_at: '13/09/2025 11:30'
            },
            {
                id: 6,
                movement_number: 'SM-2025-006',
                product_name: 'Plastic Scraps',
                product_code: 'WS001',
                movement_type: 'waste_generation',
                reference_type: 'waste_record',
                reference_document: 'WG-2025-001',
                quantity: 50.000,
                unit_cost: 0.00,
                total_value: 0.00,
                movement_date: '13/09/2025',
                shift: 'evening',
                operator_name: 'Quality Inspector',
                notes: 'Waste generation from production defects',
                created_at: '13/09/2025 18:15'
            },
            {
                id: 7,
                movement_number: 'SM-2025-007',
                product_name: 'Plastic Bags - 2kg',
                product_code: 'FG004',
                movement_type: 'production_output',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-002',
                quantity: 2000.000,
                unit_cost: 5.25,
                total_value: 10500.00,
                movement_date: '14/09/2025',
                shift: 'evening',
                operator_name: 'Production Operator',
                notes: 'Finished goods production - Plastic Bags 2kg',
                created_at: '14/09/2025 20:30'
            },
            {
                id: 8,
                movement_number: 'SM-2025-008',
                product_name: 'Stabilizer',
                product_code: 'RM004',
                movement_type: 'production_consumption',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-002',
                quantity: -25.000,
                unit_cost: 200.00,
                total_value: -5000.00,
                movement_date: '14/09/2025',
                shift: 'evening',
                operator_name: 'Production Operator',
                notes: 'Stabilizer consumption for plastic bag production',
                created_at: '14/09/2025 19:00'
            },
            {
                id: 9,
                movement_number: 'SM-2025-009',
                product_name: 'Recycled Plastic Pellets',
                product_code: 'RC001',
                movement_type: 'recycling_output',
                reference_type: 'recycling_operation',
                reference_document: 'RC-2025-001',
                quantity: 80.000,
                unit_cost: 15.00,
                total_value: 1200.00,
                movement_date: '15/09/2025',
                shift: 'morning',
                operator_name: 'Recycling Operator',
                notes: 'Recycled material output from plastic scraps',
                created_at: '15/09/2025 12:45'
            },
            {
                id: 10,
                movement_number: 'SM-2025-010',
                product_name: 'Jali Bags - Medium',
                product_code: 'FG002',
                movement_type: 'adjustment',
                reference_type: 'stock_adjustment',
                reference_document: 'ADJ-2025-001',
                quantity: -10.000,
                unit_cost: 12.00,
                total_value: -120.00,
                movement_date: '16/09/2025',
                shift: null,
                operator_name: 'Inventory Manager',
                notes: 'Stock adjustment - damaged during handling',
                created_at: '16/09/2025 15:20'
            },
            {
                id: 11,
                movement_number: 'SM-2025-011',
                product_name: 'Plastic Pallets - Type B',
                product_code: 'RM002',
                movement_type: 'purchase_receipt',
                reference_type: 'purchase_receipt',
                reference_document: 'PO-2025-003',
                quantity: 1500.000,
                unit_cost: 22.00,
                total_value: 33000.00,
                movement_date: '17/09/2025',
                shift: null,
                operator_name: 'Warehouse Manager',
                notes: 'Purchase receipt - Plastic Pallets Type B',
                created_at: '17/09/2025 13:10'
            },
            {
                id: 12,
                movement_number: 'SM-2025-012',
                product_name: 'Anti-static Agent',
                product_code: 'RM005',
                movement_type: 'production_consumption',
                reference_type: 'production_order',
                reference_document: 'PRD-2025-003',
                quantity: -5.000,
                unit_cost: 500.00,
                total_value: -2500.00,
                movement_date: '18/09/2025',
                shift: 'night',
                operator_name: 'Night Supervisor',
                notes: 'Anti-static agent consumption for special order',
                created_at: '18/09/2025 02:30'
            }
        ]);
    }, []);

    // Update filtered data when stock movement data or filters change
    useEffect(() => {
        if (!StockMovementData) return;

        let filtered = StockMovementData;

        // Apply movement type filter
        if (filterType !== 'all') {
            filtered = filtered.filter(item => item.movement_type === filterType);
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.movement_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.reference_document.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.operator_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [StockMovementData, filterType, searchTerm]);

    // Movement type color helper
    const getMovementTypeColor = (type) => {
        switch (type) {
            case 'purchase_receipt':
                return 'bg-green-100 text-green-800';
            case 'production_consumption':
                return 'bg-red-100 text-red-800';
            case 'production_output':
                return 'bg-blue-100 text-blue-800';
            case 'sales_delivery':
                return 'bg-orange-100 text-orange-800';
            case 'waste_generation':
                return 'bg-gray-100 text-gray-800';
            case 'recycling_input':
                return 'bg-purple-100 text-purple-800';
            case 'recycling_output':
                return 'bg-indigo-100 text-indigo-800';
            case 'adjustment':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Format movement type for display
    const formatMovementType = (type) => {
        return type.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Define columns for react-data-table-component
    const columns = [
        {
            name: 'Movement #',
            selector: row => row.movement_number,
            sortable: true,
            width: '130px',
            wrap: true,
        },
        {
            name: 'Product',
            cell: row => (
                <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate">{row.product_name}</div>
                    <div className="text-sm text-gray-500">{row.product_code}</div>
                </div>
            ),
            sortable: true,
            width: '160px',
            wrap: true,
        },
        {
            name: 'Type',
            cell: row => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getMovementTypeColor(row.movement_type)}`}>
                    {formatMovementType(row.movement_type).length > 15 
                        ? formatMovementType(row.movement_type).split(' ')[0] 
                        : formatMovementType(row.movement_type)
                    }
                </span>
            ),
            sortable: true,
            width: '120px',
        },
        {
            name: 'Qty',
            cell: row => (
                <div className="text-center">
                    <span className={`font-bold text-sm ${row.quantity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {row.quantity >= 0 ? '+' : ''}{Math.abs(row.quantity) >= 1000 
                            ? (Math.abs(row.quantity) / 1000).toFixed(1) + 'k'
                            : row.quantity.toLocaleString()
                        }
                    </span>
                </div>
            ),
            sortable: true,
            width: '80px',
        },
        {
            name: 'Value',
            cell: row => (
                <div className="text-right">
                    <span className={`font-medium text-sm ${row.total_value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {row.total_value >= 0 ? '+' : ''}Rs {Math.abs(row.total_value) >= 10000 
                            ? (Math.abs(row.total_value) / 1000).toFixed(0) + 'k'
                            : Math.abs(row.total_value).toLocaleString()
                        }
                    </span>
                </div>
            ),
            sortable: true,
            width: '90px',
            omit: window.innerWidth < 768,
        },
        {
            name: 'Ref',
            selector: row => row.reference_document,
            sortable: true,
            width: '100px',
            omit: window.innerWidth < 1024,
        },
        {
            name: 'Date',
            cell: row => (
                <div className="text-sm">
                    {row.movement_date.split('/').slice(0, 2).join('/')}
                </div>
            ),
            sortable: true,
            width: '80px',
        },
        {
            name: 'Shift',
            cell: row => (
                <span className={`px-2 py-1 rounded text-xs ${
                    row.shift === 'morning' ? 'bg-yellow-100 text-yellow-800' :
                    row.shift === 'evening' ? 'bg-orange-100 text-orange-800' :
                    row.shift === 'night' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-gray-100 text-gray-600'
                }`}>
                    {row.shift ? row.shift.charAt(0).toUpperCase() : 'N/A'}
                </span>
            ),
            width: '70px',
            omit: window.innerWidth < 1024,
        },
        {
            name: 'Operator',
            cell: row => (
                <div className="text-sm truncate max-w-24" title={row.operator_name}>
                    {row.operator_name.split(' ')[0]}
                </div>
            ),
            sortable: true,
            width: '100px',
            omit: window.innerWidth < 768,
        },
        {
            name: 'Notes',
            cell: row => (
                <div className="max-w-32">
                    <span className="text-xs text-gray-600 truncate block" title={row.notes}>
                        {row.notes.length > 30 ? row.notes.substring(0, 30) + '...' : row.notes}
                    </span>
                </div>
            ),
            width: '130px',
            omit: window.innerWidth < 1200,
        },
    ];

    return (
        <div className='p-5'>
            <div className="py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Stock Movement History</h2>
                            <p className="text-gray-600">Track all inventory movements and transactions</p>
                        </div>
                    </div>
                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-sm"
                    >
                        <RiDownloadLine size={20} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by movement #, product, code, reference..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Movement Type Filter */}
                    <div className="relative">
                        <RiFilterLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Movement Types</option>
                            <option value="purchase_receipt">Purchase Receipt</option>
                            <option value="production_consumption">Production Consumption</option>
                            <option value="production_output">Production Output</option>
                            <option value="sales_delivery">Sales Delivery</option>
                            <option value="waste_generation">Waste Generation</option>
                            <option value="recycling_input">Recycling Input</option>
                            <option value="recycling_output">Recycling Output</option>
                            <option value="adjustment">Stock Adjustment</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="bg-transparent">
                {filteredData && (
                    <DataTable
                        columns={columns}
                        data={filteredData}
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
                                <p className="text-gray-500">No stock movements found</p>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default StockMovementList;