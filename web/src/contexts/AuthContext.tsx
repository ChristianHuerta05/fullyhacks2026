import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  getAdditionalUserInfo,
  type User,
} from "firebase/auth";
import { auth, githubProvider } from "../firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  githubUsername: string | null;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [githubUsername, setGithubUsername] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGitHub = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    const additionalInfo = getAdditionalUserInfo(result);
    if (additionalInfo?.username) {
      setGithubUsername(additionalInfo.username);
    }
  };

  const signOut = async () => {
    setGithubUsername(null);
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, githubUsername, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
