import './SocialMedia.css'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const SocialMedia = () => {
  return (
    <div className="social-media">
      
        <Link data-testid='github-link' to='https://github.com/emirandag' target='_blank'><button data-testid='github-button'><FaGithub /></button></Link>
      
      
        <Link data-testid='linkedin-link' to='https://www.linkedin.com/in/eduardomirandagoya/' target='_blank'><button data-testid='linkedin-button'><FaLinkedinIn /></button></Link>
      
       
        <Link data-testid='twitter-link' to='https://twitter.com/eduluchomg' target='_blank'><button data-testid='twitter-button'><FaTwitter /></button></Link>
      
    </div>
  );
};

