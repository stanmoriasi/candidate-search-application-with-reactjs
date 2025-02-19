import type Candidate from '../interfaces/Candidate.interface';
import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import '../index.css'; // Import the CSS file

const CandidateSearch = () => {
  const [users, setUsers] = useState<Candidate[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const users = await searchGithub();
      console.log("🚀 ~ fetchData ~ users:", users);

      // Fetch additional details for each user
      const detailedUsers = await Promise.all(
        users.map(async (user: Candidate) => {
          const detailedUser = await searchGithubUser(user.login);
          console.log("🚀 ~ users.map ~ detailedUser:", detailedUser);
          
          return { ...user, ...detailedUser };
        })
      );

      setUsers(detailedUsers);
    }
    fetchData();
  }, []);

  const addUser = (user: Candidate) => {
    setSelectedUsers([...selectedUsers, user]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const removeUser = (user: Candidate) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const currentUser = users[currentIndex];

  return (
    <div className="candidate-search">
      <h1>Candidate Search</h1>
      {currentUser && (
        <section className="user-card">
          <img src={currentUser.avatar_url} alt={currentUser.login} className="user-image" />
          
            <p>Username: {currentUser.login}</p>
            <p>Name: {currentUser.name}</p>
            <p>Location: {currentUser.location}</p>
            <p>Email: {currentUser.email}</p>
            <p>Company: {currentUser.company}</p>
            <p>Bio: {currentUser.bio}</p>
            <div className='button-container'>
              <button onClick={() => addUser(currentUser)}>Add</button>
              <button onClick={() => removeUser(currentUser)}>Remove</button>
            </div>
        </section>
      )}
      <h2>Potential Candidates</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {selectedUsers.map((user: Candidate) => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar_url} alt={user.login} width="75" height="75" />
              </td>
              <td>{user.login}</td>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.email}</td>
              <td>{user.company}</td>
              <td>{user.bio}</td>
              <td>
                <button onClick={() => removeUser(user)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateSearch;