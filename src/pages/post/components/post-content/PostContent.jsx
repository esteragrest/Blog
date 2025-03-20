import styled from 'styled-components';
import { Icon, H2 } from '../../../../components';
import { SpecialPanel } from '../special-panel/SpecialPanel';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constans';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, publishedAt, content },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						margin="0 10px 0 0"
						size="21px"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
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

	& .text {
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
