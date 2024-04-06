import { cookies } from "next/headers";

export async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/GetUsers`,
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

export async function createUserData(data: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/InsertUser`,
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
    throw new Error("Failed to create user");
  }

  return res.json();
}

export async function deleteUserData(id: string, apiEndpoint: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/DeleteUser?id=${id}`,
    // `http://64.176.3.190:8080/api/${apiEndpoint}?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("API response:", res);

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  const data = await res.json();
  return data;
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

export async function deletePersonalData(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/UserApi/DeleteUser?id=${id}`,
    // `http://64.176.3.190:8080/api/UserApi/DeleteUser?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("API response:", res);

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  const data = await res.json();
  return data;
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
