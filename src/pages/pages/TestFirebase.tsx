import { auth, db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

export default function TestFirebase() {
  const { user, loading } = useAuth();

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "sans-serif",
      }}
    >
      <h1>Firebase Test</h1>

      <hr />

      <p>
        <strong>Auth:</strong>{" "}
        {auth ? "Ready ✅" : "Failed ❌"}
      </p>

      <p>
        <strong>Firestore:</strong>{" "}
        {db ? "Ready ✅" : "Failed ❌"}
      </p>

      <p>
        <strong>Loading:</strong>{" "}
        {loading ? "Yes" : "No"}
      </p>

      <p>
        <strong>User:</strong>{" "}
        {user ? user.email : "Not Logged In"}
      </p>
    </div>
  );
}