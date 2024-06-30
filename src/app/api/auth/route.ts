import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/Login/Authenticate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await response.json();
  const token = data.responseData;

  if (response.ok) {
    let responseToken = NextResponse.json({
      message: 'Authentication successful',
      token: token,
    });
    responseToken.cookies.set('token', token);
    return responseToken;
  } else {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
