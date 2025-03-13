import { Icon } from '../../../../components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useServerRequest } from '../../../../hooks';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';

const SpecialPanelContainer = ({ className, id, publishedAt, margin, editButton }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};
	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && <Icon id="fa-calendar-o" margin="0 7px 0 0" size="16px" inactive={true} />}
				{publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				{publishedAt && (
					<Icon
						id="fa-trash-o"
						margin="0 0 0 7px"
						size="21px"
						onClick={() => onPostRemove(id)}
					/>
				)}
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
	id: PropTypes.string,
	publishedAt: PropTypes.string,
	margin: PropTypes.string,
	editButton: PropTypes.element,
};
