import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							<Icon
								id="fa-calendar-o"
								margin="0 7px 0 0"
								size="16px"
								inactive={true}
							/>
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon
								id="fa-comment-o"
								margin="0 7px 0 0"
								size="16px"
								inactive={true}
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 280px;
	display: flex;
	flex-direction: column;
	margin: 20px;
	border: 1.5px solid #000;

	& .post-card-footer {
		padding: 5px;
		border-top: 1px solid #000;
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
		padding: 5px;
	}

	& .published-at {
		display: flex;
	}

	& .comments-count {
		display: flex;
	}

	& img {
		display: block;
		width: 278px;
		height: 180px;
	}

	& h4 {
		margin: 0;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
	imageUrl: PropTypes.string.isRequired,
};
