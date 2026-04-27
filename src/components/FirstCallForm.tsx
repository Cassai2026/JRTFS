'use client';
import { useState } from 'react';
import { submitFirstCall } from '@/app/actions/caseActions';

export default function FirstCallForm() {
  const [animusData, setAnimusData] = useState({ fullName: '', location: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Call the secure Server Action we just created
    const result = await submitFirstCall(animusData);
    
    if (result.success) {
      alert('SUCCESS: Case mathematically locked into the database. Case ID: ' + result.caseId);
      // Clear the form
      setAnimusData({ fullName: '', location: '', phone: '' });
    } else {
      alert('ERROR: Could not connect to ledger.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-zinc-950 text-white p-6 rounded-lg border border-zinc-800 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 tracking-widest text-zinc-100">FIRST CALL INTAKE</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Full Name of Deceased</label>
          <input 
            type="text" 
            value={animusData.fullName}
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white outline-none focus:border-white transition-colors"
            onChange={(e) => setAnimusData({...animusData, fullName: e.target.value})}
            required 
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Location of Death</label>
          <input 
            type="text"
            value={animusData.location}
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white outline-none focus:border-white transition-colors"
            onChange={(e) => setAnimusData({...animusData, location: e.target.value})}
            required 
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Primary Contact (Next of Kin)</label>
          <input 
            type="tel"
            value={animusData.phone}
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white outline-none focus:border-white transition-colors"
            onChange={(e) => setAnimusData({...animusData, phone: e.target.value})}
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-6 bg-white text-black font-bold py-3 rounded hover:bg-zinc-200 transition-colors disabled:bg-zinc-600"
        >
          {isSubmitting ? 'LOCKING CASE...' : 'CREATE CASE FILE'}
        </button>
      </form>
    </div>
  );
}
