import { Icon } from '../../../../components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TabelRow } from '../tabel-row/TabelRow';
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const requestServer = useServerRequest('fetchRoles');

	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, userNewRoleId) => {
		requestServer('updateUserRole', userId, userNewRoleId).then(() => {
			setInitialRoleId(userNewRoleId);
		});
	};

	const saveButtonDisabeld = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TabelRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						disabeld={saveButtonDisabeld}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TabelRow>
			<Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		font-size: 16px;
		padding: 0 5px;
	}

	& .save-role-button {
		width: 21px;
		height: 32px;
		margin: 0 0 0 10px;
	}
`;

UserRowContainer.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	login: PropTypes.string,
	registeredAt: PropTypes.string,
	roleId: PropTypes.number,
	userRoleId: PropTypes.string,
	roles: PropTypes.array,
	onUserRemove: PropTypes.func,
};
