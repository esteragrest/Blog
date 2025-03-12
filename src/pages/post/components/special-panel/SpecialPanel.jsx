import { Icon } from '../../../../components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, publishedAt, margin, editButton }) => {
	return (
		<div className={className}>
			<div className="published-at">
				<Icon id="fa-calendar-o" margin="0 7px 0 0" size="16px" />
				{publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				<Icon id="fa-trash-o" size="21px" />
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: ${(margin) => margin};
	font-size: 18px;

	& .published-at {
		display: flex;
	}

	& .published-at i {
		position: relative;
		top: 0px;
	}

	& .buttons {
		display: flex;
	}
`;

SpecialPanelContainer.propTypes = {
	className: PropTypes.string,
	publishedAt: PropTypes.string,
	margin: PropTypes.string,
	editButton: PropTypes.element
};
