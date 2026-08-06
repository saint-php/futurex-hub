import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/layouts/AuthLayout";
import Card from "../components/ui/Card";
import Logo from "../components/ui/Logo";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { signup } from "../services/authService";

export default function SignupPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("Full Name:", fullName);
console.log("Email:", email);
console.log("Password:", password);

      await signup(fullName, email, password);

      navigate("/dashboard/payment?from=signup");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Card>
        <Logo />

        <h1 className="mt-6 text-center text-3xl font-bold">
          Get Started
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Create your Future X account and begin learning.
        </p>

        <form
          onSubmit={handleSignup}
          className="mt-8 space-y-5"
        >
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e: any) =>
              setFullName(e.target.value)
            }
          />

          <Input
            placeholder="Email Address"
            value={email}
            onChange={(e: any) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) =>
              setPassword(e.target.value)
            }
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Get Started"}
          </Button>

          <p className="pt-4 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </form>
      </Card>
    </AuthLayout>
  );
}