import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, H2, AuthFormError } from '../../components';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constans';
import { useResetForm } from '../../hooks/use-reset-form';

const regFormShema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Должно быть миинимум 3 символа')
		.max(15, 'Неверно заполнен логин. Должно быть максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните поле пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки #, %',
		)
		.min(6, 'Неверно заполнен пароль. Должно быть миинимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Должно быть максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(regFormShema),
	});

	const dispath = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispath(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passcheck', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 260px;
	}
`;

RegistrationContainer.propTypes = {
	className: PropTypes.string,
};
