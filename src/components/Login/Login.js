import { useEffect, useReducer, useState, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';

const emailReduser = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes("@") };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes("@") };
	}
	return { value: '', isValid: false };
};

const passReduser = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
}

const Login = (props) => {
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReduser, { value: '', isValid: null });
	const [passState, dispatchPass] = useReducer(passReduser, { value: '', isValid: null })

	const authCtx = useContext(AuthContext);

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
	};

	const passwordChangeHandler = (event) => {
		dispatchPass({ type: 'USER_INPUT', val: event.target.value });
		setFormIsValid(
			emailState.isValid && event.target.value.trim().length > 6
		);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" })
	};

	const validatePasswordHandler = () => {
		dispatchPass({ type: 'INPUT_BLUR' });

	};

	const submitHandler = (event) => {
		event.preventDefault();
		authCtx.onLogin(emailState.value, passState.val);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input id="email" label="E-Mail" type="email" isValid={validateEmailHandler} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
				<Input id="password" label="Password" type="password" isValid={validatePasswordHandler} value={passState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
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