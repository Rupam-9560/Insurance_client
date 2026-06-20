import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import UserNavbar from "../components/UserNavbar";
import UserProfileDropdown from "../components/UserProfileDropdown";

export default function UserHistory() {
  const [policies, setPolicies] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1122/dashboard", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(console.error);

    fetch("http://localhost:1122/my-policies/history", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch(console.error);
  }, []);

  // ------------------- DISAPPROVE -------------------
  const handleDisapprove = async (policyId) => {
    try {
      const res = await fetch(
        `http://localhost:1122/my-policies/disapprove/${policyId}`,
        { method: "PUT", credentials: "include" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setPolicies((prev) =>
        prev.map((p) =>
          p._id === policyId ? { ...p, status: "disapproved" } : p
        )
      );

      alert("Policy disapproved successfully!");
      setSelectedPolicy(null);
    } catch (err) {
      alert(err.message || "Failed to disapprove policy");
    }
  };

  // ------------------- DELETE -------------------
  const handleDelete = async (policyId) => {
    if (!window.confirm("Are you sure you want to delete this policy?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:1122/my-policies/delete/${policyId}`,
        { method: "DELETE", credentials: "include" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setPolicies((prev) => prev.filter((p) => p._id !== policyId));

      alert("Policy deleted successfully!");
      setSelectedPolicy(null);
    } catch (err) {
      alert(err.message || "Failed to delete policy");
    }
  };

  // ------------------- DOWNLOAD PDF -------------------
  const handleDownloadPDF = (policy) => {
    if (!user) return alert("User data not loaded yet!");

    const doc = new jsPDF();

    // ===== Title =====
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Insurance Policy Details", 105, 20, { align: "center" });
    doc.line(20, 25, 190, 25);

    // ===== User Info =====
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`User: ${user.name || user.email}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 40);

    // ✅ Proper Indian Currency Formatting
    const formattedSum = policy.policy?.sumAssured
      ? `Rs. ${Number(policy.policy.sumAssured).toLocaleString("en-IN")}`
      : "N/A";

    const formattedPremium = policy.policy?.premium
      ? `Rs. ${Number(policy.policy.premium).toLocaleString("en-IN")}`
      : "N/A";

    const tableColumn = ["Field", "Details"];
    const tableRows = [
      ["Policy Name", policy.policy?.name || "N/A"],
      ["Sum Assured", formattedSum],
      ["Premium", formattedPremium],
      ["Tenure", `${policy.policy?.tenure || "N/A"} yrs`],
      ["Status", policy.status?.toUpperCase() || "N/A"],
      [
        "Description",
        policy.policy?.description ||
          policy.policy?.details ||
          "N/A",
      ],
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      theme: "grid",
      styles: {
        fontSize: 12,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [37, 99, 235], // Blue header
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 50 },
        1: { cellWidth: 110 },
      },
    });

    const finalY = doc.lastAutoTable.finalY || 70;

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "This is a system-generated policy document.",
      105,
      finalY + 15,
      { align: "center" }
    );

    doc.save(`${policy.policy?.name || "policy"}.pdf`);
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-blue-50">
      <UserNavbar user={user} />
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">
            My Policy History
          </h1>
          <UserProfileDropdown user={user} />
        </div>

        {policies.length === 0 ? (
          <p>No policies applied yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg">
                  {item.policy?.name}
                </h3>
                <p>
                  Rs.{" "}
                  {Number(item.policy?.sumAssured || 0).toLocaleString(
                    "en-IN"
                  )}
                </p>
                <p>
                  Premium: Rs.{" "}
                  {Number(item.policy?.premium || 0).toLocaleString(
                    "en-IN"
                  )}
                </p>
                <p>{item.policy?.tenure} yrs</p>

                <div className="mt-4 flex items-center justify-between flex-wrap">
                  <span
                    className={`font-semibold ${
                      item.status === "approved"
                        ? "text-green-600"
                        : item.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>

                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
                    onClick={() => setSelectedPolicy(item)}
                  >
                    Actions
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 relative shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                Policy Details
              </h2>

              <p><strong>Name:</strong> {selectedPolicy.policy?.name}</p>
              <p>
                <strong>Sum Assured:</strong> Rs.{" "}
                {Number(selectedPolicy.policy?.sumAssured || 0).toLocaleString("en-IN")}
              </p>
              <p>
                <strong>Premium:</strong> Rs.{" "}
                {Number(selectedPolicy.policy?.premium || 0).toLocaleString("en-IN")}
              </p>
              <p><strong>Tenure:</strong> {selectedPolicy.policy?.tenure} yrs</p>
              <p><strong>Status:</strong> {selectedPolicy.status.toUpperCase()}</p>

              <div className="flex justify-between mt-6 flex-wrap gap-2">

                {selectedPolicy.status === "approved" && (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() =>
                      handleDisapprove(selectedPolicy._id)
                    }
                  >
                    Disapprove
                  </button>
                )}

                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() =>
                    handleDownloadPDF(selectedPolicy)
                  }
                >
                  Download PDF
                </button>

                <button
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  onClick={() =>
                    handleDelete(selectedPolicy._id)
                  }
                >
                  Delete
                </button>

                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  onClick={() => setSelectedPolicy(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}