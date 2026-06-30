import { NextResponse } from "next/server";
import { getPeople, getRequestItems, getGivingMethods, getTranslations } from "@peniel/database";

export async function GET() {
  const people = await getPeople();
  const requests = await getRequestItems();
  const methods = await getGivingMethods();
  const translations = await getTranslations();

  return NextResponse.json({
    pendingMembers: people.filter((person) => person.status === "PENDING").length,
    purchaseRequests: requests.filter((request) => request.type === "PURCHASE").length,
    budgetRequests: requests.filter((request) => request.type === "BUDGET").length,
    programRequests: requests.filter((request) => request.type === "PROGRAM").length,
    activeGivingMethods: methods.filter((method) => method.enabled).length,
    translations: translations.length
  });
}
