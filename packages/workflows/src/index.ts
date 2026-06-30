import type { RequestStatus, RequestType, Role } from "@peniel/types";

export interface WorkflowStep {
  id: string;
  label: string;
  approverRole: Role;
  terminalStatus?: RequestStatus;
}

export const defaultWorkflows: Record<RequestType, WorkflowStep[]> = {
  PURCHASE: [
    { id: "requester", label: "Requester submits purchase", approverRole: "SECRETARY" },
    { id: "treasury", label: "Treasury validates funding", approverRole: "TREASURER" },
    { id: "chairman", label: "Elders Chairman approves", approverRole: "CHAIRMAN" },
    { id: "accountant", label: "Accountant records payment", approverRole: "ACCOUNTANT", terminalStatus: "COMPLETED" },
  ],
  BUDGET: [
    { id: "treasury", label: "Treasury review", approverRole: "TREASURER" },
    { id: "chairman", label: "Chairman approval", approverRole: "CHAIRMAN", terminalStatus: "APPROVED" },
  ],
  PROGRAM: [
    { id: "pastor", label: "Pastoral review", approverRole: "PASTOR" },
    { id: "chairman", label: "Chairman approval", approverRole: "CHAIRMAN", terminalStatus: "APPROVED" },
  ],
};

export function nextWorkflowStatus(type: RequestType, currentStep: number): RequestStatus {
  const workflow = defaultWorkflows[type];
  const step = workflow[currentStep];
  return step?.terminalStatus ?? "IN_REVIEW";
}
