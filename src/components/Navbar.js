import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/actions/authActions";
export default async function Navbar() {
  const user = await getCurrentUser();
  return (
    <nav className="flex gap-6 bg-gray-900 px-10 py-4">
      <Link href="/" className="hover:underline">
        MyApp
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact
      </Link>
      <Link href="/pricing" className="hover:underline">
        Pricing
      </Link>
      <Link href="/products" className="hover:underline">
        Products
      </Link>
      <Link href="/posts" className="hover:underline">
        Posts
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {user ? (
          <>
            <span className="">Hi,{user.name}</span>
            <form action={logout}>
              <button type="submit" className="hover:underline">
                Log out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
