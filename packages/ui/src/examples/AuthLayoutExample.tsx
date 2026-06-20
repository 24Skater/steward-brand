/**
 * Usage example — drop this pattern into any Steward app.
 * Replace <YourAppPanel /> with your own screenshots or illustrations.
 * No branding is baked into the layout itself.
 */
import { AtSign, Lock } from "lucide-react";
import {
  AuthDivider,
  AuthForm,
  AuthLayout,
  AuthPanel,
  Button,
  Checkbox,
  FormFieldRow,
  InputIcon,
} from "@steward-apps/ui";

export default function LoginPage() {
  return (
    <AuthLayout
      panel={
        <AuthPanel
          visual={<YourAppPanel />}
          heading="Built for your ministry"
          description="Everything your team needs, in one place."
          dots={3}
          activeDot={0}
        />
      }
    >
      <AuthForm
        heading="Welcome back"
        description="Sign in to your account to continue."
        footer={
          <>
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-medium text-primary hover:underline">
              Create one
            </a>
          </>
        }
      >
        {/* Email */}
        <FormFieldRow label="Email" htmlFor="email">
          <InputIcon
            id="email"
            type="email"
            placeholder="Email address"
            icon={<AtSign />}
            autoComplete="email"
          />
        </FormFieldRow>

        {/* Password */}
        <FormFieldRow
          label="Password"
          htmlFor="password"
          aside={
            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </a>
          }
        >
          <InputIcon
            id="password"
            type="password"
            placeholder="Password"
            icon={<Lock />}
            autoComplete="current-password"
          />
        </FormFieldRow>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <label htmlFor="remember" className="text-sm text-foreground cursor-pointer">
            Remember me
          </label>
        </div>

        {/* Primary action */}
        <Button className="w-full" size="lg">
          Sign in
        </Button>

        {/* OAuth divider */}
        <AuthDivider />

        {/* OAuth button — consumer provides their own OAuth icon */}
        <Button variant="outline" className="w-full" size="lg">
          <GoogleIcon />
          Sign in with Google
        </Button>
      </AuthForm>
    </AuthLayout>
  );
}

// ── Placeholder components — replace with your own ─────────────────────────

function YourAppPanel() {
  return (
    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
      Your app screenshot or illustration goes here
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
