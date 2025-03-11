export const transformPost = (dbPost) => ({
	id: dbPost.id,
	title: dbPost.title,
	imageUrl: dbPost.image_url,
	publishedAt: dbPost.published_at,
	content: dbPost.content,
});
