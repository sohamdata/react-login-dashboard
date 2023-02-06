import { useState } from "react";
import AddUser from "./components/User/AddUser";
import UsersList from "./components/User/UsersList";

function App() {
  let userList = [
    { id: 1, name: "soham", age: 19 },
    { id: 2, name: "gort", age: 69 },
    { id: 3, name: "quandale", age: 21 },
  ];

  const [usersList, setUsersList] = useState(userList);

  const addUserDetails = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, { id: Math.random().toString(), name: uName, age: uAge }];
    })
  };

  return (
    <div>
      <AddUser onAddUser={addUserDetails} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
