import { Alert } from 'react-bootstrap';
const Error = (props) => {
  
/*   type = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ] */


return (
  <Alert variant={props.variant}>
    {props.errorMessage}
  </Alert>
)
}

export default Error;