import { cookies } from "next/headers";

export async function getUserData(id?: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/GetUsers${id ? `/${id}` : ""}`,
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

export async function getPersonalData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    // "http://192.168.0.6:7194/api/PersonnelApi/GetPersonnel",
    `${process.env.NEXT_PUBLIC_BASE_URL}/PersonnelApi/GetPersonnel`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Error status:", res.status);
    console.error("Error text:", await res.text());
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export function deletePersonalData() {
  return async (id: string, token: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/DeleteUser?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API response:", res);

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }

    const data = await res.json();
    return data;
  };
}

export async function getClientData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ClientApi/GetClients`,
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

export async function getProyectsData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ProjectApi/GetProjects`,
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
