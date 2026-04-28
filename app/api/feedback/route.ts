import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// POST: Save new feedback
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      memberId,
      memberName,
      memberEmail,
      category,
      subject,
      rating,
      comment,
    } = body;

    // Basic validation
    if (!memberId || !memberName || !memberEmail) {
      return NextResponse.json(
        { error: "Missing member information" },
        { status: 400 }
      );
    }
    if (!category || !subject || !comment) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await sql`
      INSERT INTO feedback
        (member_id, member_name, member_email, category, subject, rating, comment)
      VALUES
        (${memberId}, ${memberName}, ${memberEmail}, ${category}, ${subject}, ${rating}, ${comment})
      RETURNING id, submitted_at;
    `;

    return NextResponse.json({
      success: true,
      id: result.rows[0].id,
      submittedAt: result.rows[0].submitted_at,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}

// GET: Fetch all feedback (for admin dashboard)
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM feedback
      ORDER BY submitted_at DESC
      LIMIT 100;
    `;

    return NextResponse.json({
      success: true,
      feedback: result.rows,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}
