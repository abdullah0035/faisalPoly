import React, { useState, useEffect } from 'react';
import {
  RiPriceTag3Line,
  RiScales3Line,
  RiFlaskLine,
  RiMoneyDollarCircleLine,
  RiSettings4Line,
  RiBox3Line
} from '@remixicon/react';
import Input from '../../../utils/input';
import Select from '../../../utils/select';
import Textarea from '../../../utils/textarea';

const AddRawMaterial = () => {
  const [formData, setFormData] = useState({
    materialCode: '',
    name: '',
    materialType: '',
    unitOfMeasure: '',
    description: '',
    standardCost: '',
    supplierId: '',
    minimumStockLevel: '',
    maximumStockLevel: '',
    status: 'active'
  });

  const [suppliers, setSuppliers] = useState([]);

  // Material type options (matching database enum)
  const materialTypeOptions = [
    { id: 'plastic_pallets', name: 'Plastic Pallets' },
    { id: 'color_masterbatch', name: 'Color Masterbatch' },
    { id: 'stabilizer', name: 'Stabilizer' },
    { id: 'anti_static', name: 'Anti-static Agent' },
    { id: 'other_chemicals', name: 'Other Chemicals' }
  ];

  // Unit of measure options (matching database enum)
  const unitOfMeasureOptions = [
    { id: 'kg', name: 'Kilograms (kg)' },
    { id: 'tons', name: 'Tons' },
    { id: 'liters', name: 'Liters' }
  ];

  // Status options (matching database enum)
  const statusOptions = [
    { id: 'active', name: 'Active' },
    { id: 'discontinued', name: 'Discontinued' }
  ];

  // Mock suppliers data - replace with actual API call
  useEffect(() => {
    // Simulate API call to fetch suppliers
    const mockSuppliers = [
      { id: 1, name: 'Pakistan Plastic Suppliers Ltd' },
      { id: 2, name: 'Chemical Industries Pvt Ltd' },
      { id: 3, name: 'Polymer Solutions Inc' },
      { id: 4, name: 'Industrial Materials Co' }
    ];
    setSuppliers(mockSuppliers);
  }, []);

  // Generate material code automatically
  const generateMaterialCode = async () => {
    try {
      // In real application, this would be an API call to get the next available code
      // For now, we'll simulate it
      const response = await fetch('/api/raw-materials/next-code');
      if (response.ok) {
        const data = await response.json();
        return data.nextCode;
      }
    } catch (error) {
      console.error('Error generating material code:', error);
    }
    
    // Fallback: Generate based on current timestamp
    const timestamp = Date.now().toString().slice(-4);
    return `RM${timestamp}`;
  };

  // Auto-generate material code when component mounts
  useEffect(() => {
    const setInitialCode = async () => {
      const code = await generateMaterialCode();
      setFormData(prev => ({ ...prev, materialCode: code }));
    };
    setInitialCode();
  }, []);

  const handleInputChange = (value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = typeof selectedOption === 'string' ? selectedOption : selectedOption?.id || '';
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  // Regenerate material code
  const regenerateMaterialCode = async () => {
    const newCode = await generateMaterialCode();
    setFormData(prev => ({ ...prev, materialCode: newCode }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.materialType || !formData.unitOfMeasure) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare data for API submission (matching database fields exactly)
    const submitData = {
      material_code: formData.materialCode,
      name: formData.name,
      material_type: formData.materialType,
      unit_of_measure: formData.unitOfMeasure,
      description: formData.description || null,
      standard_cost: formData.standardCost ? parseFloat(formData.standardCost) : null,
      supplier_id: formData.supplierId ? parseInt(formData.supplierId) : null,
      minimum_stock_level: formData.minimumStockLevel ? parseInt(formData.minimumStockLevel) : 0,
      maximum_stock_level: formData.maximumStockLevel ? parseInt(formData.maximumStockLevel) : 0,
      status: formData.status
    };
    
    console.log('Raw Material Registration:', submitData);
    
    // Here you would send the data to your API
    // Example: await fetch('/api/raw-materials', { 
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(submitData)
    // });
  };

  return (
    <>
      <div className='p-5'>
        <div className="py-8 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <RiFlaskLine className="text-green-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Raw Material Registration</h2>
              <p className="text-gray-600">Add new raw material to the inventory management system</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Basic Material Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RiFlaskLine size={20} />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Input
                    labels="Material Code"
                    placeholder="Auto-generated code"
                    type="text"
                    icon={<RiPriceTag3Line className="text-[var(--icon)] fs_16" />}
                    value={formData.materialCode}
                    onChange={handleInputChange}
                    name="materialCode"
                    required
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={regenerateMaterialCode}
                    className="absolute right-2 top-9 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Regenerate Code"
                  >
                    <RiSettings4Line size={16} />
                  </button>
                </div>

                <Input
                  labels="Material Name"
                  placeholder="Enter material name"
                  type="text"
                  icon={<RiBox3Line className="text-[var(--icon)] fs_16" />}
                  value={formData.name}
                  onChange={handleInputChange}
                  name="name"
                  required
                />

                <Select
                  labels="Material Type"
                  placeholder="Select material type"
                  options={materialTypeOptions}
                  value={materialTypeOptions.find(type => type.id === formData.materialType) || null}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'materialType')}
                  displayKey="name"
                  valueKey="id"
                  required
                />

                <Select
                  labels="Unit of Measure"
                  placeholder="Select unit"
                  options={unitOfMeasureOptions}
                  value={unitOfMeasureOptions.find(unit => unit.id === formData.unitOfMeasure) || null}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'unitOfMeasure')}
                  displayKey="name"
                  valueKey="id"
                  required
                />

                <Select
                  labels="Primary Supplier"
                  placeholder="Select supplier"
                  options={suppliers}
                  value={suppliers.find(supplier => supplier.id === parseInt(formData.supplierId)) || null}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, 'supplierId')}
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

              <div className="mt-6">
                <Textarea
                  labels="Description"
                  placeholder="Enter material description, specifications, and usage details"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  name="description"
                  showCharCount={true}
                  maxLength={500}
                />
              </div>
            </div>

            {/* Pricing & Stock Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RiMoneyDollarCircleLine size={20} />
                Pricing & Stock Levels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  labels="Standard Cost (PKR)"
                  placeholder="Enter standard cost per unit"
                  type="number"
                  icon={<RiMoneyDollarCircleLine className="text-[var(--icon)] fs_16" />}
                  value={formData.standardCost}
                  onChange={handleInputChange}
                  name="standardCost"
                  min="0"
                  step="0.01"
                />

                <Input
                  labels="Minimum Stock Level"
                  placeholder="Enter minimum quantity"
                  type="number"
                  icon={<RiScales3Line className="text-[var(--icon)] fs_16" />}
                  value={formData.minimumStockLevel}
                  onChange={handleInputChange}
                  name="minimumStockLevel"
                  min="0"
                />

                <Input
                  labels="Maximum Stock Level"
                  placeholder="Enter maximum quantity"
                  type="number"
                  icon={<RiScales3Line className="text-[var(--icon)] fs_16" />}
                  value={formData.maximumStockLevel}
                  onChange={handleInputChange}
                  name="maximumStockLevel"
                  min="0"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 max-w-[200px] primary_btn"
              >
                Add Raw Material
              </button>
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={regenerateMaterialCode}
                className="px-6 py-3 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2"
              >
                <RiSettings4Line size={16} />
                New Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRawMaterial;