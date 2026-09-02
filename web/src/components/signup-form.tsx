import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../api"
import { isValidSiren } from "../lib/siren"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../components/ui/field"
import { Input } from "../components/ui/input"

type AuthResponse = {
  id: string
  mail: string
  name: string
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate()
  const [role, setRole] = useState<"employee" | "partner">("employee")
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [siren, setSiren] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const sirenInvalid = siren.length === 9 && !isValidSiren(siren)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    if (role === "partner" && !isValidSiren(siren)) {
      setError("Le SIREN saisi n'est pas valide.")
      return
    }

    setLoading(true)

    try {
      await api<AuthResponse>("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail,
          name,
          password,
          role,
          siren: role === "partner" ? siren : undefined,
        }),
      })

      navigate("/login")
    } catch {
      setError("Impossible de créer le compte. Vérifiez vos informations.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend variant="label">Vous êtes</FieldLegend>
              <div className="grid grid-cols-2 gap-3">
                <FieldLabel
                  htmlFor="role-employee"
                  className="has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
                >
                  <Field orientation="horizontal">
                    <input
                      id="role-employee"
                      type="radio"
                      name="role"
                      value="employee"
                      checked={role === "employee"}
                      onChange={() => setRole("employee")}
                      required
                      className="size-4 accent-primary"
                    />
                    <FieldContent>
                      <FieldTitle>Employé</FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
                <FieldLabel
                  htmlFor="role-partner"
                  className="has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
                >
                  <Field orientation="horizontal">
                    <input
                      id="role-partner"
                      type="radio"
                      name="role"
                      value="partner"
                      checked={role === "partner"}
                      onChange={() => setRole("partner")}
                      required
                      className="size-4 accent-primary"
                    />
                    <FieldContent>
                      <FieldTitle>Partenaire</FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </div>
            </FieldSet>
            {role === "partner" && (
              <Field data-invalid={sirenInvalid}>
                <FieldLabel htmlFor="siren">SIREN</FieldLabel>
                <Input
                  id="siren"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{9}"
                  maxLength={9}
                  placeholder="123456789"
                  value={siren}
                  onChange={(e) => setSiren(e.target.value.replace(/\D/g, ""))}
                  aria-invalid={sirenInvalid}
                  required
                />
                {sirenInvalid ? (
                  <FieldError>Ce SIREN n'est pas valide.</FieldError>
                ) : (
                  <FieldDescription>
                    Numéro à 9 chiffres identifiant votre entreprise.
                  </FieldDescription>
                )}
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            {error && <FieldError>{error}</FieldError>}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Création…" : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/login" className="underline font-medium text-primary">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
