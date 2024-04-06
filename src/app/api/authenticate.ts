// import { NextApiRequest, NextApiResponse } from "next";

// const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { email, password } = req.body;

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/Login/Authenticate`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Authentication failed");
//     }

//     const data = await response.json();

//     res
//       .status(200)
//       .json({ message: "Authentication successful", token: data.token });
//   } catch (error) {
//     if (error instanceof Error) {
//       // Envía un mensaje de error
//       res.status(401).json({ message: "Usuario inválido" });
//     }
//   }
// };

// export default authenticate;
