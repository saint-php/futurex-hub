/**
 * Blocks unpaid users from full-app routes.
 * Free users may only use dashboard home + dictionary (and payment page).
 *
 * Usage:
 *   <Route path="stories" element={<PaidGuard><StoryBooksPage /></PaidGuard>} />
 */

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";

type Props = {
  children: React.ReactNode;
};

export default function PaidGuard({ children }: Props) {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const location = useLocation();

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Admins always have full access
  if (profile?.role === "admin") {
    return <>{children}</>;
  }

  if (!profile?.isPaid) {
    return (
      <Navigate
        to="/dashboard/payment"
        replace
        state={{ from: location.pathname, reason: "paywall" }}
      />
    );
  }

  return <>{children}</>;
}