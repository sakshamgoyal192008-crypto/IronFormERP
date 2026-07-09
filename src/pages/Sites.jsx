import { useState, useEffect } from "react";
import AddSiteModal from "../components/AddSiteModal";
import { db } from "../services/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function Sites() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sites"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSites(data);
    } catch (error) {
      console.error(error);
    }
  };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this site?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "sites", id));

    fetchSites();

    alert("✅ Site Deleted Successfully");
  } catch (error) {
    console.error(error);
    alert("❌ Error deleting site");
  }
};
  const filteredSites = sites.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Sites</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Site
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Site..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Site Name</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Manager</th>
              <th className="text-left p-4">Status</th>
           <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSites.map((site) => (
              <tr key={site.id} className="border-t">
                <td className="p-4">{site.name}</td>
                <td className="p-4">{site.location}</td>
                <td className="p-4">{site.manager}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      site.status === "Active"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {site.status}
                  </span>
                </td>
              <td className="p-4">
  <button
    onClick={() => handleDelete(site.id)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
  >
    Delete
  </button>
</td>
</tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSiteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchSites();
        }}
      />
    </>
  );
}

export default Sites;