import { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";

export default function InsuranceHistory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/user/my-policies`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserNavbar />

      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6">
          My Insurance Applications
        </h2>

        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">#</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td>{item.policy?.name}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      item.status === "approved"
                        ? "bg-green-600"
                        : item.status === "disapproved"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
