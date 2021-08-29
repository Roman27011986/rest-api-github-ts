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
                <a href={item.html_url} className={styles.text}>login: <span>{item.login}</span></a>
                <NavLink to={`/ditails/:${item.login}`} className={styles.text}>
                    repo
                </NavLink>
            </li>
            ))}
            {/* <li key={data.id}  className={styles.item}>
                <div className={styles.imgbox}>
                    <img src={data.avatar_url} alt="" className={styles.avatar} />
                </div>
                <a href={data.html_url} className={styles.text}>login: <span>{data.login}</span></a>
                <NavLink to={`/ditails:${data.login}`} className={styles.text}>
                    repo:{data.public_repos}
                </NavLink>
            </li> */}
        </ul>
    );
};