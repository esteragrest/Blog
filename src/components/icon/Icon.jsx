import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	color: ${({ disabeld }) => (disabeld ? '#ccc' : '#000')};
`;

IconContainer.propTypes = {
	className: PropTypes.any,
	id: PropTypes.string,
	inactive: PropTypes.bool,
};
