import { useEffect, useReducer, useState, useContext, useRef } from 'react';

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

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

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
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passState.value);
		}
		else if (!validateEmailHandler) {
			// console.log("email not valid");
			emailInputRef.current.focus();
		}
		else {
			// console.log("invalid passoword");
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input ref={emailInputRef} id="email" label="E-Mail" type="email" isValid={validateEmailHandler} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
				<Input ref={passwordInputRef} id="password" label="Password" type="password" isValid={validatePasswordHandler} value={passState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} >
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;