import { useState } from "react";
import AddUser from "./components/User/AddUser";
import UsersList from "./components/User/UsersList";

function App() {
  // let userList = {
  //   "Soham": 19,
  //   "latino": 69,
  //   "el chapo": 54,
  //   "gort&quandale": 15,
  // };

  const [usersList, setUsersList] = useState([]);

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
