'use client';
import { useState } from 'react';
import Link from 'next/link';
import './home.css';

interface Category {
  name: string;
  key: string;
  entranceFees: FeeRow[];
  annualFees: FeeRow[];
  verificationFees?: VerificationFeeSection[];
}

interface FeeRow {
  label: string;
  fee: number;
  pra: number;
  total: number;
}

interface VerificationFeeSection {
  title: string;
  fees: VerificationFeeRow[];
}

interface VerificationFeeRow {
  description: string;
  perUnit: number;
  pra: number;
  total: number;
}

export default function HomePage() {
  const [visibleCategory, setVisibleCategory] = useState<string | null>(null);

  // Separated paths object
  const categoryPaths = {
    general: '/general',
    healthcare: '/healthcare',
    udi: '/udi',
    textile: '/textile'
  };

  // Separated descriptions object
  const categoryDescriptions = {
    general: 'For general products and services registration',
    healthcare: 'For healthcare-related products and medical devices',
    udi: 'For Unique Device Identification products',
    textile: 'For textile products and garment industry'
  };

  const categories: Category[] = [
    {
      name: 'General',
      key: 'general',
      entranceFees: [
        { label: 'For 1 GTIN-13s / GLN', fee: 20934, pra: 3349, total: 24284 },
        { label: 'For 10 GTIN-13s', fee: 20934, pra: 3349, total: 24284 },
        { label: 'Above 10 GTIN-13s (50% Discount)', fee: 41870, pra: 6699, total: 48569 },
      ],
      annualFees: [
        { label: '1 GTIN-13 / GLN', fee: 8723, pra: 1396, total: 10119 },
        { label: '10 GTIN-13s', fee: 8723, pra: 1396, total: 10119 },
        { label: '100 GTIN-13s', fee: 13957, pra: 2233, total: 16190 },
        { label: '300 GTIN-13s', fee: 17446, pra: 2791, total: 20238 },
        { label: '500 GTIN-13s', fee: 26168, pra: 4187, total: 30355 },
        { label: '1,000 GTIN-13s', fee: 34891, pra: 5583, total: 40474 },
      ]
    },
    {
      name: 'Healthcare',
      key: 'healthcare',
      entranceFees: [
        { label: 'Healthcare for GLN 13s', fee: 33601, pra: 10752, total: 77953 },
        { label: 'Healthcare for GTINs 14s ', fee: 67201, pra: 5376, total: 38977 },
      ],
      annualFees:[
  { label: '1 GLN-13s', fee: 12037, pra: 1926, total: 13049 },
        { label: '100 GTIN-14s', fee: 19260, pra: 3082, total: 22341 },
        { label: '300 GTIN-14s', fee: 24075, pra: 3852, total: 27927 },
        { label: '500 GTIN-14s', fee: 36113, pra: 5778, total: 41891 },
        { label: '1,000 GTIN-14s', fee: 48151, pra: 7704, total: 55855 },
      ],
      verificationFees: [
        {
          title: 'Barcode Verification Fees: (1D)',
          fees: [
            { description: 'GTIN - 13\'s (1-10 Per GTINs)', perUnit: 750, pra: 120, total: 907 },
            { description: 'GTIN - 13\'s (Above 10 Per GTINs)', perUnit: 652, pra: 104, total: 756 },
          ]
        },
        {
          title: 'Barcode Verification Fees: (2D) Data Matrix',
          fees: [
            { description: '2D Data Matrix - 14\'s (1-10 Per GTINs)', perUnit: 1435, pra: 230, total: 1665 },
            { description: '2D Data Matrix - 14\'s (Above 10 Per GTINs)', perUnit: 1304, pra: 209, total: 1513 },
          ]
        }
      ]
    },
    {
      name: 'UDI',
      key: 'udi',
      entranceFees: [
 { label: 'UDI for GLN ', fee: 33601, pra: 10752, total: 77953 },
        { label: 'UDI for GTINs 14s ', fee: 67201, pra: 5376, total: 38977 },
      ],
      annualFees: [
               { label: '1 GLN-13s', fee: 36111, pra: 5778, total: 41889 },
        { label: '100 GTIN-14s', fee: 57778, pra: 9245, total: 67023 },
        { label: '300 GTIN-14s', fee: 72223, pra: 11556, total: 83779 },
        { label: '500 GTIN-14s', fee: 108339, pra: 17334, total: 125674 },
        { label: '1,000 GTIN-14s', fee: 144451, pra: 23112, total: 167563 },
      ],
      verificationFees: [
        {
          title: 'Barcode Verification Fees: (1D)',
          fees: [
            { description: 'GTIN - 13\'s (1-10 Per GTINs)', perUnit: 782, pra: 125, total: 907 },
            { description: 'GTIN - 13\'s (Above 10 Per GTINs)', perUnit: 652, pra: 104, total: 756 },
          ]
        },
        {
          title: 'Barcode Verification Fees: (2D) Data Matrix',
          fees: [
            { description: '2D Data Matrix - 14\'s (1-10 Per GTINs)', perUnit: 1435, pra: 230, total: 1665 },
            { description: '2D Data Matrix - 14\'s (Above 10 Per GTINs)', perUnit: 1304, pra: 209, total: 1513 },
          ]
        }
      ]
    },
    {
      name: 'Textile',
      key: 'textile',
      entranceFees: [
        { label: 'Textile GTINs-13s', fee: 41870, pra: 6699, total: 48569 },
        { label: 'Textile  GLNs -13s', fee: 32600, pra: 5216, total: 37816 },
      ],
      annualFees: [
               { label: '1 GLN-13s', fee: 8723, pra: 1396, total: 10119 },
        { label: '100 GTIN-13s', fee: 13957, pra: 2233, total: 16190 },
        { label: '1,000 GTIN-13s', fee: 34891, pra: 5583, total: 181321 },        
        { label: '10,000 GTIN-13s', fee: 156311, pra: 25010, total: 181321 },
        { label: '100,000 GTIN-13s', fee: 358691, pra: 57391, total: 416763 },
      ],
      verificationFees: [
        {
          title: 'Barcode Verification Fees: (1D)',
          fees: [
            { description: 'GTIN - 13\'s (1-10 Per GTINs)', perUnit: 750, pra: 120, total: 870 },
            { description: 'GTIN - 13\'s (Above 10 Per GTINs)', perUnit: 700, pra: 112, total: 812 },
          ]
        },
      ]
    }
  ];

  const toggleCategory = (key: string) => {
    setVisibleCategory(prev => (prev === key ? null : key));
  };

  const formatCurrency = (amount: number) => `PKR ${amount.toLocaleString()}`;

  const renderFeeTable = (title: string, fees: FeeRow[], showNote: boolean = false) => (
    <div className="fee-section">
      <h3 className="fee-title">{title}</h3>
      <div className="fee-table">
        <div className="fee-row fee-header">
          <div>GTIN-13s / GLN</div>
          <div>Fee Amount</div>
          <div>PRA (16%)</div>
          <div>Total</div>
        </div>
        {fees.map((row, index) => (
          <div key={index} className="fee-row">
            <div>{row.label}</div>
            <div>{formatCurrency(row.fee)}</div>
            <div>{formatCurrency(row.pra)}</div>
            <div className="fee-total">{formatCurrency(row.total)}</div>
          </div>
        ))}
      </div>
      {showNote && (
        <p className="fee-note">
          * Members availing 50% rate for Entrance Fee will be required to pay the balance amount of PKR 20,934 + 16% PRA when applying for additional numbers.
        </p>
      )}
    </div>
  );

  const renderVerificationFeeTable = (verificationSection: VerificationFeeSection) => (
    <div className="fee-section" key={verificationSection.title}>
      <h3 className="fee-title">{verificationSection.title}</h3>
      <div className="fee-table">
        <div className="fee-row fee-header">
          <div>Description</div>
          <div>Per Unit</div>
          <div>PRA (16%)</div>
          <div>Total Fee</div>
        </div>
        {verificationSection.fees.map((row, index) => (
          <div key={index} className="fee-row">
            <div>{row.description}</div>
            <div>{formatCurrency(row.perUnit)}</div>
            <div>{formatCurrency(row.pra)}</div>
            <div className="fee-total">{formatCurrency(row.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">GS1 Pakistan Online Applications</h1>
          <p className="hero-subtitle">Choose your registration type to begin your GS1 journey</p>
        </div>
      </header>

      {/* Registration Cards */}
      <section className="registration-section">
        <div className="card-grid">
          {categories.map((category) => (
            <div key={category.key} className="registration-card">
              <div className="card-header">
                <h3>{category.name} Registration</h3>
                <p>{categoryDescriptions[category.key as keyof typeof categoryDescriptions]}</p>
              </div>
              <Link href={categoryPaths[category.key as keyof typeof categoryPaths]} className="card-link">
                <button className="primary-button">Start Registration</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Banking Details */}
      <section className="banking-section">
        <h2 className="section-title">Banking Information for Payments</h2>
        <div className="banking-card">
          <div className="banking-info">
            <div className="info-row">
              <span className="info-label">Account Name:</span>
              <span className="info-value">GS1 Pakistan (Guarantee) Ltd</span>
            </div>
            <div className="info-row">
              <span className="info-label">Bank Name:</span>
              <span className="info-value">Habib Metropolitan Bank Ltd.</span>
            </div>
            <div className="info-row">
              <span className="info-label">Branch:</span>
              <span className="info-value">Paper Market Branch, New Challi, Karachi</span>
            </div>
            <div className="info-row">
              <span className="info-label">Account No:</span>
              <span className="info-value">6-01-13-20311-714-182748</span>
            </div>
            <div className="info-row">
              <span className="info-label">IBAN:</span>
              <span className="info-value">PK68 MPBL 0113 0271 4018 2748</span>
            </div>
            <div className="banking-note">
              <strong>Important:</strong> If you pay by bank transfer, please transfer the required amount <em>exclusive of local bank charges</em>.
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="fees-section">
        <h2 className="section-title">Detailed Pricing of all Categories</h2>
        <div className="fee-categories">
          {categories.map((category) => (
            <div key={category.key} className="fee-category-card">
              <div className="category-header">
                <div className="category-info">
                  <h3>{category.name} Category</h3>
                  <p className="category-desc">{categoryDescriptions[category.key as keyof typeof categoryDescriptions]}</p>
                </div>
                <button
                  className="toggle-button"
                  onClick={() => toggleCategory(category.key)}
                  aria-expanded={visibleCategory === category.key}
                >
                  {visibleCategory === category.key ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {visibleCategory === category.key && (
                <div className="fee-details">
                  {renderFeeTable('Entrance Fees', category.entranceFees, true)}
                  {renderFeeTable('Annual Fees', category.annualFees)}
                  
                  {/* Render Verification Fees if they exist */}
                  {category.verificationFees && category.verificationFees.map((verificationSection) => 
                    renderVerificationFeeTable(verificationSection)
                  )}
                  
                  {category.key === 'general' && (
                    <p className="fee-note">
                      * (Annual Fee Are Due from One Calendar Year of the Allocation Date)
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <h4>GS1 Pakistan</h4>
            <p>Enabling a world where things work together.</p>
          </div>
          <div className="footer-contact">
            <p>Email: <a href="mailto:info@gs1pk.org">info@gs1pk.org</a></p>
            <p>Phone: <a href="tel:021 32215844">021 32215844</a></p>
            <p>Address: 2nd Floor, Azzainab Court, Campbell Street, 74200 Karachi Pakistan </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
