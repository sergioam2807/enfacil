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
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

export async function getPersonalData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/PersonnelApi/GetPersonnel?identifier=all&value=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/ClientApi/GetClients?identifier=all&value=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
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
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

export async function getMaterialsData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/MaterialApi/GetMaterials`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

//Action to get the data of the activities

export async function getActivityData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ActivityApi/GetActivities`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

//quote data

export async function getQuoteEnclosureActivities() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/QuoteEnclosureActivityApi/GetQuoteEnclosureActivities`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

export async function getQuotes() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/QuoteApi/GetQuotes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}

export async function getEnclosure() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/EnclosureApi/GetEnclosures`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    console.log("No JSON content found in response");
    return [];
  }
}
