import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Pagination from '../../../utils/pagination'; // Import the separate Pagination component
import { RiSearchLine, RiFilterLine, RiDownloadLine, RiAlertLine } from '@remixicon/react';

const InventoryList = () => {
    const [InventoryData, setInventoryData] = useState(null);
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
        setInventoryData([
            {
                id: 1,
                product_type: 'raw_material',
                product_name: 'Plastic Pallets - Type A',
                product_code: 'RM001',
                unit_of_measure: 'kg',
                current_stock: 1800.000,
                reserved_stock: 300.000,
                available_stock: 1500.000,
                minimum_stock_level: 1000,
                maximum_stock_level: 5000,
                standard_cost: 25.00,
                total_value: 45000.00,
                last_updated: '18/09/2025 14:30',
                status: 'normal'
            },
            {
                id: 2,
                product_type: 'raw_material',
                product_name: 'Plastic Pallets - Type B',
                product_code: 'RM002',
                unit_of_measure: 'kg',
                current_stock: 800.000,
                reserved_stock: 200.000,
                available_stock: 600.000,
                minimum_stock_level: 500,
                maximum_stock_level: 3000,
                standard_cost: 22.00,
                total_value: 17600.00,
                last_updated: '17/09/2025 16:45',
                status: 'normal'
            },
            {
                id: 3,
                product_type: 'raw_material',
                product_name: 'Color Masterbatch',
                product_code: 'RM003',
                unit_of_measure: 'kg',
                current_stock: 95.000,
                reserved_stock: 15.000,
                available_stock: 80.000,
                minimum_stock_level: 50,
                maximum_stock_level: 200,
                standard_cost: 150.00,
                total_value: 14250.00,
                last_updated: '16/09/2025 11:20',
                status: 'normal'
            },
            {
                id: 4,
                product_type: 'raw_material',
                product_name: 'Stabilizer',
                product_code: 'RM004',
                unit_of_measure: 'kg',
                current_stock: 20.000,
                reserved_stock: 5.000,
                available_stock: 15.000,
                minimum_stock_level: 25,
                maximum_stock_level: 100,
                standard_cost: 200.00,
                total_value: 4000.00,
                last_updated: '18/09/2025 02:30',
                status: 'low_stock'
            },
            {
                id: 5,
                product_type: 'raw_material',
                product_name: 'Anti-static Agent',
                product_code: 'RM005',
                unit_of_measure: 'kg',
                current_stock: 5.000,
                reserved_stock: 2.000,
                available_stock: 3.000,
                minimum_stock_level: 10,
                maximum_stock_level: 50,
                standard_cost: 500.00,
                total_value: 2500.00,
                last_updated: '18/09/2025 02:30',
                status: 'critical'
            },
            {
                id: 6,
                product_type: 'finished_product',
                product_name: 'Jali Bags - Small',
                product_code: 'FG001',
                unit_of_measure: 'pieces',
                current_stock: 1500.000,
                reserved_stock: 500.000,
                available_stock: 1000.000,
                minimum_stock_level: 500,
                maximum_stock_level: 3000,
                standard_cost: 8.50,
                total_value: 12750.00,
                last_updated: '17/09/2025 20:15',
                status: 'normal'
            },
            {
                id: 7,
                product_type: 'finished_product',
                product_name: 'Jali Bags - Medium',
                product_code: 'FG002',
                unit_of_measure: 'pieces',
                current_stock: 290.000,
                reserved_stock: 100.000,
                available_stock: 190.000,
                minimum_stock_level: 300,
                maximum_stock_level: 1500,
                standard_cost: 12.00,
                total_value: 3480.00,
                last_updated: '16/09/2025 15:20',
                status: 'low_stock'
            },
            {
                id: 8,
                product_type: 'finished_product',
                product_name: 'Jali Bags - Large',
                product_code: 'FG003',
                unit_of_measure: 'pieces',
                current_stock: 285.000,
                reserved_stock: 85.000,
                available_stock: 200.000,
                minimum_stock_level: 200,
                maximum_stock_level: 1000,
                standard_cost: 15.00,
                total_value: 4275.00,
                last_updated: '18/09/2025 12:45',
                status: 'normal'
            },
            {
                id: 9,
                product_type: 'finished_product',
                product_name: 'Plastic Bags - 2kg',
                product_code: 'FG004',
                unit_of_measure: 'pieces',
                current_stock: 1500.000,
                reserved_stock: 800.000,
                available_stock: 700.000,
                minimum_stock_level: 1000,
                maximum_stock_level: 5000,
                standard_cost: 5.25,
                total_value: 7875.00,
                last_updated: '14/09/2025 20:30',
                status: 'normal'
            },
            {
                id: 10,
                product_type: 'finished_product',
                product_name: 'Plastic Bags - 5kg',
                product_code: 'FG005',
                unit_of_measure: 'pieces',
                current_stock: 150.000,
                reserved_stock: 100.000,
                available_stock: 50.000,
                minimum_stock_level: 800,
                maximum_stock_level: 3000,
                standard_cost: 8.75,
                total_value: 1312.50,
                last_updated: '15/09/2025 18:45',
                status: 'critical'
            },
            {
                id: 11,
                product_type: 'waste_material',
                product_name: 'Plastic Scraps',
                product_code: 'WS001',
                unit_of_measure: 'kg',
                current_stock: 120.000,
                reserved_stock: 0.000,
                available_stock: 120.000,
                minimum_stock_level: 0,
                maximum_stock_level: 500,
                standard_cost: 0.00,
                total_value: 0.00,
                last_updated: '15/09/2025 12:45',
                status: 'normal'
            },
            {
                id: 12,
                product_type: 'waste_material',
                product_name: 'Defective Bags',
                product_code: 'WS002',
                unit_of_measure: 'pieces',
                current_stock: 45.000,
                reserved_stock: 0.000,
                available_stock: 45.000,
                minimum_stock_level: 0,
                maximum_stock_level: 100,
                standard_cost: 0.00,
                total_value: 0.00,
                last_updated: '17/09/2025 14:20',
                status: 'normal'
            }
        ]);
    }, []);

    // Update filtered data when inventory data or filters change
    useEffect(() => {
        if (!InventoryData) return;

        let filtered = InventoryData;

        // Apply product type filter
        if (filterType !== 'all') {
            filtered = filtered.filter(item => item.product_type === filterType);
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product_code.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [InventoryData, filterType, searchTerm]);

    // Stock status color helper
    const getStockStatusColor = (status) => {
        switch (status) {
            case 'critical':
                return 'bg-red-100 text-red-800';
            case 'low_stock':
                return 'bg-yellow-100 text-yellow-800';
            case 'normal':
                return 'bg-green-100 text-green-800';
            case 'overstock':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Product type color helper
    const getProductTypeColor = (type) => {
        switch (type) {
            case 'raw_material':
                return 'bg-blue-100 text-blue-800';
            case 'finished_product':
                return 'bg-green-100 text-green-800';
            case 'waste_material':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Format product type for display
    const formatProductType = (type) => {
        return type.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Calculate stock level percentage
    const getStockPercentage = (current, minimum, maximum) => {
        if (maximum === 0) return 0;
        return Math.min(100, (current / maximum) * 100);
    };

    // Define columns for react-data-table-component
    const columns = [
        {
            name: 'Product',
            cell: row => (
                <div>
                    <div className="font-medium text-gray-900">{row.product_name}</div>
                    <div className="text-sm text-gray-500">{row.product_code}</div>
                </div>
            ),
            sortable: true,
            width: '200px',
        },
        {
            name: 'Type',
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getProductTypeColor(row.product_type)}`}>
                    {formatProductType(row.product_type)}
                </span>
            ),
            sortable: true,
            width: '140px',
        },
        {
            name: 'Current Stock',
            cell: row => (
                <div className="text-center">
                    <div className="font-bold text-gray-900">
                        {row.current_stock.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                        {row.unit_of_measure}
                    </div>
                </div>
            ),
            sortable: true,
            width: '120px',
        },
        {
            name: 'Reserved',
            cell: row => (
                <div className="text-center">
                    <div className="font-medium text-orange-600">
                        {row.reserved_stock.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                        {row.unit_of_measure}
                    </div>
                </div>
            ),
            sortable: true,
            width: '100px',
        },
        {
            name: 'Available',
            cell: row => (
                <div className="text-center">
                    <div className="font-bold text-green-600">
                        {row.available_stock.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                        {row.unit_of_measure}
                    </div>
                </div>
            ),
            sortable: true,
            width: '100px',
        },
        {
            name: 'Stock Level',
            cell: row => (
                <div className="w-full">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Min: {row.minimum_stock_level}</span>
                        <span>Max: {row.maximum_stock_level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full ${
                                row.current_stock < row.minimum_stock_level ? 'bg-red-500' :
                                row.current_stock <= row.minimum_stock_level * 1.2 ? 'bg-yellow-500' :
                                'bg-green-500'
                            }`}
                            style={{ 
                                width: `${Math.min(100, Math.max(5, getStockPercentage(row.current_stock, row.minimum_stock_level, row.maximum_stock_level)))}%` 
                            }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                        {getStockPercentage(row.current_stock, row.minimum_stock_level, row.maximum_stock_level).toFixed(0)}%
                    </div>
                </div>
            ),
            width: '150px',
        },
        {
            name: 'Value (PKR)',
            cell: row => (
                <div className="text-right">
                    <div className="font-medium text-gray-900">
                        Rs {row.total_value.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                        @ Rs {row.standard_cost}/unit
                    </div>
                </div>
            ),
            sortable: true,
            width: '130px',
        },
        {
            name: 'Status',
            cell: row => (
                <div className="flex items-center gap-2">
                    {row.status === 'critical' && <RiAlertLine className="text-red-500" size={16} />}
                    {row.status === 'low_stock' && <RiAlertLine className="text-yellow-500" size={16} />}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStockStatusColor(row.status)}`}>
                        {row.status === 'low_stock' ? 'Low Stock' : 
                         row.status === 'critical' ? 'Critical' :
                         row.status === 'overstock' ? 'Overstock' : 'Normal'}
                    </span>
                </div>
            ),
            width: '120px',
        },
        {
            name: 'Last Updated',
            cell: row => (
                <div className="text-sm text-gray-600">
                    {row.last_updated}
                </div>
            ),
            sortable: true,
            width: '140px',
        },
    ];

    // Calculate summary stats
    const summaryStats = filteredData ? {
        totalProducts: filteredData.length,
        totalValue: filteredData.reduce((sum, item) => sum + item.total_value, 0),
        lowStockItems: filteredData.filter(item => item.status === 'low_stock' || item.status === 'critical').length,
        criticalItems: filteredData.filter(item => item.status === 'critical').length
    } : { totalProducts: 0, totalValue: 0, lowStockItems: 0, criticalItems: 0 };

    return (
        <div className='p-5'>
            <div className="py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                            <p className="text-gray-600">Monitor stock levels and inventory status</p>
                        </div>
                    </div>
                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-sm"
                    >
                        <RiDownloadLine size={20} />
                        Export Inventory
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-sm text-gray-600">Total Products</div>
                    <div className="text-2xl font-bold text-gray-900">{summaryStats.totalProducts}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-sm text-gray-600">Total Value</div>
                    <div className="text-2xl font-bold text-green-600">Rs {summaryStats.totalValue.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-sm text-gray-600">Low Stock Items</div>
                    <div className="text-2xl font-bold text-yellow-600">{summaryStats.lowStockItems}</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-sm text-gray-600">Critical Items</div>
                    <div className="text-2xl font-bold text-red-600">{summaryStats.criticalItems}</div>
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
                            placeholder="Search by product name or code..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Product Type Filter */}
                    <div className="relative">
                        <RiFilterLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Product Types</option>
                            <option value="raw_material">Raw Materials</option>
                            <option value="finished_product">Finished Products</option>
                            <option value="waste_material">Waste Materials</option>
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
                                <p className="text-gray-500">No inventory items found</p>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default InventoryList;