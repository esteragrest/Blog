import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Comments, PostContent, PostForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors/select-post';

const PostContainer = ({ className }) => {
	const dispath = useDispatch();
	const params = useParams();
	const isEditing = useMatch('/post/:postId/edit');
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useEffect(() => {
		dispath(loadPostAsync(requestServer, params.postId));
	}, [dispath, params, requestServer]);

	return (
		<div className={className}>
			{isEditing ? (
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
