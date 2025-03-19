import { useSelector } from 'react-redux';
import { Error } from '../error/Error';
import PropTypes from 'prop-types';
import { selectUserRole } from '../../selectors';
import { ERROR } from '../../constans';
import { checkAccess } from '../../utils/check-access';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	serverError: PropTypes.any,
	access: PropTypes.array,
};
