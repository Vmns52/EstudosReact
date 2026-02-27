import style from './LinkButton.module.css';
import { Link } from 'react-router-dom';

function LinkButton({ text, to }) {
  return (
    <Link to={to} className={style.btn}>
      {text}
    </Link>
  );
}

export default LinkButton;