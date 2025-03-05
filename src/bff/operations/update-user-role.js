import { setUserRole } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен Пользователи',
			res: null,
		};
	}

	setUserRole(userId, newUserRoleId);

	return {
		error: null,
		res: true,
	};
};
