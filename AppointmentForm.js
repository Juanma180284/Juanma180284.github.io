import React, { useState, useEffect } from 'react';
import { setStorage, getStorage } from '../utils/storage';
import { initialAppointments } from '../mock/appointments';
import { generateTimeSlots } from '../utils/timeSlots';

const AppointmentForm = ({ onAppointmentAdded }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    correo: '',
    fechaNacimiento: '',
    fecha: '',
    hora: ''
  });

  const [message, setMessage] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const allTimeSlots = generateTimeSlots();

  useEffect(() => {
    updateAvailableTimeSlots(formData.fecha);
  }, [formData.fecha]);

  const updateAvailableTimeSlots = (selectedDate) => {
    if (!selectedDate) {
      setAvailableTimeSlots([]);
      return;
    }
    const appointments = getStorage('appointments') || initialAppointments;
    const bookedSlots = appointments
      .filter(appointment => appointment.fecha === selectedDate)
      .map(appointment => appointment.hora);

    const available = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
    setAvailableTimeSlots(available);
    if (!available.includes(formData.hora)) {
        setFormData(prev => ({ ...prev, hora: '' }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'fecha') {
        updateAvailableTimeSlots(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointments = getStorage('appointments') || initialAppointments;

    const isTimeSlotTaken = appointments.some(
      (appointment) => appointment.fecha === formData.fecha && appointment.hora === formData.hora
    );

    if (isTimeSlotTaken) {
      setMessage('Esa hora ya está ocupada. Por favor, elige otro horario.');
      return;
    }

    const newAppointment = { ...formData, id: Date.now() };
    const updatedAppointments = [...appointments, newAppointment];
    setStorage('appointments', updatedAppointments);

    // Simular envío de correo (en una app real, esto iría a un backend)
    console.log('Simulando envío de correo a:', formData.correo);
    console.log('Simulando envío de copia a: labalergiasa@gmail.com');

    setMessage('Cita agendada con éxito. Se ha enviado un correo de confirmación.');
    setFormData({
      nombre: '',
      apellido: '',
      cedula: '',
      telefono: '',
      correo: '',
      fechaNacimiento: '',
      fecha: '',
      hora: ''
    });
    if (onAppointmentAdded) {
      onAppointmentAdded();
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Agendar Nueva Cita</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido Completo"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <input
            type="text"
            name="cedula"
            placeholder="Número de Cédula"
            value={formData.cedula}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono Celular"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <input
            type="email"
            name="correo"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <label htmlFor="fechaCita" className="block text-sm font-medium text-gray-700">Fecha de Cita</label>
          <input
            type="date"
            id="fechaCita"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>
        <div>
          <select
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
            disabled={!formData.fecha || availableTimeSlots.length === 0}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" disabled>Selecciona una hora</option>
            {availableTimeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {formData.fecha && availableTimeSlots.length === 0 && (
              <p className="text-sm text-red-600 mt-1">No hay horarios disponibles para esta fecha.</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold"
        >
          Agendar Cita
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center ${message.includes('éxito') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AppointmentForm;