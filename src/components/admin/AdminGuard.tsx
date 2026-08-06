/**
 * Renders children only when the signed-in user has role === "admin".
 * Otherwise redirects to /dashboard (or shows a compact "access denied").
 *
 * Usage in your router:
 *   <Route path="admin" element={<AdminGuard><AdminPage /></AdminGuard>} />
 *
 * Make someone an admin (Firebase Console → Firestore → users/{uid}):
 *   { "role": "admin", ... }
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";

type Props = {
  children: React.ReactNode;
  /** If true, show a message instead of redirecting */
  soft?: boolean;
};

export default function AdminGuard({ children, soft = false }: Props) {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = profile?.role === "admin";

  if (!isAdmin) {
    if (soft) {
      return (
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-900">Admin only</p>
          <p className="mt-2 text-sm text-slate-500">
            You don’t have permission to view this page.
          </p>
        </div>
      );
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}