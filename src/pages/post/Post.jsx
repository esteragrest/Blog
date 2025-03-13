import { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Comments, PostContent, PostForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors/select-post';

const PostContainer = ({ className }) => {
	const dispath = useDispatch();
	const params = useParams();
	const isCreating = useMatch('/post');
	const isEditing = useMatch('/post/:postId/edit');
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispath(RESET_POST_DATA);
	}, [dispath, isCreating]);

	useEffect(() => {
		if (isCreating) {
			return;
		}
		dispath(loadPostAsync(requestServer, params.postId));
	}, [dispath, params, requestServer, isCreating]);

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px;
	padding: 0px 80px;
`;

PostContainer.propTypes = {
	className: PropTypes.string,
};
