import { transformPost } from '../transformers';

export const getPosts = (page, limit) =>
	fetch(`http://localhost:3000/posts?_page=${page}&_per_page=${limit}`)
		.then((response) => response.json())
		.then((loadedPosts) => ({
			posts: loadedPosts.data && loadedPosts.data.map(transformPost),
			last: loadedPosts.last,
		}));
