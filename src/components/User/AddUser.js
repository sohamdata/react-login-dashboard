import { useState } from 'react';
import Card from '../UI/Card';
import classes from "./AddUser.module.css"
import Button from '../UI/Button';

const AddUser = (props) => {
    const [username, setUsername] = useState("")
    const [age, setAge] = useState("")

    const addUserHandler = (event) => {
        event.preventDefault()

        if (username.trim().length !== 0 && age.trim().length !== 0 && +age > 1) {
            props.onAddUser(username, age);
            setUsername("")
            setAge("")
        }
    }

    const userNameInput = (event) => {
        setUsername(event.target.value)
    }
    const ageInput = (event) => {
        setAge(event.target.value)
    }

    return (
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={username} onChange={userNameInput} />
                <label htmlFor="age">Age</label>
                <input id="age" type="number" value={age} onChange={ageInput} />
                <Button type="submit">Add user</Button>
            </form>
        </Card>
    )
}

export default AddUser;