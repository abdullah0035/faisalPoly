/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiCalculatorLine
} from '@remixicon/react';
import Input from '../../../utils/input';
import Select from '../../../utils/select';
import Textarea from '../../../utils/textarea';

const Salaries = () => {
  const [formData, setFormData] = useState({
    labour_id: '',
    total_salary: '',
    overtime_amount: '',
    bonus_amount: '',
    deduction_amount: '',
    net_amount: '',
    payment_date: '',
    payment_method: 'cash',
    status: 'pending',
    notes: '',
    total_salary_due: '',
    outstanding_balance: '',
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Labour list from your database
  const labourList = [
    { id: 1, name: 'Anas', employee_id: 'EMP001', monthly_salary: 40000.00, position: 'operator' },
    { id: 2, name: 'Talha', employee_id: 'EMP002', monthly_salary: 45000.00, position: 'supervisor' },
    { id: 3, name: 'Hamza', employee_id: 'EMP003', monthly_salary: 38000.00, position: 'helper' },
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash' },
    { id: 'bank_transfer', name: 'Bank Transfer' }  
  ];

  const statusOptions = [
    { id: 'pending', name: 'Pending' },
    { id: 'paid', name: 'Paid' }
  ];

  // Update form when employee is selected
  useEffect(() => {
    if (selectedEmployee) {
      setFormData(prev => ({
        ...prev,
        labour_id: selectedEmployee.id,
        total_salary: selectedEmployee.monthly_salary.toFixed(2),
      }));
    }
  }, [selectedEmployee]);

  const handleInputChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption);
  };

  const handlePaymentMethodChange = (selectedOption) => {
    setFormData(prev => ({ ...prev, payment_method: selectedOption?.id || 'cash' }));
  };

  const handleStatusChange = (selectedOption) => {
    setFormData(prev => ({ ...prev, status: selectedOption?.id || 'pending' }));
  };

  const handleSubmit = () => {
    if (!formData.labour_id) {
      alert('Please select an employee');
      return;
    }
    
    if (!formData.payment_date) {
      alert('Please select payment date');
      return;
    }

    if (!formData.net_amount) {
      alert('Please enter net amount paid');
      return;
    }

    console.log('Salary Payment Data:', formData);
    alert('Salary payment recorded successfully!');
  };

  const clearForm = () => {
    setFormData({
      labour_id: '',
      total_salary: '',
      overtime_amount: '',
      bonus_amount: '',
      deduction_amount: '',
      net_amount: '',
      payment_date: '',
      payment_method: 'cash',
      status: 'pending',
      notes: '',
      total_salary_due: '',
      outstanding_balance: '',
    });
    setSelectedEmployee(null);
  };

  return (
    <div className='p-5'>
      <div className="py-8 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <RiMoneyDollarCircleLine className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Labour Salary Management</h2>
            <p className="text-gray-600">Record and manage salary payments for employees</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-8">
          
          {/* Employee Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RiUserLine size={20} />
              Employee Selection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                labels="Select Employee"
                placeholder="Choose employee"
                options={labourList}
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                displayKey="name"
                valueKey="id"
                searchable={true}
              />
              <Input
                labels="Payment Date"
                placeholder="Payment date"
                type="date"
                value={formData.payment_date}
                onChange={handleInputChange}
                name="payment_date"
              />
            </div>
          </div>

          {/* Salary Components */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RiCalculatorLine size={20} />
              Salary Components
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                labels="Total Salary (PKR) - Readonly"
                placeholder="Total salary amount"
                type="number"
                icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                value={formData.total_salary}
                onChange={handleInputChange}
                name="total_salary"
                readonly={true}
              />

              <Input
                labels="Overtime Amount (PKR)"
                placeholder="Overtime payment"
                type="number"
                icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                value={formData.overtime_amount}
                onChange={handleInputChange}
                name="overtime_amount"
              />

              <Input
                labels="Bonus Amount (PKR)"
                placeholder="Bonus payment"
                type="number"
                icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                value={formData.bonus_amount}
                onChange={handleInputChange}
                name="bonus_amount"
              />

              <Input
                labels="Deduction Amount (PKR)"
                placeholder="Deductions"
                type="number"
                icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                value={formData.deduction_amount}
                onChange={handleInputChange}
                name="deduction_amount"
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                labels="Net Amount Paid (PKR)"
                placeholder="Enter actual amount paid"
                type="number"
                icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                value={formData.net_amount}
                onChange={handleInputChange}
                name="net_amount"
              />
              
              <Select
                labels="Payment Method"
                placeholder="Select payment method"
                options={paymentMethods}
                value={paymentMethods.find(method => method.id === formData.payment_method)}
                onChange={handlePaymentMethodChange}
                displayKey="name"
                valueKey="id"
                searchable={false}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
              <Select
                labels="Status"
                placeholder="Select status"
                options={statusOptions}
                value={statusOptions.find(status => status.id === formData.status)}
                onChange={handleStatusChange}
                displayKey="name"
                valueKey="id"
                searchable={false}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <Textarea
              labels="Notes"
              placeholder="Additional notes about this payment..."
              value={formData.notes}
              onChange={handleInputChange}
              name="notes"
              rows={4}
              showCharCount={true}
              maxLength={500}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 max-w-[200px] primary_btn"
            >
              Record Payment
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salaries;