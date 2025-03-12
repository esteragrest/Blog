import { Icon } from '../../../../../../components';
import styled from 'styled-components';
import { useServerRequest } from '../../../../../../hooks';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import PropTypes from 'prop-types';

const CommentContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const requestServer = useServerRequest();
	const dispatch = useDispatch();

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
						<Icon id="fa-user-circle-o" margin="0 0 0px 0" size="18px" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" margin="0 0 0 0" size="18px" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			<Icon
				id="fa-trash-o"
				margin="0 0 0 10px"
				size="21px"
				onClick={() => onCommentRemove(postId, id)}
			/>
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

CommentContainer.propTypes = {
	className: PropTypes.string,
	postId: PropTypes.string,
	id: PropTypes.string,
	author: PropTypes.string,
	content: PropTypes.string,
	publishedAt: PropTypes.string,
};
