import { Icon } from '../../../../../../components';
import styled from 'styled-components';
import { useServerRequest } from '../../../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import PropTypes from 'prop-types';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constans';
import { selectUserRole } from '../../../../../../selectors';

const CommentContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole);

	const onCommentRemove = (postId, id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};
	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							id="fa-user-circle-o"
							margin="0 0 0px 0"
							size="18px"
							inactive={true}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							id="fa-calendar-o"
							margin="0 0 0 0"
							size="18px"
							inactive={true}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					size="21px"
					onClick={() => onCommentRemove(postId, id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	width: 100%;
	margin-top: 10px;

	& .comment {
		border: 1px solid #000;
		width: 550px;
		padding: 5px 10px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
