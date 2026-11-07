import AuthForm from "@/components/AuthForm";
import { login } from "@/actions/authActions";
export default function LoginPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Log in</h1>
      <AuthForm action={login} submitLabel="Log in" />
    </main>
  );
}
