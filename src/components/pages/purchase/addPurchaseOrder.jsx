import React, { useState, useEffect } from 'react';
import {
  RiShoppingCartLine,
  RiCalendarLine,
  RiFileTextLine,
  RiAddLine,
  RiDeleteBin6Line,
  RiMoneyDollarCircleLine,
  RiTruckLine,
  RiUser3Fill
} from '@remixicon/react';
import Input from '../../../utils/input';
import Select from '../../../utils/select';
import Textarea from '../../../utils/textarea';

const AddPurchaseOrder = () => {
  const [formData, setFormData] = useState({
    poNumber: '',
    supplierId: '',
    poDate: new Date().toISOString().split('T')[0],
    expectedDeliveryDate: '',
    totalAmount: 0,
    netAmount: 0,
    status: 'pending',
    notes: '',
    createdBy: 'admin'
  });

  const [orderItems, setOrderItems] = useState([
    {
      productId: '',
      quantity: '',
      unitPrice: '',
      totalPrice: 0
    }
  ]);

  // Mock data - replace with actual API calls
  const suppliers = [
    { id: '1', name: 'Pakistan Plastic Suppliers Ltd' },
    { id: '2', name: 'Faisalabad Raw Materials Co.' },
    { id: '3', name: 'Punjab Plastic Industries' }
  ];

  const products = [
    { id: '1', name: 'Plastic Pallets - Type A', code: 'RM001', unit: 'kg' },
    { id: '2', name: 'Plastic Pallets - Type B', code: 'RM002', unit: 'kg' },
    { id: '3', name: 'Color Masterbatch', code: 'RM003', unit: 'kg' },
    { id: '4', name: 'Stabilizer', code: 'RM004', unit: 'kg' },
    { id: '5', name: 'Anti-static Agent', code: 'RM005', unit: 'kg' }
  ];

  const statusOptions = [
    { id: 'pending', name: 'Pending' },
    { id: 'approved', name: 'Approved' },
    { id: 'received', name: 'Received' },
    { id: 'partially_received', name: 'Partially Received' },
    { id: 'cancelled', name: 'Cancelled' }
  ];

  // Auto-generate PO Number
  useEffect(() => {
    const generatePONumber = () => {
      const year = new Date().getFullYear();
      const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `PO-${year}-${month}-${random}`;
    };
    
    setFormData(prev => ({ ...prev, poNumber: generatePONumber() }));
  }, []);

  // Calculate totals when items change
  useEffect(() => {
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    setFormData(prev => ({
      ...prev,
      totalAmount: totalAmount,
      netAmount: totalAmount // Can add tax/discount calculations here
    }));
  }, [orderItems]);

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
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = parseFloat(updatedItems[index].quantity) || 0;
      const unitPrice = parseFloat(updatedItems[index].unitPrice) || 0;
      updatedItems[index].totalPrice = quantity * unitPrice;
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
      productId: '',
      quantity: '',
      unitPrice: '',
      totalPrice: 0
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
      orderItems: orderItems.filter(item => item.productId && item.quantity && item.unitPrice)
    };
    
    console.log('Purchase Order Data:', purchaseOrderData);
    
    // Here you would send the data to your API
    // Example: await fetch('/api/purchase-orders', { method: 'POST', body: JSON.stringify(purchaseOrderData) });
  };

  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      orderItems: orderItems,
      status: 'draft'
    };
    
    console.log('Draft Purchase Order:', draftData);
    // Save as draft logic here
  };

  const handleGeneratePDF = () => {
    console.log('Generating PDF for PO:', formData.poNumber);
    // PDF generation logic here
  };

  return (
    <div className='p-5'>
      <div className="py-8 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <RiShoppingCartLine className="text-green-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Purchase Order</h2>
            <p className="text-gray-600">Generate new purchase order for raw materials and supplies</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-8">
          {/* Purchase Order Header */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RiFileTextLine size={20} />
              Purchase Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Input
                labels="PO Number"
                placeholder="Auto-generated"
                type="text"
                icon={<RiFileTextLine className="text-[var(--icon)] fs_16" />}
                value={formData.poNumber}
                onChange={handleInputChange}
                name="poNumber"
                disabled
                required
              />

              <Select
                labels="Supplier"
                placeholder="Select supplier"
                options={suppliers}
                value={suppliers.find(supplier => supplier.id === formData.supplierId) || null}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'supplierId')}
                displayKey="name"
                valueKey="id"
                required
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

              <Input
                labels="PO Date"
                type="date"
                icon={<RiCalendarLine className="text-[var(--icon)] fs_16" />}
                value={formData.poDate}
                onChange={handleInputChange}
                name="poDate"
                required
              />

              <Input
                labels="Expected Delivery Date"
                type="date"
                icon={<RiTruckLine className="text-[var(--icon)] fs_16" />}
                value={formData.expectedDeliveryDate}
                onChange={handleInputChange}
                name="expectedDeliveryDate"
              />

              <Input
                labels="Created By"
                placeholder="Created by"
                type="text"
                icon={<RiUser3Fill className="text-[var(--icon)] fs_16" />}
                value={formData.createdBy}
                onChange={handleInputChange}
                name="createdBy"
                disabled
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
                      labels="Product"
                      placeholder="Select product"
                      options={products}
                      value={products.find(product => product.id === item.productId) || null}
                      onChange={(selectedOption) => handleItemSelectChange(index, selectedOption, 'productId')}
                      displayKey="name"
                      valueKey="id"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        labels="Quantity"
                        placeholder="0"
                        type="number"
                        value={item.quantity}
                        onChange={(value) => handleItemChange(index, 'quantity', value)}
                        name={`quantity_${index}`}
                        min="0"
                        step="0.001"
                        required
                      />
                      
                      <Input
                        labels="Unit Price (PKR)"
                        placeholder="0.00"
                        type="number"
                        value={item.unitPrice}
                        onChange={(value) => handleItemChange(index, 'unitPrice', value)}
                        name={`unitPrice_${index}`}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <Input
                      labels="Total Price (PKR)"
                      placeholder="0.00"
                      type="number"
                      value={item.totalPrice.toFixed(2)}
                      disabled
                      name={`totalPrice_${index}`}
                    />
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-5 gap-4">
                    <div className="col-span-2">
                      <Select
                        labels="Product"
                        placeholder="Select product"
                        options={products}
                        value={products.find(product => product.id === item.productId) || null}
                        onChange={(selectedOption) => handleItemSelectChange(index, selectedOption, 'productId')}
                        displayKey="name"
                        valueKey="id"
                        required
                      />
                    </div>

                    <Input
                      labels="Quantity"
                      placeholder="0"
                      type="number"
                      value={item.quantity}
                      onChange={(value) => handleItemChange(index, 'quantity', value)}
                      name={`quantity_${index}`}
                      min="0"
                      step="0.001"
                      required
                    />

                    <Input
                      labels="Unit Price (PKR)"
                      placeholder="0.00"
                      type="number"
                      value={item.unitPrice}
                      onChange={(value) => handleItemChange(index, 'unitPrice', value)}
                      name={`unitPrice_${index}`}
                      min="0"
                      step="0.01"
                      required
                    />

                    <Input
                      labels="Total Price (PKR)"
                      placeholder="0.00"
                      type="number"
                      value={item.totalPrice.toFixed(2)}
                      disabled
                      name={`totalPrice_${index}`}
                    />

                    <div className="flex items-start justify-start">
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

          {/* Order Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RiMoneyDollarCircleLine size={20} />
              Order Summary
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{orderItems.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600">PKR {formData.totalAmount.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Net Amount</p>
                  <p className="text-2xl font-bold text-green-600">PKR {formData.netAmount.toLocaleString()}</p>
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
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 max-w-[240px] primary_btn whitespace-nowrap"
            >
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