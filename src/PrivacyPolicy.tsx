import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '2rem', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Privacy Policy for Malvinka</h2>
      <p style={{ marginBottom: '1rem' }}><strong>Effective Date:</strong> September 28, 2026</p>
      
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Introduction</h3>
      <p style={{ marginBottom: '1rem' }}>Welcome to Malvinka (malvinka.ca). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our curated deal dashboard.</p>
      
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Affiliate Marketing, Tracking & FTC Disclosure</h3>
      <p style={{ marginBottom: '0.5rem' }}>Malvinka participates in affiliate marketing programs, primarily through the Awin network. When you click on outbound shopping links to our retail partners and make a purchase, we may earn a commission.</p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li><strong>Affiliate Tracking Cookies:</strong> To correctly attribute sales, our affiliate networks use tracking cookies and click IDs when you follow a promotional link.</li>
        <li><strong>Data Minimization:</strong> These networks collect non-sensitive technical data to verify transactions. They do not build behavioral profiles or collect banking details.</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Information We Collect Directly</h3>
      <p style={{ marginBottom: '1rem' }}>We only collect personal information that you voluntarily provide, such as saving specific brand promotions to your device.</p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>4. Contact Us</h3>
      <p>For any questions regarding this Privacy Policy, your data, or our affiliate relationships, please contact us at <strong>hello@malvinka.ca</strong>.</p>
    </div>
  );
}
