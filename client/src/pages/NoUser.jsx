import { Link } from 'react-router-dom';
import noUserImg from '../images/undraw_investment_data_re_sh9x.svg';
import '../styles/pages/nouser.scss';

const NoUser = (props) => {
  return (
    <section id='nouser'>
      <h1>
        Please <Link to='/signup'>Sign Up</Link> or{' '}
        <Link to='/login'>Login</Link> to see this page.
      </h1>
      <img src={noUserImg} alt='girl standing next to bar graph' />
    </section>
  );
};

export default NoUser;
