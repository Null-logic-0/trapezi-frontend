import { UserInterface } from "@/interfaces/user.interface";
import { fetchCurrentUser } from "@/lib/api/fetchCurrentUser";
import { useEffect, useState } from "react";

export function useFetchCurrentUser() {
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    };

    loadUser();
  }, []);

  return { user };
}
