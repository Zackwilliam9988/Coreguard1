export const log = (...args: any[]) => {
  try {
    // Vite exposes the mode via import.meta.env.MODE
    const mode = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.MODE) || process.env.NODE_ENV;
    if (mode !== 'production') {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  } catch (e) {
    // fallback
  }
};

export const warn = (...args: any[]) => {
  try {
    const mode = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.MODE) || process.env.NODE_ENV;
    if (mode !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(...args);
    }
  } catch (e) {
    // fallback
  }
};
