import Link from "next/link";

export default function Bucket() {
  return (
    <div className=" p-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-center gap-4">
          <div className="sm:flex sm:gap-4">
            <Link
              href="/"
              className="flex rounded-md bg-blue-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Continue Shopping
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4 ml-2 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 text-center">
        <h1>Bucket List</h1>
        <ul>
          <li>123 Go !</li>
          <li>123 Go !</li>
        </ul>
      </div>
    </div>
  );
}
