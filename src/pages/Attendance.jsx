import { useState, useEffect } from "react";
import AddAttendanceModal from "../components/AddAttendanceModal";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

function Attendance() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "attendance"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAttendance(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAttendance = attendance.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Attendance</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          + Mark Attendance
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
              <th className="text-left p-4">Labour</th>
              <th className="text-left p-4">Site</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendance.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-8 text-gray-500"
                >
                  No Attendance Found
                </td>
              </tr>
            ) : (
              filteredAttendance.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.site}</td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status === "Present"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddAttendanceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchAttendance();
        }}
      />
    </>
  );
}

export default Attendance;