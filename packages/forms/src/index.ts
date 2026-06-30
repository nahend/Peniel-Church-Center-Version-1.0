export const phonePattern = /^\+?[1-9]\d{7,14}$/;
export const requiredString = (value: string, label: string) => { if (!value.trim()) throw new Error(`${label} is required`); return value.trim(); };
