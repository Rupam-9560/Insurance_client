import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
  if (!formData.email || !formData.password) {
    setError("All fields are required");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("http://localhost:1122/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include" // ✅ important for cookies
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    navigate("/admin/dashboard");
  } catch (err) {
    setError(err.message || "Admin login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Login to access admin dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Field>

            {error && (
              <FieldDescription className="text-red-600">
                {error}
              </FieldDescription>
            )}

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Logging in..." : "Login as Admin"}
            </Button>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
