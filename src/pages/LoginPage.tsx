import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AuthUI } from "@/components/ui/auth-fuse";
import { useDarkSurface } from "../hooks/useDarkSurface";

export function LoginPage() {
  // The public surface is dark; the signed-in app stays light.
  useDarkSurface();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const response = await axios.post(`${apiBase}/api/auth/google`, {
        credential,
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      // Dispatch storage event to notify useAuth
      window.dispatchEvent(new Event("storage"));

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;
        setError(
          typeof detail === "string"
            ? detail
            : "Failed to authenticate with the server. Please try again."
        );
      } else {
        setError("Failed to authenticate with the server. Please try again.");
      }
    }
  };

  return (
    <AuthUI
      title="Sign in to V-Notes AI"
      subtitle="Continue with Google — there is no password to remember."
      brand={
        <div className="flex flex-col items-center gap-3">
          <img
            src="/logo-tile.png"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-2xl ring-1 ring-border"
          />
        </div>
      }
      googleSlot={
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => setError("Google Sign-In was unsuccessful.")}
          useOneTap
          theme="filled_black"
          shape="pill"
          size="large"
          text="continue_with"
          width="320"
        />
      }
      footer={
        <div className="grid gap-4 text-center">
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground"
            >
              {error}
            </p>
          )}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      }
    />
  );
}

export default LoginPage;
