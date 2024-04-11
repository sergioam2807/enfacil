import { cookies } from "next/headers";
export async function createPersonalData(data: any, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/PersonnelApi/InsertPersonnel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let errorData = "";
    if (res.headers.get("content-type")?.includes("application/json")) {
      errorData = await res.json();
    }
    throw new Error(
      `Failed to create user: ${res.status} ${res.statusText} ${errorData}`
    );
  }

  return res.json();
}

export async function getPersonalByIdData(id?: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/GetPersonnel${
      id ? `/${id}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
