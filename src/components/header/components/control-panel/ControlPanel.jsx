import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button } from '../../../../components';
import styled from 'styled-components';
import { ROLE } from '../../../../constans';
import {
	selectUserSession,
	selectUserLogin,
	selectUserRole,
} from '../../../../selectors';
import { logout } from '../../../../actions';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const StyledIcon = styled.div`
	cursor: pointer;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<StyledIcon>
							<Icon
								margin="0 0 0 10px"
								id="fa-sign-out"
								onClick={() => dispatch(logout(session))}
							/>
						</StyledIcon>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<StyledIcon onClick={() => navigate(-1)}>
					<Icon margin="10px 0 0 0" id="fa-backward" />
				</StyledIcon>
				<Link to="/post">
					<Icon margin="10px 0 0 16px" id="fa-file-text-o" />
				</Link>
				<Link to="/users">
					<Icon margin="10px 0 0 16px" id="fa-users" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;

ControlPanelContainer.propTypes = {
	className: PropTypes.any,
};
