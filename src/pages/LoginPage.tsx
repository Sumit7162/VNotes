import { GoogleLogin } from "@react-oauth/google";
import { Sparkles, Mic, BookOpen } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      navigate("/");
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

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Notes",
      description: "Transform any video into structured, intelligent notes",
    },
    {
      icon: Mic,
      title: "Auto Transcription",
      description: "Accurate speech-to-text powered by cutting-edge AI",
    },
    {
      icon: BookOpen,
      title: "Smart Summaries",
      description: "Get key insights and highlights in seconds",
    },
  ];

  return (
    <>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes login-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes login-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.08); }
          66% { transform: translate(25px, -35px) scale(0.92); }
        }
        @keyframes login-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, 30px) scale(0.96); }
          66% { transform: translate(-35px, -25px) scale(1.04); }
        }
        @keyframes login-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes login-pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.15); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.3); }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f0b1e 0%, #1a1035 25%, #0d1b3e 50%, #121228 75%, #0f0b1e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "24px",
        }}
      >
        {/* Animated floating orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "login-float-1 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "login-float-2 10s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "30%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            filter: "blur(30px)",
            animation: "login-float-3 12s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
            maxWidth: "480px",
            width: "100%",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Logo & brand */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(56, 189, 248, 0.35)",
                animation: "login-pulse-glow 3s ease-in-out infinite",
              }}
            >
              <img
                src="/logo-tile.png"
                alt=""
                width={64}
                height={64}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #e0e7ff, #ffffff, #c7d2fe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                V-Notes AI
              </h1>
              <p
                style={{
                  color: "rgba(148, 163, 184, 0.8)",
                  fontSize: "15px",
                  marginTop: "8px",
                  fontWeight: 400,
                }}
              >
                Turn any video into actionable knowledge
              </p>
            </div>
          </div>

          {/* Glass card */}
          <div
            style={{
              width: "100%",
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "28px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#f1f5f9",
                  margin: "0 0 6px 0",
                }}
              >
                Welcome back
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(148, 163, 184, 0.7)",
                  margin: 0,
                }}
              >
                Sign in to access your notes & videos
              </p>
            </div>

            {error && (
              <div
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: "12px",
                  color: "#fca5a5",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            {/* Google Login button wrapper */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "4px 0",
              }}
            >
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
            </div>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.06)" }} />
              <span style={{ fontSize: "11px", color: "rgba(148, 163, 184, 0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Powered by AI
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.06)" }} />
            </div>

            {/* Feature highlights */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "14px",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(16px)",
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + index * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, ${
                        index === 0
                          ? "rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15)"
                          : index === 1
                          ? "rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15)"
                          : "rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.15)"
                      })`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <feature.icon
                      style={{
                        width: "18px",
                        height: "18px",
                        color: index === 0 ? "#a5b4fc" : index === 1 ? "#93c5fd" : "#c4b5fd",
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>
                      {feature.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(148, 163, 184, 0.6)", marginTop: "2px" }}>
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer text */}
          <p
            style={{
              fontSize: "12px",
              color: "rgba(148, 163, 184, 0.4)",
              textAlign: "center",
              maxWidth: "360px",
              lineHeight: 1.6,
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
            }}
          >
            By signing in, you agree to our Terms of Service and Privacy Policy.
            Your data is encrypted and securely stored.
          </p>
        </div>
      </div>
    </>
  );
}
