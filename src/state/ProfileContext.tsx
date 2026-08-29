import { createContext, useContext, useState, type ReactNode } from "react";
import { profile as defaultProfile, type StyleProfile } from "../data/profile";

const PROFILE_KEY = "aurora.profile";
const ONBOARDED_KEY = "aurora.onboarded";

type ProfileContextValue = {
  profile: StyleProfile;
  hasOnboarded: boolean;
  /** Called once onboarding (photo or quiz) finishes — saves + unlocks the app. */
  completeOnboarding: (p: StyleProfile) => void;
  /** Lets the user redo their analysis later (e.g. from the nav avatar). */
  resetOnboarding: () => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

function readStoredProfile(): StyleProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as StyleProfile) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StyleProfile>(readStoredProfile);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(
    () => localStorage.getItem(ONBOARDED_KEY) === "1",
  );

  const completeOnboarding = (p: StyleProfile) => {
    setProfile(p);
    setHasOnboarded(true);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    localStorage.setItem(ONBOARDED_KEY, "1");
  };

  const resetOnboarding = () => {
    setHasOnboarded(false);
    localStorage.removeItem(ONBOARDED_KEY);
  };

  return (
    <ProfileContext.Provider value={{ profile, hasOnboarded, completeOnboarding, resetOnboarding }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile() must be used inside <ProfileProvider>");
  return ctx;
}
