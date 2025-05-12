export const generateTimeSlots = () => {
  const slots = [];
  const startHour = 8;
  const endHour = 13;
  const intervalMinutes = 10;

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      const hour = h < 10 ? `0${h}` : `${h}`;
      const minute = m < 10 ? `0${m}` : `${m}`;
      slots.push(`${hour}:${minute}`);
    }
  }
  // Add the last slot at 13:00
  slots.push('13:00');
  return slots;
};

export default { generateTimeSlots };