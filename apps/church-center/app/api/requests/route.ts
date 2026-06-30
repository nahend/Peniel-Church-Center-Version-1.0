import { NextResponse } from "next/server";
import { defaultWorkflows } from "@peniel/workflows";
export async function GET(){ return NextResponse.json({ items: [], workflows: defaultWorkflows }); }
