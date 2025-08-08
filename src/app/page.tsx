'use client';
import { useState } from 'react';
import Link from 'next/link';
import './home.css';

interface Category {
  name: string;
  key: string;
  description: string;
  path: string;
  entranceFees: FeeRow[];
  annualFees: FeeRow[];
}

interface FeeRow {
  label: string;
  fee: number;
  pra: number;
  total: number;
}

export default function HomePage() {
  const [visibleCategory, setVisibleCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      name: 'General',
      key: 'general',
      description: 'For general products and services registration',
      path: '/general',
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
      description: 'For healthcare-related products and medical devices',
      path: '/healthcare',
      entranceFees: [
        { label: 'Healthcare 1 GTIN', fee: 25000, pra: 4000, total: 29000 },
        { label: 'Healthcare 10 GTINs', fee: 40000, pra: 6400, total: 46400 },
      ],
      annualFees: [
        { label: 'Healthcare Annual 1 GTIN', fee: 10000, pra: 1600, total: 11600 },
        { label: 'Healthcare Annual 10 GTINs', fee: 15000, pra: 2400, total: 17400 },
      ]
    },
    {
      name: 'UDI',
      key: 'udi',
      description: 'For Unique Device Identification products',
      path: '/udi',
      entranceFees: [
        { label: 'UDI Base Fee', fee: 30000, pra: 4800, total: 34800 }
      ],
      annualFees: [
        { label: 'UDI Annual Fee', fee: 12000, pra: 1920, total: 13920 }
      ]
    },
    {
      name: 'Textile',
      key: 'textile',
      description: 'For textile products and garment industry',
      path: '/textile',
      entranceFees: [
        { label: 'Textile 1 GTIN', fee: 18000, pra: 2880, total: 20880 },
        { label: 'Textile Bulk GTINs', fee: 36000, pra: 5760, total: 41760 },
      ],
      annualFees: [
        { label: 'Textile Annual 1 GTIN', fee: 8000, pra: 1280, total: 9280 },
        { label: 'Textile Annual Bulk', fee: 16000, pra: 2560, total: 18560 },
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
                <p>{category.description}</p>
              </div>
              <Link href={category.path} className="card-link">
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
                  <p className="category-desc">{category.description}</p>
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
                  {category.key === 'general'  && (
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







<section className="banking-section">
<section className="verification-section">
  <h2 className="section-title">Barcode Verification Charges</h2>
<div className="verification-columns-wrapper">
  {/* 1D Barcode Verification */}
  <div className="verification-table-wrapper">
    <h4 className="h4">Healthcare</h4>
    <h3 className="fee-title">Barcode Verification Fees: (1D)</h3>
    <div className="fee-table">
      <div className="fee-row fee-header">
        <div>Description</div>
        <div>Qty</div>
        <div>Per Unit</div>
        <div>Punjab Revenue Authority (16%)</div>
        <div>Total Fee</div>
      </div>
      <div className="fee-row">
        <div>GTIN - 13’s</div>
        <div>1-10 (Per GTINs)</div>
        <div>PKR 750</div>
        <div>PKR 120</div>
        <div className="fee-total">PKR 870</div>
      </div>
      <div className="fee-row">
        <div>GTIN - 13’s</div>
        <div>Above 10 (Per GTINs)</div>
        <div>PKR 700</div>
        <div>PKR 112</div>
        <div className="fee-total">PKR 812</div>
      </div>
    </div>
  </div>

  {/* 2D Data Matrix Verification */}
  <div className="verification-table-wrapper">
    <h3 className="fee-title">Barcode Verification Fees: (2D) Data Matrix</h3>
    <div className="fee-table">
      <div className="fee-row fee-header">
        <div>Description</div>
        <div>Qty</div>
        <div>Per Unit</div>
        <div>Punjab Revenue Authority (16%)</div>
        <div>Total Fee</div>
      </div>
      <div className="fee-row">
        <div>2D Data Matrix - 14’s</div>
        <div>1-10 (Per GTINs)</div>
        <div>PKR 1,196</div>
        <div>PKR 191</div>
        <div className="fee-total">PKR 1,387</div>
      </div>
      <div className="fee-row">
        <div>2D Data Matrix - 14’s</div>
        <div>Above 10 (Per GTINs)</div>
        <div>PKR 1,087</div>
        <div>PKR 174</div>
        <div className="fee-total">PKR 1,261</div>
      </div>
    </div>
  </div>
  <div className="verification-table-wrapper">
    <h4 className="h4">Healthcare</h4>
    <h3 className="fee-title">Barcode Verification Fees: (1D)</h3>
    <div className="fee-table">
      <div className="fee-row fee-header">
        <div>Description</div>
        <div>Qty</div>
        <div>Per Unit</div>
        <div>Punjab Revenue Authority (16%)</div>
        <div>Total Fee</div>
      </div>
      <div className="fee-row">
        <div>GTIN - 13’s</div>
        <div>1-10 (Per GTINs)</div>
        <div>PKR 750</div>
        <div>PKR 120</div>
        <div className="fee-total">PKR 870</div>
      </div>
      <div className="fee-row">
        <div>GTIN - 13’s</div>
        <div>Above 10 (Per GTINs)</div>
        <div>PKR 700</div>
        <div>PKR 112</div>
        <div className="fee-total">PKR 812</div>
      </div>
    </div>
  </div>

  {/* 2D Data Matrix Verification */}
  <div className="verification-table-wrapper">
    <h3 className="fee-title">Barcode Verification Fees: (2D) Data Matrix</h3>
    <div className="fee-table">
      <div className="fee-row fee-header">
        <div>Description</div>
        <div>Qty</div>
        <div>Per Unit</div>
        <div>Punjab Revenue Authority (16%)</div>
        <div>Total Fee</div>
      </div>
      <div className="fee-row">
        <div>2D Data Matrix - 14’s</div>
        <div>1-10 (Per GTINs)</div>
        <div>PKR 1,196</div>
        <div>PKR 191</div>
        <div className="fee-total">PKR 1,387</div>
      </div>
      <div className="fee-row">
        <div>2D Data Matrix - 14’s</div>
        <div>Above 10 (Per GTINs)</div>
        <div>PKR 1,087</div>
        <div>PKR 174</ div>
        <div className="fee-total">PKR 1,261</div>
      </div>
    </div>
  </div> 
  </div>

</section>
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
            <p>Phone: <a href="tel:+924211111475">+92-42-111-111-475</a></p>
            <p>Address: GS1 Pakistan, Lahore Chamber of Commerce & Industry Building, Lahore, Pakistan</p>
          </div>
        </div>
      </footer>
    </main>
  );
}