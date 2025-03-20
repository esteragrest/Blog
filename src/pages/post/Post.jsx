import { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Comments, PostContent, PostForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { selectPost } from '../../selectors/select-post';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constans';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispath = useDispatch();
	const params = useParams();
	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:postId/edit');
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useLayoutEffect(() => {
		dispath(RESET_POST_DATA);
	}, [dispath, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispath(loadPostAsync(requestServer, params.postId)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispath, params, requestServer, isCreating]);

	if (isLoading) {
		return;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	margin: 40px;
	padding: 0px 80px;
`;
