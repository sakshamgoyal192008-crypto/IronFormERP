import { useState, useEffect } from "react";
import AddLabourModal from "../components/AddLabourModal";
import { db } from "../services/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";


function Labour() {
  const [search, setSearch] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);
  const [labours, setLabours] = useState([]);

useEffect(() => {
  fetchLabours();
}, []);
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this labour?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "labours", id));

    fetchLabours();

    alert("✅ Labour Deleted Successfully");
  } catch (error) {
    console.error(error);
    alert("❌ Error deleting labour");
  }
};
const fetchLabours = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "labours"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLabours(data);
  } catch (error) {
    console.log(error);
  }
};
return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Labours</h1>

        <button
  onClick={() => setIsModalOpen(true)}
  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
>
  + Add Labour
</button>
      </div>

      <input
        type="text"
        placeholder="Search Labour..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Daily Wage</th>
              <th className="text-left p-4">Skill</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Attendance</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
  {labours.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center p-8 text-gray-500">
        No Labour Added Yet
      </td>
    </tr>
  ) : (
    labours.map((labour) => (
      <tr key={labour.id} className="border-t">
        <td className="p-4">{labour.name}</td>
        <td className="p-4">{labour.phone}</td>
        <td className="p-4">₹{labour.wage}</td>
        <td className="p-4">{labour.skill}</td>

        <td className="p-4">
          <span
            className={`px-3 py-1 rounded-full text-white ${
              labour.status === "Active"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {labour.status}
          </span>
        </td>
<td className="p-4">
  <select
    className="border rounded-lg px-3 py-2"
    defaultValue="Present"
  >
    <option>Present</option>
    <option>Absent</option>
    <option>Half Day</option>
  </select>
</td>
        <td className="p-4">
          <button
  onClick={() => handleDelete(labour.id)}
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
<AddLabourModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    fetchLabours();
  }}
/>
</>
  );
}

export default Labour;