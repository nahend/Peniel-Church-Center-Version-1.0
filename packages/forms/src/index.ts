export const phonePattern = /^\+?[1-9]\d{7,14}$/;

export interface MemberRegistrationInput {
  fullName: string;
  phone: string;
  gender: "female" | "male";
  group: "Adult" | "Young Adult" | "Children Ministry";
  ministries?: string[];
}

export function validateMemberRegistration(input: Partial<MemberRegistrationInput>): MemberRegistrationInput {
  const fullName = String(input.fullName ?? "").trim();
  const phone = String(input.phone ?? "").trim();
  const gender = input.gender;
  const group = input.group;

  if (fullName.length < 2) throw new Error("Full name must contain at least two characters.");
  if (!phonePattern.test(phone)) throw new Error("Phone number must be in international format.");
  if (gender !== "female" && gender !== "male") throw new Error("Gender is required.");
  if (group !== "Adult" && group !== "Young Adult" && group !== "Children Ministry") throw new Error("Ministry group is required.");

  return { fullName, phone, gender, group, ministries: input.ministries ?? [] };
}
