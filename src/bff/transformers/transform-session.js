export const transformSession = (dbSession) => ({
	id: dbSession.id,
	hash: dbSession.hash,
	userId: dbSession.user_id,
});
