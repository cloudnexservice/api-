import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://a1a1-44-192-25-247.ngrok-free.app/users";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  // GET users
  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      const response = await res.json();
      if (response.success) {
        setUsers(response.data);
      } else {
        setError("Failed to load users");
      }
    } catch (err) {
      setError("Error loading users: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // POST new user
  const createUser = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const response = await res.json();

      if (response.success) {
        setFormData({ name: "", email: "" });
        setError("");
        loadUsers();
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Error creating user: " + err.message);
    }
  };

  // PUT update user
  const updateUser = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const response = await res.json();

      if (response.success) {
        setFormData({ name: "", email: "" });
        setEditingId(null);
        setError("");
        loadUsers();
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Error updating user: " + err.message);
    }
  };

  // DELETE user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const response = await res.json();

      if (response.success) {
        setError("");
        loadUsers();
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Error deleting user: " + err.message);
    }
  };

  // Start editing
  const startEdit = (user) => {
    setEditingId(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", email: "" });
    setError("");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>User Management System</h1>
        <p>Professional CRUD Application</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="form-section">
        <h2>{editingId ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={editingId ? updateUser : createUser}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter user name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter user email"
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-primary">
              {editingId ? "Update User" : "Create User"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="users-section">
        <h2>Users List ({users.length})</h2>

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="empty-state">No users found. Create one to get started!</div>
        ) : (
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => startEdit(user)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
