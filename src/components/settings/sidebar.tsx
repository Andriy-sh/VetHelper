import Link from "next/link";

export default function SideBar() {
  return (
    <div className="h-screen bg-white border-r border-gray-200 w-64 flex flex-col p-6">
      <div className="text-xl font-semibold mb-6 text-gray-800">Settings</div>
      <nav className="flex flex-col space-y-3">
        <Link href="/settings/profile">
          <div className="p-3 hover:bg-gray-100 rounded-lg transition duration-200 text-gray-700 hover:text-gray-900">
            Profile
          </div>
        </Link>
        <Link href="/settings/account">
          <div className="p-3 hover:bg-gray-100 rounded-lg transition duration-200 text-gray-700 hover:text-gray-900">
            Account
          </div>
        </Link>
        <Link href="/settings/notifications">
          <div className="p-3 hover:bg-gray-100 rounded-lg transition duration-200 text-gray-700 hover:text-gray-900">
            Notifications
          </div>
        </Link>
        <Link href="/settings/security">
          <div className="p-3 hover:bg-gray-100 rounded-lg transition duration-200 text-gray-700 hover:text-gray-900">
            Security
          </div>
        </Link>
        <Link href="/settings/privacy">
          <div className="p-3 hover:bg-gray-100 rounded-lg transition duration-200 text-gray-700 hover:text-gray-900">
            Privacy
          </div>
        </Link>
      </nav>
    </div>
  );
}
