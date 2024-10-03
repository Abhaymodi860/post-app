import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <Link href="/" className="mr-4">
          Home
        </Link>
        <Link href="/pages/create">Create Post</Link>
      </div>
    </nav>
  );
}
