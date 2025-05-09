import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";


export default function useAuth() {
  const [user, setUser]     = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const simpleUser = { uid: fbUser.uid, email: fbUser.email };
        localStorage.setItem("user", JSON.stringify(simpleUser));
        setUser(simpleUser);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return { user, loading };
}
