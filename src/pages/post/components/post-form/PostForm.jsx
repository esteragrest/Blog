import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/SpecialPanel';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { savePostAsync } from '../../../../actions';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, publishedAt, content },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);

	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageUrlChange = ({ target }) => {
		setImageUrlValue(target.value);
	};

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value);
	};

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				onChange={onImageUrlChange}
				placeholder="Изображение..."
			/>
			<Input
				value={titleValue}
				onChange={onTitleChange}
				placeholder="Заголовок..."
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon id="fa-floppy-o" size="21px" onClick={() => onSave()} />
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		width: 300px;
		height: 200px;
		float: left;
		margin: 0 20px 10px 0;
	}

	& .text {
		min-height: 80px;
		border: 1px solid #000;
		white-space: pre-line;
		margin-top: 10px;
	}
`;

PostFormContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object,
};
