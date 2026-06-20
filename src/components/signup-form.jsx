import { useState } from "react";
import { cn } from "@/lib/utils";
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
import { useNavigate } from "react-router-dom";

export function SignupForm({ className, ...props }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    gender: "", // ✅ added
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async () => {
  setError("");
  setSuccess("");

  if (
    !formData.name ||
    !formData.email ||
    !formData.number ||
    !formData.gender ||
    !formData.password
  ) {
    setError("All fields are required");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (formData.password.length < 8) {
    setError("Password must be at least 8 characters long");
    return;
  }

  setLoading(true);

  try {
    console.log("API URL:", import.meta.env.VITE_BASE_URL);

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          number: formData.number,
          gender: formData.gender,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    setSuccess("Account created successfully!");

    setFormData({
      name: "",
      email: "",
      number: "",
      gender: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);

  } catch (err) {
    console.error("Signup Error:", err);
    setError(err.message || "Failed to fetch");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            {/* Name */}
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Field>

            {/* Phone */}
            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <Input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </Field>

            {/* ✅ Gender Section */}
            <Field>
              <FieldLabel>Gender</FieldLabel>

              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>
            </Field>

            {/* Passwords */}
            <Field className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Field>
            </Field>

            <FieldDescription>
              Must be at least 8 characters long
            </FieldDescription>

            {error && (
              <FieldDescription className="text-red-600">
                {error}
              </FieldDescription>
            )}

            {success && (
              <FieldDescription className="text-green-600">
                {success}
              </FieldDescription>
            )}

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
