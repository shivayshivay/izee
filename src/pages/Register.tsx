import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.role) {
      setStatus("error");
      setMessage("Please fill all required fields");
      return;
    }

    setStatus("loading");

    try {
      const { error } = await supabase
        .from("registrations")
        .insert([form]);

      if (error) throw error;

      setStatus("success");
      setMessage("🎉 Registered successfully!");
      setForm({ name: "", email: "", phone: "", role: "" });

    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>🎤 Izee Got Talent</h2>

        {status === "success" ? (
          <>
            <p>{message}</p>
            <button onClick={() => setStatus("idle")}>
              Register Again
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              required
            >
              <option value="">Select Role</option>
              <option value="audience">Audience</option>
              <option value="participant">Participant</option>
            </select>

            {status === "error" && (
              <p style={{ color: "red" }}>{message}</p>
            )}

            <button type="submit">
              {status === "loading" ? "Loading..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card: React.CSSProperties = {
  padding: 20,
  border: "1px solid #ccc",
  borderRadius: 10,
  width: 300,
};
```
