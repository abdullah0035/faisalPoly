import React, { useState, useEffect } from 'react';
import {
  RiShoppingCartLine,
  RiCalendarLine,
  RiFileTextLine,
  RiAddLine,
  RiDeleteBin6Line,
  RiMoneyDollarCircleLine,
  RiTruckLine,
  RiUser3Fill,
  RiCheckboxCircleLine,
  RiPercentLine
} from '@remixicon/react';

// Mock Input, Select, and Textarea components
const Input = ({ labels, placeholder, type, icon, value, onChange, name, disabled, required, min, step, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {labels} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value, name)}
        disabled={disabled}
        required={required}
        min={min}
        step={step}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          icon ? 'pl-10' : ''
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        {...props}
      />
    </div>
  </div>
);

const Select = ({ labels, placeholder, options, value, onChange, displayKey, valueKey, required }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {labels} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value?.id || value || ''}
      onChange={(e) => {
        const selectedOption = options.find(option => option[valueKey || 'id'] === e.target.value);
        onChange(selectedOption);
      }}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option[valueKey || 'id']} value={option[valueKey || 'id']}>
          {option[displayKey || 'name']}
        </option>
      ))}
    </select>
  </div>
);

const Textarea = ({ labels, placeholder, rows, value, onChange, name, showCharCount, maxLength }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{labels}</label>
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value, name)}
      maxLength={maxLength}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
    />
    {showCharCount && maxLength && (
      <p className="text-sm text-gray-500 text-right">{value.length}/{maxLength}</p>
    )}
  </div>
);

const AddPurchaseOrder = () => {
  const [formData, setFormData] = useState({
    purchase_number: '',
    supplier_id: '',
    order_date: new Date().toISOString().split('T')[0],
    expected_delivery_date: '',
    total_ordered_amount: 0,
    discount_amount: 0,
    tax_amount: 0,
    net_amount: 0,
    status: 'pending',
    payment_status: 'pending',
    quality_check_status: 'pending',
    vehicle_number: '',
    driver_name: '',
    driver_phone: '',
    notes: '',
    created_by: 'admin'
  });

  const [orderItems, setOrderItems] = useState([
    {
      raw_material_id: '',
      ordered_quantity: '',
      unit_price: '',
      total_price: 0,
      remarks: ''
    }
  ]);

  // Mock data based on your database
  const suppliers = [
    { id: '1', name: 'Pakistan Plastic Suppliers Ltd', supplier_type: 'plastic_pallets' },
    { id: '2', name: 'Faisalabad Raw Materials Co.', supplier_type: 'ingredients' },
    { id: '3', name: 'Punjab Plastic Industries', supplier_type: 'plastic_pallets' }
  ];

  const rawMaterials = [
    { id: '1', material_code: 'RM001', name: 'Plastic Pallets - Type A', material_type: 'plastic_pallets', unit_of_measure: 'kg' },
    { id: '2', material_code: 'RM002', name: 'Plastic Pallets - Type B', material_type: 'plastic_pallets', unit_of_measure: 'kg' },
    { id: '3', material_code: 'RM003', name: 'Color Masterbatch', material_type: 'color_masterbatch', unit_of_measure: 'kg' },
    { id: '4', material_code: 'RM004', name: 'Stabilizer', material_type: 'stabilizer', unit_of_measure: 'kg' },
    { id: '5', material_code: 'RM005', name: 'Anti-static Agent', material_type: 'anti_static', unit_of_measure: 'kg' }
  ];

  const statusOptions = [
    { id: 'pending', name: 'Pending' },
    { id: 'approved', name: 'Approved' },
    { id: 'partially_received', name: 'Partially Received' },
    { id: 'fully_received', name: 'Fully Received' },
    { id: 'cancelled', name: 'Cancelled' }
  ];

  const paymentStatusOptions = [
    { id: 'pending', name: 'Pending' },
    { id: 'partial', name: 'Partial' },
    { id: 'paid', name: 'Paid' }
  ];

  const qualityCheckStatusOptions = [
    { id: 'pending', name: 'Pending' },
    { id: 'passed', name: 'Passed' },
    { id: 'failed', name: 'Failed' },
    { id: 'partial', name: 'Partial' }
  ];

  // Auto-generate Purchase Number
  useEffect(() => {
    const generatePurchaseNumber = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const timestamp = `${hours}${minutes}${seconds}`;
      return `PO-${year}-${month}${day}-${timestamp}`;
    };
    
    setFormData(prev => ({ ...prev, purchase_number: generatePurchaseNumber() }));
  }, []);

  // Calculate totals when items change
  useEffect(() => {
    const totalOrderedAmount = orderItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
    const discountAmount = parseFloat(formData.discount_amount) || 0;
    const taxAmount = parseFloat(formData.tax_amount) || 0;
    const netAmount = totalOrderedAmount - discountAmount + taxAmount;
    
    setFormData(prev => ({
      ...prev,
      total_ordered_amount: totalOrderedAmount,
      net_amount: netAmount
    }));
  }, [orderItems, formData.discount_amount, formData.tax_amount]);

  const handleInputChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = typeof selectedOption === 'string' ? selectedOption : selectedOption?.id || '';
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  // Handle order item changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;
    
    // Calculate total price for this item
    if (field === 'ordered_quantity' || field === 'unit_price') {
      const quantity = parseFloat(updatedItems[index].ordered_quantity) || 0;
      const unitPrice = parseFloat(updatedItems[index].unit_price) || 0;
      updatedItems[index].total_price = quantity * unitPrice;
    }
    
    setOrderItems(updatedItems);
  };

  const handleItemSelectChange = (index, selectedOption, fieldName) => {
    const value = typeof selectedOption === 'string' ? selectedOption : selectedOption?.id || '';
    handleItemChange(index, fieldName, value);
  };

  // Add new order item
  const addOrderItem = () => {
    setOrderItems([...orderItems, {
      raw_material_id: '',
      ordered_quantity: '',
      unit_price: '',
      total_price: 0,
      remarks: ''
    }]);
  };

  // Remove order item
  const removeOrderItem = (index) => {
    if (orderItems.length > 1) {
      const updatedItems = orderItems.filter((_, i) => i !== index);
      setOrderItems(updatedItems);
    }
  };

  const handleSubmit = () => {
    const purchaseOrderData = {
      ...formData,
      orderItems: orderItems.filter(item => item.raw_material_id && item.ordered_quantity && item.unit_price)
    };
    
    console.log('Purchase Order Data:', purchaseOrderData);
    alert('Purchase Order created successfully! Check console for data structure.');
  };

  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      orderItems: orderItems,
      status: 'pending'
    };
    
    console.log('Draft Purchase Order:', draftData);
    alert('Purchase Order saved as draft!');
  };

  const handleGeneratePDF = () => {
    console.log('Generating PDF for PO:', formData.purchase_number);
    alert('PDF generation feature would be implemented here!');
  };

  return (
    <div className='p-5 bg-gray-50 min-h-screen'>
      <div className="py-8 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3 px-8">
          <div className="p-3 bg-green-100 rounded-lg">
            <RiShoppingCartLine className="text-green-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Purchase Order</h2>
            <p className="text-gray-600">Generate new purchase order for raw materials and supplies</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg mt-6">
        <div className="p-8">
          {/* Purchase Order Header */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RiFileTextLine size={20} />
              Purchase Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Input
                labels="Purchase Number"
                placeholder="Auto-generated"
                type="text"
                icon={<RiFileTextLine className="text-gray-500" size={16} />}
                value={formData.purchase_number}
                onChange={handleInputChange}
                name="purchase_number"
                disabled
                required
              />

              <Select
                labels="Supplier"
                placeholder="Select supplier"
                options={suppliers}
                value={suppliers.find(supplier => supplier.id === formData.supplier_id) || null}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'supplier_id')}
                displayKey="name"
                valueKey="id"
                required
              />

              <Input
                labels="Order Date"
                type="date"
                icon={<RiCalendarLine className="text-gray-500" size={16} />}
                value={formData.order_date}
                onChange={handleInputChange}
                name="order_date"
                required
              />

              <Input
                labels="Expected Delivery Date"
                type="date"
                icon={<RiTruckLine className="text-gray-500" size={16} />}
                value={formData.expected_delivery_date}
                onChange={handleInputChange}
                name="expected_delivery_date"
              />

              <Select
                labels="Status"
                placeholder="Select status"
                options={statusOptions}
                value={statusOptions.find(status => status.id === formData.status) || null}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'status')}
                displayKey="name"
                valueKey="id"
              />

              <Select
                labels="Payment Status"
                placeholder="Select payment status"
                options={paymentStatusOptions}
                value={paymentStatusOptions.find(status => status.id === formData.payment_status) || null}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'payment_status')}
                displayKey="name"
                valueKey="id"
              />

              <Select
                labels="Quality Check Status"
                placeholder="Select quality status"
                options={qualityCheckStatusOptions}
                value={qualityCheckStatusOptions.find(status => status.id === formData.quality_check_status) || null}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'quality_check_status')}
                displayKey="name"
                valueKey="id"
              />

              <Input
                labels="Created By"
                placeholder="Created by"
                type="text"
                icon={<RiUser3Fill className="text-gray-500" size={16} />}
                value={formData.created_by}
                onChange={handleInputChange}
                name="created_by"
                disabled
              />
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RiTruckLine size={20} />
              Vehicle & Driver Information (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                labels="Vehicle Number"
                placeholder="Enter vehicle number"
                type="text"
                value={formData.vehicle_number}
                onChange={handleInputChange}
                name="vehicle_number"
              />

              <Input
                labels="Driver Name"
                placeholder="Enter driver name"
                type="text"
                value={formData.driver_name}
                onChange={handleInputChange}
                name="driver_name"
              />

              <Input
                labels="Driver Phone"
                placeholder="Enter driver phone"
                type="tel"
                value={formData.driver_phone}
                onChange={handleInputChange}
                name="driver_phone"
              />
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <RiShoppingCartLine size={20} />
                Order Items
              </h3>
              <button
                type="button"
                onClick={addOrderItem}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <RiAddLine size={16} />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  {/* Mobile Layout */}
                  <div className="block lg:hidden space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-700">Item #{index + 1}</h4>
                      {orderItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOrderItem(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <RiDeleteBin6Line size={18} />
                        </button>
                      )}
                    </div>
                    
                    <Select
                      labels="Raw Material"
                      placeholder="Select raw material"
                      options={rawMaterials}
                      value={rawMaterials.find(material => material.id === item.raw_material_id) || null}
                      onChange={(selectedOption) => handleItemSelectChange(index, selectedOption, 'raw_material_id')}
                      displayKey="name"
                      valueKey="id"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        labels="Quantity"
                        placeholder="0.000"
                        type="number"
                        value={item.ordered_quantity}
                        onChange={(value) => handleItemChange(index, 'ordered_quantity', value)}
                        name={`ordered_quantity_${index}`}
                        min="0"
                        step="0.001"
                        required
                      />
                      
                      <Input
                        labels="Unit Price (PKR)"
                        placeholder="0.00"
                        type="number"
                        value={item.unit_price}
                        onChange={(value) => handleItemChange(index, 'unit_price', value)}
                        name={`unit_price_${index}`}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <Input
                      labels="Total Price (PKR)"
                      placeholder="0.00"
                      type="number"
                      value={item.total_price.toFixed(2)}
                      disabled
                      name={`total_price_${index}`}
                    />

                    <Input
                      labels="Remarks"
                      placeholder="Enter any remarks for this item"
                      type="text"
                      value={item.remarks}
                      onChange={(value) => handleItemChange(index, 'remarks', value)}
                      name={`remarks_${index}`}
                    />
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-end">
                    <div className="col-span-2">
                      <Select
                        labels="Raw Material"
                        placeholder="Select raw material"
                        options={rawMaterials}
                        value={rawMaterials.find(material => material.id === item.raw_material_id) || null}
                        onChange={(selectedOption) => handleItemSelectChange(index, selectedOption, 'raw_material_id')}
                        displayKey="name"
                        valueKey="id"
                        required
                      />
                    </div>

                    <Input
                      labels="Quantity"
                      placeholder="0.000"
                      type="number"
                      value={item.ordered_quantity}
                      onChange={(value) => handleItemChange(index, 'ordered_quantity', value)}
                      name={`ordered_quantity_${index}`}
                      min="0"
                      step="0.001"
                      required
                    />

                    <Input
                      labels="Unit Price (PKR)"
                      placeholder="0.00"
                      type="number"
                      value={item.unit_price}
                      onChange={(value) => handleItemChange(index, 'unit_price', value)}
                      name={`unit_price_${index}`}
                      min="0"
                      step="0.01"
                      required
                    />

                    <Input
                      labels="Total Price (PKR)"
                      placeholder="0.00"
                      type="number"
                      value={item.total_price.toFixed(2)}
                      disabled
                      name={`total_price_${index}`}
                    />

                    <div className="flex items-center justify-center">
                      {orderItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOrderItem(index)}
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

          {/* Financial Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RiMoneyDollarCircleLine size={20} />
              Financial Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Input
                labels="Discount Amount (PKR)"
                placeholder="0.00"
                type="number"
                icon={<RiPercentLine className="text-gray-500" size={16} />}
                value={formData.discount_amount}
                onChange={handleInputChange}
                name="discount_amount"
                min="0"
                step="0.01"
              />

              <Input
                labels="Tax Amount (PKR)"
                placeholder="0.00"
                type="number"
                icon={<RiPercentLine className="text-gray-500" size={16} />}
                value={formData.tax_amount}
                onChange={handleInputChange}
                name="tax_amount"
                min="0"
                step="0.01"
              />

              <Input
                labels="Total Ordered Amount (PKR)"
                placeholder="0.00"
                type="number"
                value={formData.total_ordered_amount.toFixed(2)}
                disabled
                name="total_ordered_amount"
              />

              <Input
                labels="Net Amount (PKR)"
                placeholder="0.00"
                type="number"
                value={formData.net_amount.toFixed(2)}
                disabled
                name="net_amount"
              />
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{orderItems.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gross Amount</p>
                  <p className="text-2xl font-bold text-blue-600">PKR {formData.total_ordered_amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Discount</p>
                  <p className="text-2xl font-bold text-orange-600">PKR {parseFloat(formData.discount_amount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Net Payable</p>
                  <p className="text-2xl font-bold text-green-600">PKR {formData.net_amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <Textarea
              labels="Notes"
              placeholder="Enter any additional notes or special instructions for this purchase order"
              rows={4}
              value={formData.notes}
              onChange={handleInputChange}
              name="notes"
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
              Create Purchase Order
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
              onClick={handleGeneratePDF}
              className="px-8 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseOrder;