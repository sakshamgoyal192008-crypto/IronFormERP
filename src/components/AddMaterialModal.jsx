import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

function AddMaterialModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("PCS");
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState("Available");

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!name || !quantity || !rate) {
      alert("Please fill all fields");
      return;
    }

    const newMaterial = {
      name,
      quantity,
      unit,
      rate,
      status,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "materials"), newMaterial);

      alert("✅ Material Added Successfully");

      setName("");
      setQuantity("");
      setUnit("PCS");
      setRate("");
      setStatus("Available");

      onClose();
    } catch (error) {
      console.log(error);
      alert("❌ Error adding material");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Add Material
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Material Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>PCS</option>
            <option>KG</option>
            <option>Feet</option>
            <option>Meter</option>
          </select>

          <input
            type="number"
            placeholder="Rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Available</option>
            <option>Out of Stock</option>
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
            Save Material
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddMaterialModal;