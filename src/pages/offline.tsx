import { useEffect, useState } from "react";
// import Image from "next/image";
import { useRouter } from "next/router";

export default function Offline() {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial state
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6 relative">
      {/* App Logo 
      <Image
        src="/icons/icon-192x192.png" // make sure this exists in /public/icons
        alt="App Logo"
        width={96}
        height={96}
        className="mb-6"
      />*/}

      <h1 className="text-3xl font-bold text-gray-800 mb-2">You’re Offline</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        It looks like you don’t have an internet connection.  
        Please check your network and try again.
      </p>

      {/* Refresh Button */}
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        🔄 Try Again
      </button>

      {/* Toast / Banner when back online */}
      {isOnline && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 animate-fadeIn">
          <span>✅ You’re back online!</span>
          <button
            onClick={() => router.push("/")}
            className="bg-white text-green-700 px-3 py-1 rounded-md font-medium hover:bg-gray-200 transition"
          >
            Go Home
          </button>
        </div>
      )}
    </div>
  );
}
