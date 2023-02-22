import { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReduser = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes("@") };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.val, isValid: state.value.includes("@") };
	}
	return { value: '', isValid: false };
};

const passReduser = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.val, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
}

const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReduser, { value: '', isValid: null });
	const [passState, dispatchPass] = useReducer(passReduser, { value: '', isValid: null })

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(
				emailState.isValid && passState.isValid
			);
		}, 700)

		return () => {
			clearTimeout(identifier);
		};

	}, [emailState, passState]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
		// setFormIsValid(
		// 	emailReduser.isValid && passState.isValid
		// );
	};

	const passwordChangeHandler = (event) => {
		dispatchPass({ type: 'USER_INPUT', val: event.target.value });
		setFormIsValid(
			emailState.isValid && event.target.value.trim().length > 6
		);
	};

	const validateEmailHandler = () => {
		// setEmailIsValid(emailState.isValid);
		dispatchEmail({ type: "INPUT_BLUR" })
	};

	const validatePasswordHandler = () => {
		// setPasswordIsValid(enteredPassword.trim().length > 6);
		dispatchPass({ type: 'INPUT_BLUR' });

	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passState.val);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
						}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${passState.isValid === false ? classes.invalid : ''
						}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
