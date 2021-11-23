import '../styles/components/referral.scss';
import { RiFileCopyFill } from 'react-icons/ri';

const Referral = (props) => {
  const { account } = props;
  console.log(account);
  return (
    <article id='referral-portfolio'>
      <p>
        Refer a friend and you both receive{' '}
        <span className='highlight'>$250</span> when they sign up for{' '}
        <span className='highlight'>Wealthify</span>
      </p>
      <div className='code'>
        <p>Code: </p>
        <p className='user-code'>123456</p>
        <RiFileCopyFill className='icon' />
      </div>
    </article>
  );
};

export default Referral;
