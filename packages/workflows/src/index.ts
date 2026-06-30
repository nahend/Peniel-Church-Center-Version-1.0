import type { RequestType, Role } from "@peniel/types";
export interface WorkflowStep { id: string; label: string; approverRole: Role; }
export const defaultWorkflows: Record<RequestType, WorkflowStep[]> = {
  PURCHASE: [{ id: "requester", label: "Requester", approverRole: "SECRETARY" }, { id: "treasury", label: "Treasury", approverRole: "TREASURER" }, { id: "chairman", label: "Elders Chairman", approverRole: "CHAIRMAN" }, { id: "accountant", label: "Accountant", approverRole: "ACCOUNTANT" }],
  BUDGET: [{ id: "treasury", label: "Treasury Review", approverRole: "TREASURER" }, { id: "chairman", label: "Chairman Approval", approverRole: "CHAIRMAN" }],
  PROGRAM: [{ id: "pastor", label: "Pastoral Review", approverRole: "PASTOR" }, { id: "chairman", label: "Chairman Approval", approverRole: "CHAIRMAN" }]
};
