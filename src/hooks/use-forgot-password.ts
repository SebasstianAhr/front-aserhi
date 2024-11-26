import { useState } from "react";
import { users } from "../core/mocks/mock-data";

export const useForgotPassword = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const findUserByEmail = async (email: string): Promise<void> => {
    setStatus("loading");

    try {
      const user = users.find((u) => u.email === email);

      if (user) {
        setUserEmail(user.email);
        setStatus("success");
      } else {
        setUserEmail(null);
        setStatus("error");
      }
    } catch (error) {
      console.error("Error buscando el usuario:", error);
      setStatus("error");
    }
  };

  return { status, userEmail, findUserByEmail };
};
