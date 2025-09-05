import React, { useState } from 'react';
import {
  RiUploadLine,
  RiUserLine,
  RiPhoneLine,
  RiMailLine,
  RiContactsLine,
  RiCalendarLine,
  RiMoneyDollarCircleLine,
  RiStarLine
} from '@remixicon/react';
import Input from '../../../utils/input';
import Select from '../../../utils/select';
import Textarea from '../../../utils/textarea';

const AddLabour = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    employeeId: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    startDate: '',
    shift: '',
    salary: '',
    skillLevel: '',
    employmentType: ''
  });

  // Department options for select
  const departmentOptions = [
    { id: 'production', name: 'Production' },
    { id: 'quality', name: 'Quality Control' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'logistics', name: 'Logistics' },
    { id: 'administration', name: 'Administration' }
  ];

  // Position options for select
  const positionOptions = [
    { id: 'operator', name: 'Machine Operator' },
    { id: 'supervisor', name: 'Supervisor' },
    { id: 'technician', name: 'Technician' },
    { id: 'manager', name: 'Manager' },
    { id: 'coordinator', name: 'Coordinator' }
  ];


  const handleInputChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = typeof selectedOption === 'string' ? selectedOption : selectedOption?.id || '';
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee Registration:', formData);
  };

  return (
    <>
      <div className='p-5'>
        <div className="py-8 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <RiUserLine className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Labour Registration</h2>
              <p className="text-gray-600">Add new labour to the factory management system</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg">


          <form onSubmit={handleSubmit} className="p-8">
            {/* Profile Photo Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Profile Photo</label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                  <RiUserLine className="text-gray-400" size={32} />
                </div>
                <button type="button" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[var(--primary)] rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
                  <RiUploadLine size={16} />
                  Upload Photo
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RiUserLine size={20} />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  labels="Name"
                  placeholder="Enter name"
                  type="text"
                  icon={<RiUserLine className="text-[var(--icon)] fs_16" />}
                  value={formData.name}
                  onChange={handleInputChange}
                  name="name"
                />

                <Input
                  labels="Father Name"
                  placeholder="Enter father name"
                  type="text"
                  icon={<RiUserLine className="text-[var(--icon)] fs_16" />}
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  name="fatherName"
                />

                <Input
                  labels="CNIC"
                  placeholder="Enter CNIC"
                  type="text"
                  icon={<RiUserLine className="text-[var(--icon)] fs_16" />}
                  value={formData.cnic}
                  onChange={handleInputChange}
                  name="cnic"
                />  

              </div>
            </div>

            {/* Employment Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RiStarLine size={20} />
                Employment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Select
                  labels="Department"
                  placeholder="Select Department"
                  options={departmentOptions}
                  value={departmentOptions.find(dept => dept.id === formData.department) || null}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'department')}
                  displayKey="name"
                  valueKey="id"
                />
                <Select
                  labels="Position"
                  placeholder="Select Position"
                  options={positionOptions}
                  value={positionOptions.find(pos => pos.id === formData.position) || null}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'position')}
                  displayKey="name"
                  valueKey="id"
                />

                <Input
                  labels="Daily Salary"
                  placeholder="Enter salary amount"
                  type="number"
                  icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                  value={formData.salary}
                  onChange={handleInputChange}
                  name="salary"
                />
                <Input
                  labels="Monthly Salary"
                  placeholder="Enter salary amount"
                  type="number"
                  icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                  value={formData.salary}
                  onChange={handleInputChange}
                  name="salary"
                />
                 <Input
                  labels="Hire Date"
                  placeholder="Select hire date"
                  type="date"
                  icon={<RiCalendarLine className="text-[var(--icon)] fs_16" />}
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  name="hireDate"
                />
              </div>

            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RiPhoneLine size={20} />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  labels="Email Address"
                  placeholder="john.doe@company.com"
                  type="email"
                  icon={<RiMailLine className="text-[var(--icon)] fs_16" />}
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                />

                <Input
                  labels="Phone Number"
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                  icon={<RiPhoneLine className="text-[var(--icon)] fs_16" />}
                  value={formData.phone}
                  onChange={handleInputChange}
                  name="phone"
                />

                <Input
                  labels="Emergency Contact Name"
                  placeholder="Enter emergency contact name"
                  type="text"
                  icon={<RiContactsLine className="text-[var(--icon)] fs_16" />}
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  name="emergencyContact"
                />

                <Input
                  labels="Emergency Contact Phone"
                  placeholder="+1 (555) 987-6543"
                  type="tel"
                  icon={<RiPhoneLine className="text-[var(--icon)] fs_16" />}
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  name="emergencyPhone"
                />
              </div>

              <div className="mt-6">
                <Textarea
                  labels="Address"
                  placeholder="Enter complete address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  name="address"
                  showCharCount={true}
                  maxLength={500}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 max-w-[200px] primary_btn"
              >
                Register Employee
              </button>
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLabour;