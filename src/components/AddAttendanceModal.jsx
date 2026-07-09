import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

function AddAttendanceModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!name || !site || !date) {
      alert("Please fill all fields");
      return;
    }

    const attendance = {
      name,
      site,
      date,
      status,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "attendance"), attendance);

      alert("✅ Attendance Saved");

      setName("");
      setSite("");
      setDate("");
      setStatus("Present");

      onClose();
    } catch (error) {
      console.log(error);
      alert("❌ Error Saving Attendance");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Mark Attendance
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Labour Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Site Name"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Present</option>
            <option>Absent</option>
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
            Save Attendance
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddAttendanceModal;