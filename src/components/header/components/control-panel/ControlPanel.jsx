import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: 100px;
	height: 32px;
	border: 1px solid #000;
`;

const StyledButton = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to="/login">Войти</StyledLink>
			</RightAligned>
			<RightAligned>
				<StyledButton onClick={() => navigate(-1)}>
					<Icon margin="10px 0 0 0" id="fa-backward" />
				</StyledButton>
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
