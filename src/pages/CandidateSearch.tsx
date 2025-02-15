import type Candidate from '../interfaces/Candidate.interface';
import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [users, setUsers] = useState<Candidate[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const users = await searchGithub();
      console.log(users);

      // Fetch additional details for each user
      const detailedUsers = await Promise.all(
        users.map(async (user: Candidate) => {
          const detailedUser = await searchGithubUser(user.login);
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
  };

  const currentUser = users[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentUser && (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr key={currentUser.id}>
              <td>
                <img src={currentUser.avatar_url} alt={currentUser.login} width="50" height="50" />
              </td>
              <td>{currentUser.login}</td>
              <td>{currentUser.name}</td>
              <td>{currentUser.location}</td>
              <td>{currentUser.email}</td>
              <td>{currentUser.company}</td>
              <td>{currentUser.bio}</td>
              <td>
                <a href={currentUser.html_url} target="_blank" rel="noopener noreferrer">
                  {currentUser.html_url}
                </a>
              </td>
              <td>
                {selectedUsers.some((u) => u.id === currentUser.id) ? (
                  <button onClick={() => removeUser(currentUser)}>Remove</button>
                ) : (
                  <button onClick={() => addUser(currentUser)}>Add</button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <h2>Potential Candidates</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Image</th>
              <th>Username</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Profile</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedUsers.map((user: Candidate) => (
            <tr key={user.id}>
              <td>{user.login}</td>
              <td>
                <img src={user.avatar_url} alt={user.login} width="50" height="50" />
              </td>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.email}</td>
              <td>{user.company}</td>
              <td>{user.bio}</td>
              <td>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  {user.html_url}</a></td>
              <td>
                <button onClick={() => removeUser(user)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateSearch;