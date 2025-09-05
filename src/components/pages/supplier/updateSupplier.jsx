import React, { useState, useRef } from 'react';
import {
  RiUploadLine,
  RiPhoneLine,
  RiMailLine,
  RiContactsLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiTruckLine,
  RiDeleteBin6Line
} from '@remixicon/react';
import Input from '../../../utils/input';
import Select from '../../../utils/select';
import Textarea from '../../../utils/textarea';

const UpdateSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: 'Punjab',
    country: 'Pakistan',
    supplierType: '',
    paymentTerms: '',
    creditLimit: '',
    status: 'active'
  });

  const [supplierImage, setSupplierImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Supplier type options
  const supplierTypeOptions = [
    { id: 'plastic_pallets', name: 'Plastic Pallets' },
    { id: 'ingredients', name: 'Ingredients' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'other', name: 'Other' }
  ];

  // Payment terms options
  const paymentTermsOptions = [
    { id: 'cash_on_delivery', name: 'Cash on Delivery' },
    { id: 'net_15', name: 'Net 15 Days' },
    { id: 'net_30', name: 'Net 30 Days' },
    { id: 'net_45', name: 'Net 45 Days' },
    { id: 'advance_payment', name: 'Advance Payment' }
  ];

  // Status options
  const statusOptions = [
    { id: 'active', name: 'Active' },
    { id: 'inactive', name: 'Inactive' }
  ];

  // Province options
  const provinceOptions = [
    { id: 'Punjab', name: 'Punjab' },
    { id: 'Sindh', name: 'Sindh' },
    { id: 'KPK', name: 'Khyber Pakhtunkhwa' },
    { id: 'Balochistan', name: 'Balochistan' },
    { id: 'Islamabad', name: 'Islamabad Capital Territory' }
  ];

  const handleInputChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = typeof selectedOption === 'string' ? selectedOption : selectedOption?.id || '';
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }

      setSupplierImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setSupplierImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData for file upload
    const submitData = new FormData();
    
    // Append form data
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    // Append image if exists
    if (supplierImage) {
      submitData.append('supplierImage', supplierImage);
    }
    
    console.log('Supplier Registration:', formData);
    console.log('Supplier Image:', supplierImage);
    
    // Here you would typically send the FormData to your API
    // Example: await fetch('/api/suppliers', { method: 'POST', body: submitData });
  };

  return (
    <>
      <div className='p-5'>
        <div className="py-8 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <RiTruckLine className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Supplier Registration</h2>
              <p className="text-gray-600">Add new supplier to the factory management system</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Supplier Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Supplier Image</label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Supplier preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <RiContactsLine className="text-gray-400" size={32} />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button 
                    type="button" 
                    onClick={triggerFileInput}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[var(--primary)] rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    <RiUploadLine size={16} />
                    Upload Image
                  </button>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                    >
                      <RiDeleteBin6Line size={16} />
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Accepted formats: JPEG, PNG, GIF. Max size: 5MB</p>
            </div>

            {/* Supplier Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RiContactsLine size={20} />
                Supplier Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  labels="Supplier Name"
                  placeholder="Enter supplier name"
                  type="text"
                  icon={<RiContactsLine className="text-[var(--icon)] fs_16" />}
                  value={formData.name}
                  onChange={handleInputChange}
                  name="name"
                  required
                />

                <Input
                  labels="Contact Person"
                  placeholder="Enter contact person name"
                  type="text"
                  icon={<RiContactsLine className="text-[var(--icon)] fs_16" />}
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  name="contactPerson"
                />

                <Select
                  labels="Supplier Type"
                  placeholder="Select supplier type"
                  options={supplierTypeOptions}
                  value={supplierTypeOptions.find(type => type.id === formData.supplierType) || null}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'supplierType')}
                  displayKey="name"
                  valueKey="id"
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
              </div>
            </div>

            {/* Business Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RiMoneyDollarCircleLine size={20} />
                Business Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  labels="Payment Terms"
                  placeholder="Select payment terms"
                  options={paymentTermsOptions}
                  value={paymentTermsOptions.find(term => term.id === formData.paymentTerms) || null}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'paymentTerms')}
                  displayKey="name"
                  valueKey="id"
                />

                <Input
                  labels="Credit Limit (PKR)"
                  placeholder="Enter credit limit amount"
                  type="number"
                  icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                  value={formData.creditLimit}
                  onChange={handleInputChange}
                  name="creditLimit"
                  min="0"
                  step="0.01"
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
                  placeholder="company@example.com"
                  type="email"
                  icon={<RiMailLine className="text-[var(--icon)] fs_16" />}
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                />

                <Input
                  labels="Phone Number"
                  placeholder="+92 300 1234567"
                  type="tel"
                  icon={<RiPhoneLine className="text-[var(--icon)] fs_16" />}
                  value={formData.phone}
                  onChange={handleInputChange}
                  name="phone"
                />

                <Input
                  labels="City"
                  placeholder="Enter city name"
                  type="text"
                  icon={<RiMapPinLine className="text-[var(--icon)] fs_16" />}
                  value={formData.city}
                  onChange={handleInputChange}
                  name="city"
                />

                <Select
                  labels="Province"
                  placeholder="Select province"
                  options={provinceOptions}
                  value={provinceOptions.find(province => province.id === formData.province) || null}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'province')}
                  displayKey="name"
                  valueKey="id"
                />

                <Input
                  labels="Country"
                  placeholder="Enter country"
                  type="text"
                  icon={<RiMapPinLine className="text-[var(--icon)] fs_16" />}
                  value={formData.country}
                  onChange={handleInputChange}
                  name="country"
                />
              </div>

              <div className="mt-6">
                <Textarea
                  labels="Complete Address"
                  placeholder="Enter complete business address"
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
                Register Supplier
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

export default UpdateSupplier;