import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

function AddLabourModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [wage, setWage] = useState("");
  const [skill, setSkill] = useState("Helper");
  const [status, setStatus] = useState("Active");

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!name || !phone || !wage) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "labours"), {
        name,
        phone,
        aadhaar,
        wage,
        skill,
        status,
        createdAt: new Date(),
      });

      alert("✅ Labour Added Successfully");

      setName("");
      setPhone("");
      setAadhaar("");
      setWage("");
      setSkill("Helper");
      setStatus("Active");

      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Error adding labour");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl w-[550px] p-6">

        <h2 className="text-2xl font-bold mb-6">
          Add Labour
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Labour Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            placeholder="Aadhaar Number"
            value={aadhaar}
            onChange={(e)=>setAadhaar(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            placeholder="Daily Wage"
            value={wage}
            onChange={(e)=>setWage(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={skill}
            onChange={(e)=>setSkill(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Helper</option>
            <option>Carpenter</option>
            <option>Fitter</option>
            <option>Supervisor</option>
          </select>

          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-cyan-500 text-white rounded-lg"
          >
            Save Labour
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddLabourModal;