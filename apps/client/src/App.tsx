import { trpc } from "./lib/trpc";

function App() {
  const welcome = trpc.welcome.useQuery();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          {welcome.isLoading ? "Loading..." : welcome.data?.message}
        </h1>
        {welcome.data?.timestamp && (
          <p className="text-gray-600">Server time: {new Date(welcome.data.timestamp).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}

export default App;
