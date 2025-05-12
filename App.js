import React, { useState } from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';

const App = () => {
  const [currentPage, setCurrentPage] = useState('form'); // 'form' or 'list'

  const handleAppointmentAdded = () => {
    setCurrentPage('list');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setCurrentPage('form')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            currentPage === 'form' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          Agendar Cita
        </button>
        <button
          onClick={() => setCurrentPage('list')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            currentPage === 'list' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          Ver Citas
        </button>
      </div>

      {currentPage === 'form' && <AppointmentForm onAppointmentAdded={handleAppointmentAdded} />}
      {currentPage === 'list' && <AppointmentList />}
    </div>
  );
};

export default App;

// DONE