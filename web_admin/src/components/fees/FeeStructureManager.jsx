// Modern Fee Structure Management - Matching eSchool Design
// web_admin/src/components/fees/FeeStructureManager.jsx

import React, { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  AcademicCapIcon,
  TruckIcon,
  BookOpenIcon,
  CogIcon,
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const FeeStructureManager = () => {
  const [feeStructures, setFeeStructures] = useState([
    {
      id: 1,
      name: "Class 10 Fee Structure 2024-25",
      class: "Class 10",
      academicYear: "2024-25",
      totalAmount: 45000,
      status: "active",
      createdAt: "2024-01-15",
      feeItems: [
        { name: "Tuition Fee", amount: 3000, frequency: "monthly", category: "tuition" },
        { name: "Development Fee", amount: 5000, frequency: "yearly", category: "development" },
        { name: "Transport Fee", amount: 1500, frequency: "monthly", category: "transport" },
        { name: "Library Fee", amount: 2000, frequency: "yearly", category: "library" },
        { name: "Sports Fee", amount: 1000, frequency: "yearly", category: "sports" }
      ]
    },
    {
      id: 2,
      name: "Class 9 Fee Structure 2024-25",
      class: "Class 9",
      academicYear: "2024-25",
      totalAmount: 42000,
      status: "active",
      createdAt: "2024-01-15",
      feeItems: [
        { name: "Tuition Fee", amount: 2800, frequency: "monthly", category: "tuition" },
        { name: "Development Fee", amount: 4500, frequency: "yearly", category: "development" },
        { name: "Transport Fee", amount: 1400, frequency: "monthly", category: "transport" },
        { name: "Library Fee", amount: 1800, frequency: "yearly", category: "library" },
        { name: "Sports Fee", amount: 900, frequency: "yearly", category: "sports" }
      ]
    },
    {
      id: 3,
      name: "Class 8 Fee Structure 2024-25",
      class: "Class 8",
      academicYear: "2024-25",
      totalAmount: 38000,
      status: "active",
      createdAt: "2024-01-15",
      feeItems: [
        { name: "Tuition Fee", amount: 2500, frequency: "monthly", category: "tuition" },
        { name: "Development Fee", amount: 4000, frequency: "yearly", category: "development" },
        { name: "Transport Fee", amount: 1300, frequency: "monthly", category: "transport" },
        { name: "Library Fee", amount: 1500, frequency: "yearly", category: "library" },
        { name: "Sports Fee", amount: 800, frequency: "yearly", category: "sports" }
      ]
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStructure, setEditingStructure] = useState(null);
  const [expandedStructure, setExpandedStructure] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'tuition':
        return <AcademicCapIcon className="h-4 w-4 text-blue-600" />;
      case 'transport':
        return <TruckIcon className="h-4 w-4 text-green-600" />;
      case 'library':
        return <BookOpenIcon className="h-4 w-4 text-purple-600" />;
      case 'development':
        return <CogIcon className="h-4 w-4 text-orange-600" />;
      case 'sports':
        return <AcademicCapIcon className="h-4 w-4 text-red-600" />;
      default:
        return <CurrencyRupeeIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getFrequencyBadge = (frequency) => {
    const styles = {
      monthly: 'bg-blue-100 text-blue-800',
      yearly: 'bg-green-100 text-green-800',
      quarterly: 'bg-purple-100 text-purple-800',
      half_yearly: 'bg-orange-100 text-orange-800'
    };
    return styles[frequency] || 'bg-gray-100 text-gray-800';
  };

  const filteredStructures = feeStructures.filter(structure => {
    const matchesSearch = structure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         structure.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || structure.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleCreateStructure = () => {
    setShowCreateModal(true);
  };

  const handleEditStructure = (structure) => {
    setEditingStructure(structure);
    setShowEditModal(true);
  };

  const handleDeleteStructure = (id) => {
    if (window.confirm('Are you sure you want to delete this fee structure?')) {
      setFeeStructures(prev => prev.filter(structure => structure.id !== id));
    }
  };

  const handleDuplicateStructure = (structure) => {
    const newStructure = {
      ...structure,
      id: Date.now(),
      name: `${structure.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setFeeStructures(prev => [...prev, newStructure]);
  };

  const toggleExpanded = (id) => {
    setExpandedStructure(expandedStructure === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fee Structure Management</h1>
              <p className="text-gray-600 mt-1">Create and manage fee structures for different classes</p>
            </div>
            <button
              onClick={handleCreateStructure}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2 shadow-sm"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create Structure</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Structures</p>
                <p className="text-xl font-bold text-gray-900">{feeStructures.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DocumentDuplicateIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Structures</p>
                <p className="text-xl font-bold text-green-600">{feeStructures.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-xl font-bold text-purple-600">{new Set(feeStructures.map(s => s.class)).size}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <AcademicCapIcon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Fee Amount</p>
                <p className="text-xl font-bold text-orange-600">₹{Math.round(feeStructures.reduce((sum, s) => sum + s.totalAmount, 0) / feeStructures.length).toLocaleString()}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <CurrencyRupeeIcon className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search fee structures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Classes</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 6">Class 6</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fee Structures List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Fee Structures</h3>
          </div>
          
          {filteredStructures.length === 0 ? (
            <div className="text-center py-12">
              <DocumentDuplicateIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No fee structures found</h3>
              <p className="text-gray-600 mb-6">Create your first fee structure to get started</p>
              <button
                onClick={handleCreateStructure}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Create Fee Structure
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredStructures.map((structure) => (
                <div key={structure.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleExpanded(structure.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {expandedStructure === structure.id ? (
                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="text-lg font-medium text-gray-900">{structure.name}</h4>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {structure.status}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <AcademicCapIcon className="h-4 w-4 mr-1" />
                              {structure.class}
                            </span>
                            <span className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {structure.academicYear}
                            </span>
                            <span className="flex items-center">
                              <CurrencyRupeeIcon className="h-4 w-4 mr-1" />
                              ₹{structure.totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditStructure(structure)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateStructure(structure)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Duplicate"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStructure(structure.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {expandedStructure === structure.id && (
                    <div className="mt-4 ml-8">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Fee Breakdown</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {structure.feeItems.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {getCategoryIcon(item.category)}
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFrequencyBadge(item.frequency)}`}>
                                  {item.frequency}
                                </span>
                              </div>
                            </div>
                            <p className="font-bold text-gray-900">₹{item.amount.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {showCreateModal ? 'Create Fee Structure' : 'Edit Fee Structure'}
              </h2>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Structure Name *</label>
                    <input
                      type="text"
                      defaultValue={editingStructure?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Class 10 Fee Structure 2024-25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="Class 10">Class 10</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 6">Class 6</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                  <input
                    type="text"
                    defaultValue={editingStructure?.academicYear || '2024-25'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="2024-25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Fee Items *</label>
                  <div className="space-y-3">
                    {editingStructure?.feeItems?.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          defaultValue={item.name}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Fee Name"
                        />
                        <input
                          type="number"
                          defaultValue={item.amount}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Amount"
                        />
                        <select
                          defaultValue={item.frequency}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="half_yearly">Half Yearly</option>
                        </select>
                        <select
                          defaultValue={item.category}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="tuition">Tuition</option>
                          <option value="transport">Transport</option>
                          <option value="library">Library</option>
                          <option value="development">Development</option>
                          <option value="sports">Sports</option>
                        </select>
                      </div>
                    )) || (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Fee Name"
                        />
                        <input
                          type="number"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Amount"
                        />
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="half_yearly">Half Yearly</option>
                        </select>
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                          <option value="tuition">Tuition</option>
                          <option value="transport">Transport</option>
                          <option value="library">Library</option>
                          <option value="development">Development</option>
                          <option value="sports">Sports</option>
                        </select>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                  >
                    + Add Fee Item
                  </button>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      setEditingStructure(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    {showCreateModal ? 'Create Structure' : 'Update Structure'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeStructureManager;