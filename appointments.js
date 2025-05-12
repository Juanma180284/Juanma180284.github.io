import { createStorage } from '../utils/storage';

export const initialAppointments = createStorage('appointments', []);

export default initialAppointments;