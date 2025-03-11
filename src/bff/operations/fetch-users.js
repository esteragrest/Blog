import { getUsers } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const fetchUsers = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const roles = await getUsers();

	return {
		error: null,
		res: roles,
	};
};
