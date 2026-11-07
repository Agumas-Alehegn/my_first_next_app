import AuthForm from "@/components/AuthForm";
import { register } from "@/actions/authActions";
export default function RegisterPage() {
  return (
    <main className="p-10">
      <h1>Create account</h1>
      <AuthForm action={register} isRegister submitLabel="Register" />
    </main>
  );
}
