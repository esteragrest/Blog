import { deleteComment, getComments, getPost, getUsers } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}
	await deleteComment(id);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await getUsers();

	const commentsWithAuthor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);
		return {
			...comment,
			author: user.login,
		};
	});

	return {
		error: null,
		res: { ...post, comments: commentsWithAuthor },
	};
};
