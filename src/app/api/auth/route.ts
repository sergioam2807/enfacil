import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Login/Authenticate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await response.json();
  const token = data.responseData;

  if (response.ok) {
    let responseToken = NextResponse.json({
      message: "Authentication successful",
      token: data.token,
    });
    responseToken.cookies.set("token", token);
    return responseToken;
  } else {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
