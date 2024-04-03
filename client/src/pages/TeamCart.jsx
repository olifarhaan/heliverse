import React, { useState, useEffect } from 'react';
import LoaderIcon from '../assets/LoaderIcon.svg';
import UserCard from '../components/UserCard';
import { toast } from 'react-toastify';

const TeamCart = ({ teamIds }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Make a request to fetch user details using the teamIds
        const response = await fetch('/api/v1/users/team-users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: teamIds }),
        });
        const data = await response.json();
        console.log(data, "data")
        if (response.ok) {
          setUsers(data.data); // Set the fetched users in state
        } else {
          console.error('Error fetching users:', data.message);
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [teamIds]);

  return (
    <div>
      <h2>Team Cart</h2>
      {loading ? (
        <div className="flex justify-center">
          <img src={LoaderIcon} alt="Loading..." className="w-20" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamCart;
