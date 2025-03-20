import PropTypes from 'prop-types';
import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon id="fa-search" margin="0 7px 0 0" size="21px" inactive={true} />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 39px 10px 10px;
	}

	& > div {
		position: absolute;
		right: 9px;
		top: 3px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
