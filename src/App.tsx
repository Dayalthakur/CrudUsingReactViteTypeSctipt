import { useState } from "react";

// Define User type
interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");

  // Create
  const addUser = () => {
    if (!name) return;
    setUsers([...users, { id: Date.now(), name }]);
    setName("");
  };

  // Update
  const updateUser = (id: number) => {
    if (!editName) return;
    setUsers(users.map((user) => (user.id === id ? { id, name: editName } : user)));
    setEditId(null);
    setEditName("");
  };

  // Delete
  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CRUD App (TypeScript)</h1>

      {/* Create Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      {/* User List */}
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between mb-2">
            {editId === user.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-1 mr-2"
                />
                <button
                  onClick={() => updateUser(user.id)}
                  className="bg-green-500 text-white px-2 py-1 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-2 py-1"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{user.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditId(user.id);
                      setEditName(user.name);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
