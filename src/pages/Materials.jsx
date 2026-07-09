import { useState, useEffect } from "react";
import AddMaterialModal from "../components/AddMaterialModal";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Materials() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this material?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "materials", id));

    fetchMaterials();

    alert("✅ Material Deleted Successfully");
  } catch (error) {
    console.log(error);
    alert("❌ Error deleting material");
  }
};
  const fetchMaterials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "materials"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMaterials(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Materials</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Material
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Material..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Material</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-left p-4">Unit</th>
              <th className="text-left p-4">Rate</th>
              <th className="text-left p-4">Status</th>
           <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredMaterials.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8 text-gray-500"
                >
                  No Material Added Yet
                </td>
              </tr>
            ) : (
              filteredMaterials.map((material) => (
                <tr key={material.id} className="border-t">
                  <td className="p-4">{material.name}</td>
                  <td className="p-4">{material.quantity}</td>
                  <td className="p-4">{material.unit}</td>
                  <td className="p-4">₹ {material.rate}</td>
                  <td className="p-4">{material.status}</td>
                <td className="p-4">
  <button
    onClick={() => handleDelete(material.id)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
  >
    Delete
  </button>
</td>
</tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddMaterialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchMaterials();
        }}
      />
    </>
  );
}

export default Materials;