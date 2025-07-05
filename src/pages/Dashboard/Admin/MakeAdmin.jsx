import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const SearchAndManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-BD', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

  // Debounce logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500); // 500ms debounce

    return () => clearTimeout(timeout);
  }, [query]);

  // Use TanStack query to fetch users by email
  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['searchedUsers', debouncedQuery],
    queryFn: async () => {
      if (debouncedQuery === '') return [];
      const res = await axiosSecure.get(`/users/search?email=${debouncedQuery}`);
      return res.data;
    },
    enabled: debouncedQuery !== '', // only run if query is not empty
  });

  // Make admin
  const handleMakeAdmin = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${userId}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'User promoted to admin', 'success');
        refetch();
      }
    } catch (err) {
      Swal.fire('Error', 'Could not promote user', 'error');
    }
  };

  // Remove admin
  const handleRemoveAdmin = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/remove-admin/${userId}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Removed', 'Admin role removed', 'info');
        refetch();
      }
    } catch (err) {
      Swal.fire('Error', 'Could not remove admin role', 'error');
    }
  };

  return (
    <div className="p-6 w-11/12 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">🔍 Search and Make Admin</h2>

      <input
        type="text"
        className="input input-bordered w-full mb-6"
        placeholder="Search by email..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isFetching && <p className="text-sm text-gray-500">Searching...</p>}

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Email</th>
                 <th>Created At</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                   <td>{formatDate(user.created_at)}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === 'admin' ? 'badge-success' : 'badge-ghost'
                      }`}
                    >
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td>
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => handleRemoveAdmin(user._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-sm bg-secondary text-primary hover:bg-secondary/50"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : debouncedQuery && !isFetching ? (
        <p className="text-gray-500 mt-4">No users found.</p>
      ) : null}
    </div>
  );
};

export default SearchAndManageUsers;
