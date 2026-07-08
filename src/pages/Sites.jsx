import { useState } from "react";
import { sitesData } from "../data/sitesData";
import AddSiteModal from "../components/AddSiteModal";

function Sites() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sites, setSites] = useState(sitesData);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sites={sites}
        setSites={setSites}
      />
    </>
  );
}

export default Sites;