import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

function AddSiteModal({
  isOpen,
  onClose,
  editSite,
  fetchSites,
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [status, setStatus] = useState("Active");

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!name || !location || !manager) {
      alert("Please fill all fields");
      return;
    }

    const newSite = {
      name,
      location,
      manager,
      status,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "sites"), newSite);

      alert("✅ Site Added Successfully");

      setName("");
      setLocation("");
      setManager("");
      setStatus("Active");

      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Error adding site");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Add New Site
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Site Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Manager Name"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Active</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-cyan-500 text-white"
          >
            Save Site
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSiteModal;