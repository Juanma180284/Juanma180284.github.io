import React, { useState } from 'react';
import { getStorage, useStorageListener } from '../utils/storage';
import { initialAppointments } from '../mock/appointments';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState(getStorage('appointments') || initialAppointments);

  useStorageListener('appointments', (newAppointments) => {
    setAppointments(newAppointments);
  });

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Citas Agendadas</h2>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No hay citas agendadas aún.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
              <p className="font-semibold">{appointment.nombre} {appointment.apellido}</p>
              <p className="text-sm text-gray-600">Cédula: {appointment.cedula}</p>
              <p className="text-sm text-gray-600">Teléfono: {appointment.telefono}</p>
              <p className="text-sm text-gray-600">Correo: {appointment.correo}</p>
              <p className="text-sm text-gray-600">Fecha de Nacimiento: {appointment.fechaNacimiento}</p>
              <p className="text-sm text-gray-600">Fecha de Cita: {appointment.fecha}</p>
              <p className="text-sm text-gray-600">Hora: {appointment.hora}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;