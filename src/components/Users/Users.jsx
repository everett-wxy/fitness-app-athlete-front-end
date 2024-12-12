import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useFetch();

    useEffect(() => {
        const getUsers = async () => {
            const { ok, msg, data } = await fetchData("/users", "GET", null, true);
            if (ok) {
                setUsers(data); // Update state with fetched users
            } else {
                setError(msg); // Set error message if fetching fails
            }
            setLoading(false); // Stop loading
        };

        getUsers();
    }, [fetchData]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-semibold mb-4">User List</h1>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">First Name</th>
                        <th className="border px-4 py-2">Last Name</th>
                        <th className="border px-4 py-2">Date of Birth</th>
                        <th className="border px-4 py-2">Gender</th>
                        <th className="border px-4 py-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                {user.first_name || "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                                {user.last_name || "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                                {user.date_of_birth
                                    ? new Date(user.date_of_birth).toLocaleDateString()
                                    : "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                                {user.gender || "N/A"}
                            </td>
                            <td className="border px-4 py-2">
                                {user.role || "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
