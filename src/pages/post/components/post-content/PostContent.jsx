import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, H2 } from '../../../../components';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, publishedAt, content },
}) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon id="fa-calendar-o" margin="0 7px 0 0" size="16px" />
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon id="fa-pencil-square-o" margin="0 10px 0 0" size="21px" />
					<Icon id="fa-trash-o" size="21px" />
				</div>
			</div>
			<div className="text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		width: 300px;
		height: 200px;
		float: left;
		margin: 0 20px 10px 0;
	}

	& .special-panel {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: -20px 0 20px;
		font-size: 18px;
	}

	& .published-at {
		display: flex;
	}

	& .published-at i {
		position: relative;
		top: 0px;
	}

	& .buttons {
		display: flex;
	}
`;

PostContentContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object,
	id: PropTypes.string,
	title: PropTypes.string,
	imageUrl: PropTypes.string,
	publishedAt: PropTypes.string,
	content: PropTypes.string,
};
