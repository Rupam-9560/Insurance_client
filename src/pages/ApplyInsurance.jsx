import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import UserProfileDropdown from "../components/UserProfileDropdown";

export default function ApplyInsurance() {
  const [policies, setPolicies] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch logged-in user
        const userRes = await fetch(`${import.meta.env.VITE_BASE_URL}/dashboard`, {
          credentials: "include",
        });

        const userData = await userRes.json();

        if (!userRes.ok || !userData.user) {
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(userData.user);

        // ✅ Fetch ALL policies
        const policyRes = await fetch(`${import.meta.env.VITE_BASE_URL}/policies`, {
          credentials: "include",
        });

        const policyData = await policyRes.json();

        if (policyRes.ok) {
          setPolicies(policyData);
        } else {
          setPolicies([]);
          console.log(policyData);
        }

      } catch (error) {
        console.error("Fetch error:", error);
        setPolicies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyPolicy = async (policyId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/apply-policy/${policyId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Policy Applied Successfully!");
        navigate("/user/history");
      } else {
        alert(data.message || "Application failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return <p className="p-6 text-red-500">Unauthorized access</p>;
  }

  return (
    <div className="flex min-h-screen bg-blue-50">
      <UserNavbar user={user} />

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">
            Available Insurance Policies
          </h1>
          <UserProfileDropdown user={user} />
        </div>

        {policies.length === 0 ? (
          <p>No policies available.</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {policies.map((policy) => (
              <div
                key={policy._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="font-bold text-lg">
                  {policy.name}
                </h3>

                <p>₹ {policy.sumAssured}</p>
                <p>Premium: ₹ {policy.premium}</p>
                <p>{policy.tenure} yrs</p>

                <button
                  onClick={() => applyPolicy(policy._id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}