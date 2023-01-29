import { useState } from 'react';
import Card from '../UI/Card';
import classes from "./AddUser.module.css"
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState(false);

    const addUserHandler = (event) => {
        event.preventDefault()

        if (username.trim().length !== 0 && age.trim().length !== 0 && +age > 1) {
            props.onAddUser(username, age);
            setUsername("")
            setAge("")
            return
        }
        setError(true);
        setUsername("")
        setAge("")


    }

    const userNameInput = (event) => {
        setUsername(event.target.value)
    }
    const ageInput = (event) => {
        setAge(event.target.value)
    }
    const errorHandler = () => {
        setError(false);
    }

    return (
        <div>
            {/* render modal only when there's an error */}
            {error && <ErrorModal title="invalid value" message="Name can't be empty and age must be > 1 " onExit={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={userNameInput} />
                    <label htmlFor="age">Age</label>
                    <input id="age" type="number" value={age} onChange={ageInput} />
                    <Button type="submit">Add user</Button>
                </form>
            </Card>
        </div>
    )
}

export default AddUser;