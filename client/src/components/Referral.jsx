import { useState, useEffect } from 'react';
import '../styles/components/referral.scss';
import { RiFileCopyFill } from 'react-icons/ri';

const Referral = (props) => {
  const { account, authUser } = props;
  const [referralCode, setReferralCode] = useState(authUser.referral_code);
  const [copy, setCopy] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <article id='referral-portfolio'>
      <p>
        Refer a friend and you both receive{' '}
        <span className='highlight'>$250</span> when they sign up for{' '}
        <span className='highlight'>Wealthify</span>
      </p>
      <div className='code'>
        <p>Code: </p>
        <p className='user-code'>{referralCode}</p>
        <RiFileCopyFill className='icon' onClick={copyToClipboard} />
        <div className='copy'>{copy && <p>Copied!</p>}</div>
      </div>
    </article>
  );
};

export default Referral;
