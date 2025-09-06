import React, { useState, useEffect } from 'react';
import {
    RiCheckboxCircleLine,
    RiCalendarLine,
    RiFileTextLine,
    RiAddLine,
    RiDeleteBin6Line,
    RiFlaskLine,
    RiClipboardLine,
    RiAwardLine,
    RiBarChartLine
} from '@remixicon/react';
import Input from '../../../utils/input';
import Select from '../../../utils/select';
import RadioGroup from '../../../utils/radioGroup';
import Textarea from '../../../utils/textarea';


const AddQualityCheck = () => {
    const [formData, setFormData] = useState({
        check_number: '',
        check_type: 'incoming_material',
        reference_type: 'purchase_receipt',
        reference_id: '',
        purchase_detail_id: '',
        product_id: '',
        checked_quantity: '',
        passed_quantity: '',
        failed_quantity: '',
        check_date: new Date().toISOString().split('T')[0],
        checked_by: '',
        overall_grade: 'A',
        remarks: ''
    });

    const [qualityParameters, setQualityParameters] = useState([
        {
            parameter_name: '',
            expected_value: '',
            actual_value: '',
            unit: '',
            status: 'pass',
            remarks: ''
        }
    ]);

    // Mock data based on your database
    const checkTypeOptions = [
        { label: 'Incoming Material', value: 'incoming_material' },
        { label: 'In Process', value: 'in_process' },
        { label: 'Finished Goods', value: 'finished_goods' },
        { label: 'Waste Material', value: 'waste_material' }
    ];

    const referenceTypeOptions = [
        { label: 'Purchase Receipt', value: 'purchase_receipt' },
        { label: 'Production Order', value: 'production_order' },
        { label: 'Waste Generation', value: 'waste_generation' }
    ];

    const gradeOptions = [
        { label: 'Grade A', value: 'A' },
        { label: 'Grade B', value: 'B' },
        { label: 'Grade C', value: 'C' },
        { label: 'Rejected', value: 'Rejected' }
    ];

    const products = [
        { id: '1', name: 'Plastic Pallets - Type A', code: 'RM001' },
        { id: '2', name: 'Plastic Pallets - Type B', code: 'RM002' },
        { id: '3', name: 'Color Masterbatch', code: 'RM003' },
        { id: '4', name: 'Jali Bags - Small', code: 'FG001' },
        { id: '5', name: 'Jali Bags - Medium', code: 'FG002' }
    ];

    const purchaseReceipts = [
        { id: '1', name: 'PO-2025-001 - Pakistan Plastic Suppliers Ltd' },
        { id: '2', name: 'PO-2025-002 - Quality Chemical Co.' },
        { id: '3', name: 'PO-2025-003 - Premium Raw Materials' }
    ];

    const productionOrders = [
        { id: '1', name: 'PRD-2025-001 - Jali Bags Production' },
        { id: '2', name: 'PRD-2025-002 - Plastic Bags Production' },
        { id: '3', name: 'PRD-2025-003 - Custom Order Production' }
    ];

    const employees = [
        { id: '1', name: 'Ahmed Khan - Quality Inspector' },
        { id: '2', name: 'Fatima Ali - Senior QC Officer' },
        { id: '3', name: 'Muhammad Hassan - QC Supervisor' }
    ];

    // Auto-generate Quality Check Number
    useEffect(() => {
        const generateCheckNumber = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const timestamp = `${hours}${minutes}${seconds}`;
            return `QC-${year}-${month}${day}-${timestamp}`;
        };

        setFormData(prev => ({ ...prev, check_number: generateCheckNumber() }));
    }, []);

    // Calculate failed quantity when checked or passed quantity changes
    useEffect(() => {
        const checkedQty = parseFloat(formData.checked_quantity) || 0;
        const passedQty = parseFloat(formData.passed_quantity) || 0;
        const failedQty = Math.max(0, checkedQty - passedQty);

        setFormData(prev => ({
            ...prev,
            failed_quantity: failedQty.toString()
        }));
    }, [formData.checked_quantity, formData.passed_quantity]);

    const handleInputChange = (value, name) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption, fieldName) => {
        const value = typeof selectedOption === 'string' ? selectedOption : selectedOption?.id || '';
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleRadioChange = (value, fieldName) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    // Handle quality parameter changes
    const handleParameterChange = (index, field, value) => {
        const updatedParameters = [...qualityParameters];
        updatedParameters[index][field] = value;
        setQualityParameters(updatedParameters);
    };

    // Add new quality parameter
    const addQualityParameter = () => {
        setQualityParameters([...qualityParameters, {
            parameter_name: '',
            expected_value: '',
            actual_value: '',
            unit: '',
            status: 'pass',
            remarks: ''
        }]);
    };

    // Remove quality parameter
    const removeQualityParameter = (index) => {
        if (qualityParameters.length > 1) {
            const updatedParameters = qualityParameters.filter((_, i) => i !== index);
            setQualityParameters(updatedParameters);
        }
    };

    const handleSubmit = () => {
        const qualityCheckData = {
            ...formData,
            quality_parameters: qualityParameters.filter(param => param.parameter_name && param.expected_value)
        };

        console.log('Quality Check Data:', qualityCheckData);
        alert('Quality Check created successfully! Check console for data structure.');
    };

    const handleSaveDraft = () => {
        const draftData = {
            ...formData,
            quality_parameters: qualityParameters,
            status: 'draft'
        };

        console.log('Draft Quality Check:', draftData);
        alert('Quality Check saved as draft!');
    };

    const handleGenerateReport = () => {
        console.log('Generating Quality Report for:', formData.check_number);
        alert('Quality report generation feature would be implemented here!');
    };

    // Get reference options based on reference type
    const getReferenceOptions = () => {
        switch (formData.reference_type) {
            case 'purchase_receipt':
                return purchaseReceipts;
            case 'production_order':
                return productionOrders;
            default:
                return [];
        }
    };

    return (
        <div className='p-5 bg-gray-50 min-h-screen'>
            <div className="py-8 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3 px-8">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <RiFlaskLine className="text-blue-600" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Create Quality Check</h2>
                        <p className="text-gray-600">Perform quality inspection and record test results</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg mt-6">
                <div className="p-8">
                    {/* Quality Check Header */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <RiFileTextLine size={20} />
                            Quality Check Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Input
                                labels="Check Number"
                                placeholder="Auto-generated"
                                type="text"
                                icon={<RiFileTextLine className="text-gray-500" size={16} />}
                                value={formData.check_number}
                                onChange={handleInputChange}
                                name="check_number"
                                readonly={true}
                            />

                            <Select
                                labels="Check Type"
                                placeholder="Select check type"
                                options={checkTypeOptions}
                                value={checkTypeOptions.find(type => type.value === formData.check_type) || null}
                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'check_type')}
                                displayKey="label"
                                valueKey="value"
                            />

                            <Input
                                labels="Check Date"
                                type="date"
                                icon={<RiCalendarLine className="text-gray-500" size={16} />}
                                value={formData.check_date}
                                onChange={handleInputChange}
                                name="check_date"
                            />

                            <Select
                                labels="Reference Type"
                                placeholder="Select reference type"
                                options={referenceTypeOptions}
                                value={referenceTypeOptions.find(type => type.value === formData.reference_type) || null}
                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'reference_type')}
                                displayKey="label"
                                valueKey="value"
                            />

                            <Select
                                labels="Reference Document"
                                placeholder="Select reference document"
                                options={getReferenceOptions()}
                                value={getReferenceOptions().find(ref => ref.id === formData.reference_id) || null}
                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'reference_id')}
                                displayKey="name"
                                valueKey="id"
                            />

                            <Select
                                labels="Product/Material"
                                placeholder="Select product or material"
                                options={products}
                                value={products.find(product => product.id === formData.product_id) || null}
                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'product_id')}
                                displayKey="name"
                                valueKey="id"
                            />

                            <Select
                                labels="Checked By"
                                placeholder="Select quality inspector"
                                options={employees}
                                value={employees.find(emp => emp.id === formData.checked_by) || null}
                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'checked_by')}
                                displayKey="name"
                                valueKey="id"
                            />
                        </div>
                    </div>

                    {/* Quantity Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <RiBarChartLine size={20} />
                            Quantity Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input
                                labels="Checked Quantity"
                                placeholder="0.000"
                                type="number"
                                value={formData.checked_quantity}
                                onChange={handleInputChange}
                                name="checked_quantity"
                            />

                            <Input
                                labels="Passed Quantity"
                                placeholder="0.000"
                                type="number"
                                value={formData.passed_quantity}
                                onChange={handleInputChange}
                                name="passed_quantity"
                            />

                            <Input
                                labels="Failed Quantity"
                                placeholder="Auto-calculated"
                                type="number"
                                value={formData.failed_quantity}
                                readonly={true}
                                name="failed_quantity"
                            />
                        </div>
                    </div>

                    {/* Quality Parameters */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <RiClipboardLine size={20} />
                                Quality Parameters
                            </h3>
                            <button
                                type="button"
                                onClick={addQualityParameter}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                            >
                                <RiAddLine size={16} />
                                Add Parameter
                            </button>
                        </div>

                        <div className="space-y-4">
                            {qualityParameters.map((parameter, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    {/* Mobile Layout */}
                                    <div className="block lg:hidden space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-700">Parameter #{index + 1}</h4>
                                            {qualityParameters.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeQualityParameter(index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <RiDeleteBin6Line size={18} />
                                                </button>
                                            )}
                                        </div>

                                        <Input
                                            labels="Parameter Name"
                                            placeholder="Enter parameter name"
                                            type="text"
                                            value={parameter.parameter_name}
                                            onChange={(value) => handleParameterChange(index, 'parameter_name', value)}
                                            name={`parameter_name_${index}`}
                                        />

                                        <div className="grid grid-cols-2 gap-3">
                                            <Input
                                                labels="Expected Value"
                                                placeholder="0.00"
                                                type="text"
                                                value={parameter.expected_value}
                                                onChange={(value) => handleParameterChange(index, 'expected_value', value)}
                                                name={`expected_value_${index}`}
                                            />

                                            <Input
                                                labels="Actual Value"
                                                placeholder="0.00"
                                                type="text"
                                                value={parameter.actual_value}
                                                onChange={(value) => handleParameterChange(index, 'actual_value', value)}
                                                name={`actual_value_${index}`}
                                            />
                                        </div>

                                        <Input
                                            labels="Unit"
                                            placeholder="kg, mm, %, etc."
                                            type="text"
                                            value={parameter.unit}
                                            onChange={(value) => handleParameterChange(index, 'unit', value)}
                                            name={`unit_${index}`}
                                        />

                                        <RadioGroup
                                            label="Status"
                                            options={[
                                                { label: 'Pass', value: 'pass' },
                                                { label: 'Fail', value: 'fail' }
                                            ]}
                                            value={parameter.status}
                                            onChange={(value) => handleParameterChange(index, 'status', value)}
                                            name={`status_${index}`}
                                        />

                                        <Input
                                            labels="Remarks"
                                            placeholder="Enter remarks for this parameter"
                                            type="text"
                                            value={parameter.remarks}
                                            onChange={(value) => handleParameterChange(index, 'remarks', value)}
                                            name={`param_remarks_${index}`}
                                        />
                                    </div>

                                    {/* Desktop Layout */}
                                    <div className="hidden lg:grid lg:grid-cols-5 gap-4 items-end">
                                        <Input
                                            labels="Parameter Name"
                                            placeholder="Enter parameter name"
                                            type="text"
                                            value={parameter.parameter_name}
                                            onChange={(value) => handleParameterChange(index, 'parameter_name', value)}
                                            name={`parameter_name_${index}`}
                                        />

                                        <Input
                                            labels="Expected Value"
                                            placeholder="0.00"
                                            type="text"
                                            value={parameter.expected_value}
                                            onChange={(value) => handleParameterChange(index, 'expected_value', value)}
                                            name={`expected_value_${index}`}
                                        />

                                        <Input
                                            labels="Actual Value"
                                            placeholder="0.00"
                                            type="text"
                                            value={parameter.actual_value}
                                            onChange={(value) => handleParameterChange(index, 'actual_value', value)}
                                            name={`actual_value_${index}`}
                                        />

                                        <Input
                                            labels="Unit"
                                            placeholder="kg, mm, %"
                                            type="text"
                                            value={parameter.unit}
                                            onChange={(value) => handleParameterChange(index, 'unit', value)}
                                            name={`unit_${index}`}
                                        />

                                        <Input
                                            labels="Remarks"
                                            placeholder="Remarks"
                                            type="text"
                                            value={parameter.remarks}
                                            onChange={(value) => handleParameterChange(index, 'remarks', value)}
                                            name={`param_remarks_${index}`}
                                        />
                                        <div className=''>
                                            <RadioGroup
                                                // label="Status"
                                                options={[
                                                    { label: 'Pass', value: 'pass' },
                                                    { label: 'Fail', value: 'fail' }
                                                ]}
                                                value={parameter.status}
                                                onChange={(value) => handleParameterChange(index, 'status', value)}
                                                name={`status_${index}`}
                                                marginBottom="0px"
                                            />
                                        </div>
                                        <div className="flex items-center justify-end col-span-4">
                                            {qualityParameters.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeQualityParameter(index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <RiDeleteBin6Line size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final Assessment */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <RiAwardLine size={20} />
                            Final Assessment
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <RadioGroup
                                    label="Overall Grade"
                                    options={gradeOptions}
                                    value={formData.overall_grade}
                                    onChange={(value) => handleRadioChange(value, 'overall_grade')}
                                    name="overall_grade"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <p className="text-sm text-gray-600">Total Checked</p>
                                    <p className="text-2xl font-bold text-gray-900">{formData.checked_quantity || '0'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Passed</p>
                                    <p className="text-2xl font-bold text-green-600">{formData.passed_quantity || '0'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Failed</p>
                                    <p className="text-2xl font-bold text-red-600">{formData.failed_quantity || '0'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Pass Rate</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {formData.checked_quantity && formData.passed_quantity
                                            ? `${((parseFloat(formData.passed_quantity) / parseFloat(formData.checked_quantity)) * 100).toFixed(1)}%`
                                            : '0%'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Remarks */}
                    <div className="mb-8">
                        <Textarea
                            labels="General Remarks"
                            placeholder="Enter any additional observations, recommendations, or notes about this quality check"
                            rows={4}
                            value={formData.remarks}
                            onChange={handleInputChange}
                            name="remarks"
                            showCharCount={true}
                            maxLength={1000}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                        >
                            <RiCheckboxCircleLine size={20} />
                            Complete Quality Check
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Save as Draft
                        </button>
                        <button
                            type="button"
                            onClick={handleGenerateReport}
                            className="px-8 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                        >
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQualityCheck;