import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import styles from './UsersList.module.css'
export default function UsersList({ data }: any) {
    const [value, setValue] = useState(false)

    useEffect(() => {
      setValue(!value)
    }, [data])
    
    return (
        <ul className={styles.list}>
            <li key={data.id} style={{ transform: value ? 'rotateY(0)' : 'rotateY(380deg)' }} className={styles.item}>
                <div className={styles.imgbox}>
                    <img src={data.avatar_url} alt="" className={styles.avatar} />
                </div>
                <a href={data.html_url} className={styles.text}>login: <span>{data.login}</span></a>
                <NavLink to='/userRepo' className={styles.text}>
                    repo:{data.public_repos}
                </NavLink>
            </li>
        </ul>
    );
};