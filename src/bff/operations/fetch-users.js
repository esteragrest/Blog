import { getUsers } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const fetchUsers = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен Пользователи',
			res: null,
		};
	}

	const roles = await getUsers();

	return {
		error: null,
		res: roles,
	};
};
