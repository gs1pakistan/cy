'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './general.css';

interface ContactInfo {
  designation: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

interface FormData {
  formName: string;
  companyName: string;
  streetAddress: string;
  city: string;
  province: string;
  postCode: string;
  telephone: string;
  email: string;
  ntn: string;
  companyRegNo: string;
  noOfEmployees: string;
  website: string;
  glnRequired: boolean;
  glnAddresses: string[];
  billingRequired: 'Yes' | 'No';
  billingAddresses: string[];
  ceo: ContactInfo;
  keyContact: ContactInfo;
  accountsContact: ContactInfo;
  selectedCategories: string[];
  selectedTypeofProduct: string[];
  GTINsRequired: string;
  GTIN8sRequired: string;
  GTIN8: string;
  userName: string;
  agreeTerms: boolean;
  uploadedImage: string | null;
  selectedFees: string[];
}

// Error Message Modal Component
interface ErrorModalProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, isVisible, type, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Focus management for accessibility
      const modal = document.querySelector('.error-message-modal') as HTMLElement;
      if (modal) modal.focus();
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`error-message-overlay ${type}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-title"
      aria-describedby="error-description"
    >
      <div
        className="error-message-modal"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="error-close-btn"
          onClick={onClose}
          aria-label="Close error message"
          type="button"
        >
          ×
        </button>

        <div className="error-icon-container">
          <div className="error-icon">{type === 'success' ? '✔' : '⚠'}</div>
        </div>

        {type === 'success' && (
          <div id="success-message" className="success-message">
            <h2>Form submitted successfully!</h2>
            <ul className="success-points">
              <li>A copy of your application will be emailed within 60 seconds — please check your inbox.</li>
              <li>After reviewing your application, you will receive an invoice shortly.</li>
              <li>Please complete the payment and share proof of payment.</li>
              <li>Your application will remain on hold until the payment is confirmed.</li>
            </ul>

          </div>
        )}



        {type === 'error' && (
          <h2 id="error-title" className="error-title">

          </h2>
        )}

        <div id="error-description" className="error-message-text">
          {message}
        </div>

        <button className="error-action-btn" onClick={onClose} type="button">
          Got it, thanks!
        </button>
      </div>
    </div>

  );
};

const categories = [
  'Agricultural',
  'Bakery Products', ' Beverages',
  'Building Materials',
  'Chemicals',
  'Cigarettes',
  'Cleaning Products',
  'Computer Software',
  'Detergents',
  'Eggs',
  'Electric Heaters',
  "Equipment's",
  'Food',
  'Fruit Juices',
  'Confectionery',
  'Sea Foods',
  'Snack Foods',
  'Dairy Products',
  'Industrial Goods',
  'Mineral water',
  'Paper & Stationery',
  'Perfume & Cosmetics',
  'Soaps',
  'Sports Goods',
  'Tea',
  'Tissue Papers',
  'Toiletries',
  'Rice',
  'Toys',
  'Fruits and Vegetables Export',
];

const GeneralForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [format, setFormat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorType, setErrorType] = useState<'error' | 'success'>('error');

  const initialFormState: FormData = {
    formName: 'General Form',
    companyName: '',
    streetAddress: '',
    city: '',
    province: '',
    postCode: '',
    telephone: '',
    email: '',
    ntn: '',
    companyRegNo: '',
    noOfEmployees: '',
    website: '',
    glnRequired: false,
    glnAddresses: [],
    billingRequired: 'No',
    billingAddresses: [],
    ceo: {
      designation: 'CEO',
      title: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    },
    keyContact: {
      designation: '',
      title: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    },
    accountsContact: {
      designation: '',
      title: 'Mr.',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    },
    selectedCategories: [],
    selectedTypeofProduct: [],
    GTINsRequired: '10',
    GTIN8sRequired: 'no',
    GTIN8: '',
    userName: '',
    agreeTerms: false,
    uploadedImage: null,
    selectedFees: [],
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [showErrors, setShowErrors] = useState(false);

  // Function to show error modal
  const showError = (msg: string, type: 'error' | 'success' = 'error') => {
    setErrorMessage(msg);
    setErrorType(type);
    setShowErrorModal(true);
  };

  const hideError = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContactChange = (
    contactType: keyof Pick<FormData, 'ceo' | 'keyContact' | 'accountsContact'>,
    field: keyof ContactInfo,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [contactType]: {
        ...prev[contactType],
        [field]: value,
      },
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  // Dropdown states
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFeeToggle = (fee: string) => {
    const sanitizedFeeId = fee.replace(/\s+/g, '-').toLowerCase();
    const checkbox = document.getElementById(`annual-${sanitizedFeeId}`);
    if (!checkbox) return;

    const row = checkbox.closest('tr');
    if (!row) return;

    row.classList.add('changing-selection');

    setTimeout(() => {
      setFormData(prevData => {
        const currentFees = prevData.selectedFees || [];
        const isSelected = currentFees.includes(fee);

        return {
          ...prevData,
          selectedFees: isSelected ? [] : [fee],
        };
      });

      setTimeout(() => {
        row.classList.remove('changing-selection');
      }, 300);
    }, 100);
  };

  // UPDATE 1: Enhanced image upload with validation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        showError('Please upload only image files (JPG, PNG, etc.)');
        e.target.value = ''; // Clear the input
        return;
      }

      // Check file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        showError('File size must be less than 1MB. Please choose a smaller image.');
        e.target.value = ''; // Clear the input
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          uploadedImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...formData.glnAddresses];
    updatedAddresses[index] = value;
    setFormData((prev) => ({
      ...prev,
      glnAddresses: updatedAddresses,
    }));
  };

  const addAddressField = () => {
    if (formData.glnAddresses.length < 20) {
      setFormData((prev) => ({
        ...prev,
        glnAddresses: [...prev.glnAddresses, ''],
      }));
    }
  };

  const removeAddressField = (index: number) => {
    const updated = [...formData.glnAddresses];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      glnAddresses: updated,
    }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:

        // Helper function to validate NTN format
        const isValidNTN = (value: string): boolean => {
          const ntnRegex = /^[A-Z0-9]{7}-[0-9]{1}$/;
          return value.length === 9 && ntnRegex.test(value);
        };

        // Helper function to validate CNIC format
        const isValidCNIC = (value: string): boolean => {
          const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
          return value.length === 15 && cnicRegex.test(value);
        };

        // Helper function to validate telephone format
        const isValidTelephone = (value: string): boolean => {
          return value.startsWith('92') && value.length >= 7;
        };

        // Helper function to validate website format
        const isValidWebsite = (value: string): boolean => {
          if (value === '') return true; // No website is valid
          return value.startsWith('www.') && value.length > 8;
        };

        // Helper function to validate email format
        const isValidEmail = (value: string): boolean => {
          // Must contain @ symbol and have text before and after it
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        };

        // Check if format is selected and NTN/CNIC is properly filled
        let isNtnCnicValid: boolean = false;

        if (format === 'NTN') {
          isNtnCnicValid = !!(formData.ntn && isValidNTN(formData.ntn));
        } else if (format === 'CNIC') {
          isNtnCnicValid = !!(formData.ntn && isValidCNIC(formData.ntn));
        }

        return (
          !!formData.formName &&
          !!formData.companyName &&
          !!formData.streetAddress &&
          !!formData.city &&
          !!formData.province &&
          !!formData.postCode &&
          !!formData.telephone &&
          isValidTelephone(formData.telephone) &&
          !!formData.email &&
          isValidEmail(formData.email) &&
          !!formData.noOfEmployees &&
          !!format &&
          isNtnCnicValid &&
          isValidWebsite(formData.website)
        );

      case 2:
        return (
          formData.glnRequired || formData.glnAddresses.every((addr) => !!addr) &&
          !!formData.GTINsRequired &&
          (formData.GTIN8sRequired === 'no' || !!formData.GTIN8)
        );

      case 3:
        return (
          !!formData.ceo.designation &&
          !!formData.ceo.title &&
          !!formData.ceo.firstName &&
          !!formData.ceo.lastName &&
          !!formData.ceo.email &&
          !!formData.ceo.telephone
        );

      case 4:
        return (
          !!formData.keyContact.designation &&
          !!formData.keyContact.title &&
          !!formData.keyContact.firstName &&
          !!formData.keyContact.lastName &&
          !!formData.keyContact.email &&
          !!formData.keyContact.telephone
        );

      case 5:
        return (
          !!formData.accountsContact.designation &&
          !!formData.accountsContact.title &&
          !!formData.accountsContact.firstName &&
          !!formData.accountsContact.lastName &&
          !!formData.accountsContact.email &&
          !!formData.accountsContact.telephone
        );

      case 6:
        // UPDATE 2: Modified validation for step 6
        const categoriesValid = formData.selectedCategories.length > 0;
        const gtin8Valid = formData.GTIN8sRequired === 'no' || !!formData.GTIN8;
        // If GTIN8sRequired is 'no', then selectedFees is required
        const selectedFeesValid = formData.GTIN8sRequired === 'yes' || formData.selectedFees.length > 0;
        
        return categoriesValid && gtin8Valid && selectedFeesValid;

      case 7:
        return !!formData.userName && !!formData.uploadedImage && formData.agreeTerms;

      default:
        return true;
    }
  };

  const nextStep = () => {
    const isValid = validateStep();

    if (isValid && currentStep < 7) {
      setShowErrors(false);
      setCurrentStep(currentStep + 1);
    } else {
      setShowErrors(true);

      // UPDATE 3: Set the generic message first
      let errorMessage = 'Please fill all required fields correctly before proceeding.';

      if (currentStep === 1) {
        if (!format) {
          errorMessage = 'Please fill all required fields (*) correctly before proceeding.';
        } else if (format === 'NTN' && (!formData.ntn || formData.ntn.length !== 9)) {
          errorMessage = 'Please complete the NTN field in format: AB12345-6';
        } else if (format === 'CNIC' && (!formData.ntn || formData.ntn.length !== 15)) {
          errorMessage = 'Please complete the CNIC field in format: 12345-1234567-1';
        } else if (!formData.telephone || formData.telephone.length < 7) {
          errorMessage = 'Please enter a valid telephone number (e.g., 923001234567)';
        } else if (!formData.email || !formData.email.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errorMessage = 'Please enter a valid email address (e.g., example@company.com)';
        } else if (formData.website !== '' && formData.website.length <= 8) {
          errorMessage = 'Please enter a complete website URL (e.g.,www.example.com)';
        } else if (formData.glnRequired) {
          const validAddresses = formData.glnAddresses.filter(addr =>
            addr !== '-' && addr.trim() !== ''
          );
          if (validAddresses.length === 0) {
            errorMessage = 'Please enter at least one GLN address or select "No" if GLN is not required.';
          }
        }
      } else if (currentStep === 2) {
        if (formData.glnRequired) {
          const validAddresses = formData.glnAddresses.filter(addr =>
            addr !== '-' && addr.trim() !== ''
          );
          if (validAddresses.length === 0) {
            errorMessage = 'Please enter at least one GLN address.';
          }
        }

        if (!formData.GTINsRequired) {
          errorMessage = 'Please select whether you require GTINs.';
        } else if (formData.GTIN8sRequired === 'yes' && !formData.GTIN8) {
          errorMessage = 'Please enter GTIN8 information.';
        }
      } else if (currentStep === 6) {
        // UPDATE 2: Enhanced validation for step 6
        if (formData.selectedCategories.length === 0) {
          errorMessage = 'Please select at least one product category.';
        } else if (formData.GTIN8sRequired === 'yes' && !formData.GTIN8) {
          errorMessage = 'Please enter GTIN8 information.';
        } else if (formData.GTIN8sRequired === 'no' && formData.selectedFees.length === 0) {
          errorMessage = 'Please select the required number of Global Trade Item Numbers (GTINs).';
        }
      } else if (currentStep === 7) {
        if (!formData.userName) {
          errorMessage = 'Please enter your full name.';
        } else if (!formData.uploadedImage) {
          errorMessage = 'Please upload your signature.';
        } else if (!formData.agreeTerms) {
          errorMessage = 'Please agree to the terms and conditions.';
        }
      }

      showError(errorMessage);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateStep();

    if (!isValid) {
      setShowErrors(true);

      let errorMessage = 'Please fill all required fields correctly.';

      if (!formData.userName) {
        errorMessage = 'Please enter your full name.';
      } else if (!formData.uploadedImage) {
        errorMessage = 'Please upload your signature.';
      } else if (!formData.agreeTerms) {
        errorMessage = 'Please agree to the terms and conditions.';
      }

      showError(errorMessage);
      return;
    }

    setIsSubmitting(true);

    // Background submission
    fetch('https://script.google.com/macros/s/AKfycbzph-lqGAlt_pE2GX0ZknTn7Thvb9qsGU6apz_ZyYTMIZJbFNtBN7PbV_tRDvemOBm8GA/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // Instant UI reset
    showError('Further details are in the email.', 'success');
    setFormData(initialFormState);
    setCurrentStep(1);
    setShowErrors(false);
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {

      case 1:
        return (
          <div className="step-content">
            <h2>Company Information</h2>
            <div className="form-grid">
              <input
                type="hidden"
                name="formName"
                value={formData.formName}
              />
              <div className="form-group">
                <label htmlFor="companyName">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Note: Ensure company name matches NTN."
                  value={formData.companyName}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value.length > 0 && /^[a-zA-Z]/.test(value.charAt(0))) {
                      value = value.charAt(0).toUpperCase() + value.slice(1);
                    }
                    setFormData({ ...formData, companyName: value });
                  }}
                  required
                />

              </div>
              <div className="form-group">
                <label htmlFor="streetAddress">Street Address *</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    if (value.length > 0) {
                      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    }
                    setFormData({ ...formData, city: value });
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="province">State/Province *</label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Province</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="postCode">Postal Code *</label>
                <input
                  type="text"
                  id="postCode"
                  name="postCode"
                  value={formData.postCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setFormData({ ...formData, postCode: value });
                    }
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Telephone (Including City Codes) *</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone.startsWith('92') ? formData.telephone : '92'}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (!value.startsWith('92')) {
                      value = '92';
                    }
                    setFormData({ ...formData, telephone: value });
                  }}
                  placeholder="923001234567 (minimum 5 digits after 92)"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Company Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@company.com"
                  required
                />
                Please provide the official company email address.
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '5px 0' }}>
                  <label htmlFor="ntn">
                    Select whether you&apos;re entering*
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="radio"
                      name="idFormat"
                      value="NTN"
                      checked={format === 'NTN'}
                      onChange={() => {
                        setFormat('NTN');
                        setFormData({ ...formData, ntn: '' });
                      }}
                    />
                    &nbsp; NTN
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="radio"
                      name="idFormat"
                      value="CNIC"
                      checked={format === 'CNIC'}
                      onChange={() => {
                        setFormat('CNIC');
                        setFormData({ ...formData, ntn: '' });
                      }}
                    />
                    &nbsp;CNIC
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="ntn"
                    name="ntn"
                    value={formData.ntn}
                    onChange={(e) => {
                      let value = e.target.value;

                      if (format === 'NTN') {
                        value = value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
                        const match = value.match(/^([A-Z0-9]{0,7})(-?)(\d?)$/);
                        if (match) {
                          const part1 = match[1];
                          const part2 = match[3];
                          value = part1 + (part1.length === 7 ? '-' : '') + part2;
                        }
                        value = value.slice(0, 9);
                      } else if (format === 'CNIC') {
                        value = value.replace(/[^0-9]/g, '');
                        if (value.length <= 5) {
                          value = value;
                        } else if (value.length <= 12) {
                          value = `${value.slice(0, 5)}-${value.slice(5)}`;
                        } else {
                          value = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12, 13)}`;
                        }
                        value = value.slice(0, 15);
                      }

                      setFormData({ ...formData, ntn: value });
                    }}
                    placeholder={
                      format === 'CNIC'
                        ? 'e.g. 12345-1234567-1'
                        : format === 'NTN'
                          ? 'e.g. AB12345-6'
                          : ''
                    }
                    disabled={!format}
                    required
                  />
                  NTN is mandatory; if unavailable, provide CNIC instead.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="companyRegNo">SECP Company Registration Number </label>
                <input
                  type="text"
                  id="companyRegNo"
                  name="companyRegNo"
                  value={formData.companyRegNo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="noOfEmployees">Number of Employees *</label>
                <input
                  type="number"
                  id="noOfEmployees"
                  name="noOfEmployees"
                  value={formData.noOfEmployees}
                  onChange={handleInputChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Do you have a website?</label>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="website"
                      value="yes"
                      checked={formData.website !== ''}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          website: 'www.',
                        }))
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="website"
                      value="no"
                      checked={formData.website === ''}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          website: '',
                        }))
                      }
                    />
                    No
                  </label>
                </div>
                {formData.website !== '' && (
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="www.example.com"
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2 className="text-2xl font-bold mb-6">GLN and Billing Information</h2>
            <div className="gln-section">
              <label className="label">Do you require GLN?</label>
              <div className="radio-options">
                {['yes', 'no'].map((option) => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name="glnRequired"
                      value={option}
                      checked={formData.glnRequired === (option === 'yes')}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          glnRequired: option === 'yes',
                          glnAddresses: option === 'yes'
                            ? (prev.glnAddresses.length === 0 || prev.glnAddresses[0] === '-' ? [''] : prev.glnAddresses)
                            : ['-'],
                        }))
                      }
                      className="radio-input"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                ))}
              </div>
              {formData.glnRequired && (
                <div className="gln-addresses">
                  <label className="label">Please Provide Complete <strong>GLN address </strong>if it is different from above mentioned address </label>
                  {formData.glnAddresses.filter(addr => addr !== '-').map((address, index) => (
                    <div key={index} className="address-row">
                      <textarea
                        value={address}
                        onChange={(e) => handleAddressChange(index, e.target.value)}
                        placeholder={`Enter address ${index + 1}`}
                        className="address-textarea"
                        rows={3}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeAddressField(index)}
                        className="remove-btn"
                      >
                        −
                      </button>
                    </div>
                  ))}
                  {formData.glnAddresses.length < 20 && (
                    <button type="button" onClick={addAddressField} className="add-btn">
                      + Add Address
                    </button>
                  )}
                  <p className="total-count">Total GLNs: {formData.glnAddresses.filter(addr => addr !== '-' && addr.trim() !== '').length}</p>
                </div>
              )}
            </div>

            <div className="gln-section">
              <div className="form-group">
                <label>Do you require a separate Billing Address?</label>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="billingRequired"
                      value="yes"
                      checked={formData.billingRequired === 'Yes'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          billingRequired: 'Yes',
                          billingAddresses: prev.billingAddresses[0] === '-' ? [''] : prev.billingAddresses.length === 0 ? [''] : prev.billingAddresses,
                        }))
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="billingRequired"
                      value="no"
                      checked={formData.billingRequired === 'No'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          billingRequired: 'No',
                          billingAddresses: ['-'],
                        }))
                      }
                    />
                    No
                  </label>
                </div>

                {formData.billingRequired === 'Yes' && (
                  <div className="form-group">
                    <label htmlFor="billingAddress">Please Insert Full Billing Address Below</label>
                    <textarea
                      id="billingAddress"
                      name="billingAddress"
                      value={formData.billingAddresses[0] === '-' ? '' : (formData.billingAddresses[0] || '')}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          billingAddresses: [e.target.value],
                        }))
                      }
                      placeholder="Enter billing address"
                      rows={3}
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>CEO / Managing Director Contact</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="ceo-designation">Designation *</label>
                <select
                  id="ceo-designation"
                  value={formData.ceo.designation}
                  onChange={(e) => handleContactChange('ceo', 'designation', e.target.value)}
                  required
                >
                  <option value="CEO">CEO</option>
                  <option value="Managing Director">Managing Director</option>
                  <option value="Proprietor">Proprietor</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ceo-title">Title *</label>
                <select
                  id="ceo-title"
                  value={formData.ceo.title}
                  onChange={(e) => handleContactChange('ceo', 'title', e.target.value)}
                  required
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ceo-firstName">First Name *</label>
                <input
                  type="text"
                  id="ceo-firstName"
                  value={formData.ceo.firstName}
                  onChange={(e) => handleContactChange('ceo', 'firstName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ceo-lastName">Last Name *</label>
                <input
                  type="text"
                  id="ceo-lastName"
                  value={formData.ceo.lastName}
                  onChange={(e) => handleContactChange('ceo', 'lastName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ceo-email">Email *</label>
                <input
                  type="email"
                  id="ceo-email"
                  value={formData.ceo.email}
                  onChange={(e) => handleContactChange('ceo', 'email', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ceo-telephone">Mobile or Telephone Number *</label>
                <input
                  type="tel"
                  id="ceo-telephone"
                  value={formData.ceo.telephone}
                  onChange={(e) => handleContactChange('ceo', 'telephone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <h2>Key Contact for GS1 Activate Tool</h2>
            <h3>Kindly enter information of the person responsible for using the GS1 Activate Tool.</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="keyContact-designation">Designation *</label>
                <input
                  type="text"
                  id="keyContact-designation"
                  value={formData.keyContact.designation}
                  onChange={(e) => handleContactChange('keyContact', 'designation', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="keyContact-title">Title *</label>
                <select
                  id="keyContact-title"
                  value={formData.keyContact.title}
                  onChange={(e) => handleContactChange('keyContact', 'title', e.target.value)}
                  required
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="keyContact-firstName">First Name *</label>
                <input
                  type="text"
                  id="keyContact-firstName"
                  value={formData.keyContact.firstName}
                  onChange={(e) => handleContactChange('keyContact', 'firstName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="keyContact-lastName">Last Name *</label>
                <input
                  type="text"
                  id="keyContact-lastName"
                  value={formData.keyContact.lastName}
                  onChange={(e) => handleContactChange('keyContact', 'lastName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="keyContact-email">Email *</label>
                <input
                  type="email"
                  id="keyContact-email"
                  value={formData.keyContact.email}
                  onChange={(e) => handleContactChange('keyContact', 'email', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="keyContact-telephone">Mobile or Telephone Number *</label>
                <input
                  type="tel"
                  id="keyContact-telephone"
                  value={formData.keyContact.telephone}
                  onChange={(e) => handleContactChange('keyContact', 'telephone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h2>Accounts Contact Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="accountsContact-designation">Designation *</label>
                <input
                  type="text"
                  id="accountsContact-designation"
                  value={formData.accountsContact.designation}
                  onChange={(e) => handleContactChange('accountsContact', 'designation', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountsContact-title">Title *</label>
                <select
                  id="accountsContact-title"
                  value={formData.accountsContact.title}
                  onChange={(e) => handleContactChange('accountsContact', 'title', e.target.value)}
                  required
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="accountsContact-firstName">First Name *</label>
                <input
                  type="text"
                  id="accountsContact-firstName"
                  value={formData.accountsContact.firstName}
                  onChange={(e) => handleContactChange('accountsContact', 'firstName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountsContact-lastName">Last Name *</label>
                <input
                  type="text"
                  id="accountsContact-lastName"
                  value={formData.accountsContact.lastName}
                  onChange={(e) => handleContactChange('accountsContact', 'lastName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountsContact-email">Accounts Email *</label>
                <input
                  type="email"
                  id="accountsContact-email"
                  value={formData.accountsContact.email}
                  onChange={(e) => handleContactChange('accountsContact', 'email', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountsContact-telephone">Mobile or Telephone Number *</label>
                <input
                  type="tel"
                  id="accountsContact-telephone"
                  value={formData.accountsContact.telephone}
                  onChange={(e) => handleContactChange('accountsContact', 'telephone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <h2>Product Information</h2>

            {/* Updated Dropdown for Categories */}
            <div className="form-group">
              <label>Product Categories *</label>
              <div className={`dropdown-container ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
                <div className="dropdown-header" onClick={toggleDropdown}>
                  <span>
                    {formData.selectedCategories.length > 0
                      ? `${formData.selectedCategories.length} categories selected`
                      : 'Select categories...'
                    }
                  </span>
                  <span className="dropdown-arrow">▼</span>
                </div>

                {isOpen && (
                  <div className="dropdown-options">
                    {categories.map((category) => (
                      <label key={category} className="dropdown-option">
                        <input
                          type="checkbox"
                          checked={formData.selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Show selected categories */}
              {formData.selectedCategories.length > 0 && (
                <div className="selected-categories">
                  <small>Selected: {formData.selectedCategories.join(', ')}</small>
                </div>
              )}
            </div>
            
            <div className="gln-section">
              <div className="form-group">
                <label>Do you require GTIN-8?</label>
                <p className="note">GTIN-8 numbers encoded in EAN-8 barcode symbols are used on very small retail items (e.g., cigarettes, cosmetics, etc.) where there is insufficient space on the label or package to include an EAN-13 barcode.
                </p>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="GTIN8sRequired"
                      value="yes"
                      checked={formData.GTIN8sRequired === 'yes'}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="GTIN8sRequired"
                      value="no"
                      checked={formData.GTIN8sRequired === 'no'}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
                {formData.GTIN8sRequired === 'yes' && (
                  <div className="form-group">
                    <label htmlFor="GTIN8">Enter the number of GTIN-8s. Annual fee: Rs. 3,488 per GTIN-8 + 16% PRA (minimum 10 GTIN-8s required).</label>
                    <input
                      type="number"
                      id="GTIN8"
                      name="GTIN8"
                      placeholder="Enter a number starting from 10 or higher. "
                      value={formData.GTIN8}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="fee-structure">
              <h3>Select the required number of Global Trade Item Numbers (GTINs) below.</h3>
              <div className="fee-table">
                {/* Entrance Fee Table */}

                <table>
                  <thead>
                    <tr>
                      <th>Entrance Fee (Incl. Govt. Taxes)</th>
                      <th>Base Fee</th>
                      <th>Tax (16%)</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>For 10 GTIN-13s </td>
                      <td>PKR 20,934 </td>
                      <td>PKR 3,349</td>
                      <td>PKR 24,284</td>
                    </tr>
                    <tr>
                      <td>Above 10 GTIN-13s
                        (50% of Normal Entrance Fee)</td>
                      <td>
                        PKR 41,870</td>
                      <td>PKR 6,699</td>
                      <td>PKR 48,569</td>
                    </tr>
                    <tr>
                      <td>For 1 GTIN-13s / GLN </td>
                      <td> PKR 20,934</td>
                      <td> PKR 3,349</td>
                      <td> PKR 24,284</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className='fee-description'>(Members availing 50% rate for Entrance Fee will be required to pay the balance amount of Rs.20,934/+16% PRA when
                applying for Additional Numbers).</p>
              {/* Annual Fee Table */}

              <div className="fee-table">
                <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Annual Fee (Incl. Govt. Taxes)</th>
                      <th>Base Fee</th>
                      <th>Tax (16%)</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="annual-1-gln"
                          checked={formData.selectedFees.includes('1 GLN')}
                          onChange={() => handleFeeToggle('1 GLN')}
                          disabled={formData.GTIN8sRequired === 'yes'}
                        />

                      </td>
                      <td>1 GTIN-13 / GLN</td>
                      <td>PKR 8,723</td>
                      <td>PKR 1,396</td>
                      <td>PKR 10,119</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="annual-10-gtins"
                          checked={formData.selectedFees.includes('10 GTINs')}
                          onChange={() => handleFeeToggle('10 GTINs')}
                          disabled={formData.GTIN8sRequired === 'yes'}
                        />
                      </td>
                      <td>10 GTIN-13s</td>
                      <td>PKR 8,723</td>
                      <td>PKR 1,396</td>
                      <td>PKR 10,119</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="annual-100-gtins"
                          checked={formData.selectedFees.includes('100 GTINs')}
                          onChange={() => handleFeeToggle('100 GTINs')}
                          disabled={formData.GTIN8sRequired === 'yes'}
                        />
                      </td>
                      <td>100 GTIN-13s</td>
                      <td>PKR 13,957</td>
                      <td>PKR 2,233</td>
                      <td>PKR 16,190</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="annual-300-gtins"
                          checked={formData.selectedFees.includes('300 GTINs')}
                          onChange={() => handleFeeToggle('300 GTINs')}
                          disabled={formData.GTIN8sRequired === 'yes'}
                        />
                      </td>
                      <td>300 GTIN-13s</td>
                      <td>PKR 17,445</td>
                      <td>PKR 2,793</td>
                      <td>PKR 20,238</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="annual-500-gtins"
                          checked={formData.selectedFees.includes('500 GTINs')}
                          onChange={() => handleFeeToggle('500 GTINs')}
                        />
                      </td>
                      <td>500 GTIN-13s</td>
                      <td>PKR 26,167</td>
                      <td>PKR 4,188</td>
                      <td>PKR 30,355</td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id="annual-1000-gtins"
                          checked={formData.selectedFees.includes('1000 GTINs')}
                          onChange={() => handleFeeToggle('1000 GTINs')}
                          disabled={formData.GTIN8sRequired === 'yes'}
                        />
                      </td>
                      <td>1,000 GTIN-13s</td>
                      <td>PKR 34,875</td>
                      <td>PKR 5,599</td>
                      <td>PKR 40,474</td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <p className='fee-description'>Annual fees are due from one calendar year after the allocation date.</p>
              <p className='fee-description'>Training is mandatory and its cost is included in the amount mentioned above.</p>
              <p className='fee-description'>From the second year onward, companies are required to pay the annual renewal fee. For example, if you request 300 GTIN-13s, you will need to pay Rs. 68,807/- (Entrance + Annual Fees) for the first year and Rs. 20,238/- in subsequent years.</p>
              <p className='fee-description'>Note: A late fee charge of 5% will apply to the renewal invoice if payment is made after the due date.</p>
              <p className='fee-description'>If you are a printer submitting products on behalf of a brand owner or manufacturer, the submission must be accompanied by a letter from that GS1 member accepting the charges.</p>
              <p className='fee-description'>Delivery of barcode test reports: Expected delivery time is 3–4 working days. The invoice will be issued to the company and the nominated contact person.</p>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <h2>Declaration & Signature</h2>

            {/* Terms and Conditions Section */}
            <div className="terms-conditions">
              <h3>Terms and Conditions</h3>
              <div className="terms-content">
                <div className="term-item">
                  <strong>1. Grant of License:</strong> GS1 Pakistan grants You a non-exclusive nontransferable license to use the GS1 company prefix in connection with the supply and sale of your products.
                </div>
                <div className="term-item">
                  <strong>2. Term:</strong> The License and these terms and conditions come into effect for You on the date on which GS1 Pakistan notifies You of its acceptance of your GS1 Company Prefix License and GS1 Pakistan Membership and continues until terminated as provided in clause 9.
                </div>

                <div className="term-item">
                  <strong>3. Fees:</strong> You must pay the Membership Fee to GS1 annually within 30 days of the date of GS1s invoice. GS1 may, from time to time, increase the Membership Fee. Where products bearing the GS1 identification numbers issued to You, as well as GS1 identification numbers associated with locations are already in the marketplace at the time the License is terminated, not with standing such termination, you will remain liable for a fee equivalent to the then current Membership Fee for the period that You continue to distribute those Products.
                </div>

                <div className="term-item">
                  <strong>4. Consent:</strong> Members understand and agree that its Data is shared by GS1 Pakistan with data recipients through both local and global GS1 services.
                </div>

                <div className="term-item">
                  <strong>5. Warranties:</strong> The Member represents and warrants that its Data: Originates from, is authorized or approved(validated) by the Member. Does not violate any third-party rights, including privacy rights, copyrights, trademarks, patents or other intellectual property rights of any third party, or violates any applicable laws or regulations, Does not contain any virus, Trojans, worms, logic bombs or any other materials which are malicious or technologically harmful.
                </div>

                <div className="term-item">
                  <strong>6. Data Quality:</strong> Member understands that Data will be validated against and shall comply with the validation rules [set out in the GS1 General Specifications, available via <a href="https://www.gs1.org/standards/barcodesepcrfid-id-keys/gs1-general-specifications" target="_blank" rel="noopener noreferrer">https://www.gs1.org/standards/barcodesepcrfid-id-keys/gs1-general-specifications</a>, the Global Data Dictionary] and any other technical specifications that may be implemented and/or as amended from time to time. Members shall be responsible for the quality of the data.
                </div>
                <div className="term-item">
                  <strong>7. Remedial Action:</strong> If GS1 Pakistan, in its sole discretion, suspects or believes that Data is submitted to or published in GS1 Activate Solution in violation of this agreement (e.g. it violates a third party intellectual property rights), it may take appropriate remedial action (including, without limitation, by temporarily suspending the availability of or definitively removing the said Data from the GS1 Activate and GS1 Registry Platform).
                </div>

                <div className="term-item">
                  <strong>8. Designees:</strong> If Member acts on behalf of (e.g. as an agent, distributor, content provider) a Principal Member (e.g. a manufacturer) to create, maintain, manage and/or deliver its Principal Member Data, Member must be able to demonstrate its authority to provide Principal Member Data for the purpose and grant the license set out in this agreement at all times and on GS1 Pakistan first request.
                </div>

                <div className="term-item">
                  <strong>9. Warranty Disclaimer:</strong> GS1 Pakistan makes no warranties, express or implied, and GS1 specifically disclaims any warranty of merchantability or fitness for a particular purpose. GS1 Pakistan does not guarantee that the GS1 Numbers will meet “all requirements” of Your business.
                </div>

                <div className="term-item">
                  <strong>10. Your Conduct:</strong> You must not at any time during the term of the Membership and License, or after its termination, do or omit to do anything whereby GS1’s goodwill or reputation may be prejudicially affected or brought into disrepute. You must comply with the technical standards set out in the GS1 Pakistan manuals/guidelines and such other directions as GS1 may give from time to time.
                </div>

                <div className="term-item">
                  <strong>11. Use of the GS1 Numbers:</strong> You must only use the GS1 numbers issued to You in connection with the manufacture, sale and identification of Your Products/Locations. You must not alter the GS1 numbers licensed to you in any way; You must not transfer, share, sell, lease, sub‐license or sub‐divide the GS1 numbers and permit them to be used by anyone else. You must recognize GS1 Pakistan’s title to the GS1 numbers and related intellectual property and must not at any time do or allow to be done any act or thing which may in any way impair GS1’s rights in regard to GS1 numbers or related intellectual property.
                </div>

                <div className="term-item">
                  <strong>12. Indemnity:</strong> Member shall fully indemnify, hold harmless and defend GS1 Pakistan, GS1 AISBL, as well as any GS1 Member Organization from and against all claims, actions, damages, liabilities, obligations, losses, settlements, judgments, costs and expenses (including reasonable attorneys’ fees and costs), brought by any consumer, government agency or other third party which arise out of, relate to or result from: Any allegation that any use, publication or distribution of Member Data infringes any patent, copyright, trademark, database right or other intellectual property right. Any breach or alleged breach of this agreement or any applicable laws or regulations by Member and/or its Authorized Users; and/or Any allegation that any Member Data has been made available in breach of the Member warranties given herein.
                </div>

                <div className="term-item">
                  <strong>13. Limitation of Liability:</strong> To the full extent permitted by law, GS1 Pakistan excludes all liability in connection with this License for any indirect or consequential loss or damage, including lost profits and revenue. To the full extent permitted by law, GS1 Pakistan’s total liability to You for loss or damage of any kind arising out of this License which is not excluded by clause 13 is limited, for any and all claims, to the total License Fee paid during the 12‐month period prior to the relevant liability accruing. Members shall be liable for the data it shares in GS1 Activate. To the fullest extent permitted by law, neither GS1 Pakistan, GS1 AISBL nor any other GS1 Member Organization shall be liable to a third party for any harm, effects or damages whatsoever, including but not limited to actual, direct, consequential, indirect, incidental or punitive damages, even if advised of the possibility of such damages, arising out of or in relation to the third party’s use of Member’s Data.
                </div>

                <div className="term-item">
                  <strong>14. Termination:</strong> GS1 Pakistan may terminate the license immediately by giving notice if: You fail to pay the Membership Fee by its due date; You commit a breach of Your obligations under these terms and conditions; You are declared bankrupt, go into liquidation, have a receiver or other controller appointed, or (being a company) are wound up otherwise than for the purpose of a reconstruction. Either GS1 Pakistan or You may terminate this Membership Agreement and License in any other circumstances by giving six months’ written notice to the other party. Termination of this Membership Agreement and License does not relieve either GS1 or You from liability arising from any prior breach of the terms of this Agreement.
                </div>

                <div className="term-item">
                  <strong>15. Consequences of Termination:</strong> On termination of the Membership Agreement, your rights under this Agreement terminate and You must: Immediately cease applying the GS1 Numbers and Barcodes to any of your Products manufactured or sold by You after the termination date, as well as to any locations associated with you and within 30 days, pay to GS1 Pakistan all amounts due to GS1 Pakistan under this License at the termination date. You are not entitled to any rebate or refund of the Membership Fee or any other fees or charges paid under this License, unless this License expressly states otherwise. The termination or expiry of this Agreement does not affect those provisions, which by their nature survive termination, including clause 13 and 14. Notwithstanding termination of the GS1 Pakistan License Agreement, GS1 may retain the data provided by Member. (By default, such data will be shown but marked as no longer updated. Members may however request that GS1 no longer shows the data.)
                </div>

                <div className="term-item">
                  <strong>16. General Provisions:</strong> All notices and other communications in connection with this Membership Agreement and License must be in writing and take effect from the time they are received unless a later time is specified. Notices for You will be sent to the address specified on your Membership application (or such other address as You may notify GS1 Pakistan of from time to time). This Membership Agreement and License is governed by the law in force in Pakistan. Each party submits to the non‐exclusive jurisdiction of the courts of that place.
                </div>
              </div>

              <div className="terms-checkbox-container">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                />
                <label htmlFor="agreeTerms">I agree to all terms and conditions</label>

                {showErrors && !formData.agreeTerms && (
                  <p className="error-message">⯇ Please agree to the terms and conditions.</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="declaration">
                <p>

                  I/We <strong>{formData.userName || '[Name]'}</strong> hereby confirm that I/We have thoroughly read and fully understood all the Terms and Conditions of GS1 Pakistan, and willingly agree to them in their entirety without any reservations. I/We further affirm that all the information provided is true, accurate, and complete to the best of my/our knowledge and belief.
                </p>
              </div>
              <label htmlFor="userName">Authorized Person Full Name (as per official records) for Terms & Conditions acceptance.</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />

            </div>



            <div className="form-group">
              <label htmlFor="uploadedImage">Upload the signature of the authorized person.</label>
              <input
                type="file"
                id="uploadedImage"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              {formData.uploadedImage && (
                <div className="image-preview">
                  <Image
                    src={formData.uploadedImage}
                    alt="Signature Preview"
                    width={300}
                    height={100}
                    unoptimized // ⬅️ Add this line
                  />

                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-header-title">
          <h1 className="form-header">
            <span className="title-main">GS1 Pakistan </span>
            <span className="title-sub">  General Application Form</span>
          </h1>
        </div>
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && 'Company Info'}
                {step === 2 && 'GLN & Billing'}
                {step === 3 && 'CEO Contact'}
                {step === 4 && 'Key Contact'}
                {step === 5 && 'Accounts'}
                {step === 6 && 'Products'}
                {step === 7 && 'Declaration'}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="registration-form">
        {renderStepContent()}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="btn-secondary">
              Previous
            </button>
          )}
          {currentStep < 7 ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </form>

      {/* Error Modal */}
      <ErrorModal
        message={errorMessage}
        type={errorType}
        isVisible={showErrorModal}
        onClose={hideError}
      />
    </div>

  );
};

export default GeneralForm;
