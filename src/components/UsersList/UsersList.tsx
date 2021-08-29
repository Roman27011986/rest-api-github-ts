import { NavLink } from 'react-router-dom';
import styles from './UsersList.module.css'
export default function UsersList({ data }: any) {
    return (
        <ul className={styles.list}>
            {data.map((item:any) => (
                <li key={item.id}  className={styles.item}>
                <div className={styles.imgbox}>
                    <img src={item.avatar_url} alt="" className={styles.avatar} />
                </div>
                <a href={item.html_url} target="_blank" className={styles.text} rel="noreferrer">login: <span>{item.login}</span></a>
                <NavLink to={`/ditails/${item.login}`} className={styles.text}>
                    repo
                </NavLink>
            </li>
            ))}
        </ul>
    );
};