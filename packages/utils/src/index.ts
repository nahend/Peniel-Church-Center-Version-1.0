export const nowIso = () => new Date().toISOString();
export const invariant = (condition: unknown, message: string): asserts condition => { if (!condition) throw new Error(message); };
export const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
