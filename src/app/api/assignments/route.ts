import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-service";

export async function GET() {
  const assignments = dataStore.getAssignments();
  return NextResponse.json({ success: true, count: assignments.length, data: assignments });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const assignment = dataStore.createAssignment(body);
    return NextResponse.json(
      { success: true, message: "অ্যাসাইনমেন্ট তৈরি হয়েছে", data: assignment },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    const updated = dataStore.updateAssignmentStatus(id, status);
    if (updated) {
      return NextResponse.json({ success: true, message: "স্ট্যাটাস পরিবর্তন হয়েছে", data: updated });
    }
    return NextResponse.json({ success: false, message: "অ্যাসাইনমেন্ট পাওয়া যায়নি" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
