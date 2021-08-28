import {useState, useEffect } from "react";
import { getUserRepo } from '../../services/apiGithub';
import { withRouter } from "react-router";
import styles from './UserDitails.module.css'

const UserDitails = ({ history }: any) => {
    const [user, setUser] = useState<any>(null);
    const [repo, setRepo] = useState<any>([]);
    const [filter, setfilter] = useState<string>('');
    
    useEffect(() => {
        const users = localStorage.getItem('users')
        const parsUser = JSON.parse(users!)
        setUser(parsUser)
        getRepo(parsUser.repos_url)
    }, []);
    
    const getRepo = async (url: string) => {
        const res = await getUserRepo(url)
        setRepo(res?.data)
    };

    const visibleRpo = repo.filter((item: any) => {
        return item.name.toLowerCase().includes(filter)
    });

    const handleGoBack = () => {
        history.push('/')
     };

    return (
        <div className={styles.userDitailsPageBox}>
            <button onClick={handleGoBack} className={styles.btn}>Go back</button>
            <div className={styles.userDitailsBox}>
            <div className={styles.imgBox}>
                <img src={user?.avatar_url}  alt={user?.login} />
            </div>
            <ul className={styles.userinfo}>
                <li className={styles.item}>login: <span className={styles.text}>{user?.login}</span></li>
                <li className={styles.item}>repos: <span className={styles.text}>{user?.public_repos}</span></li>
                <li className={styles.item}>followers: <span className={styles.text}>{user?.followers}</span></li>
                <li className={styles.item}>following: <span className={styles.text}>{user?.following}</span></li>
                <li className={styles.item}>created: <span className={styles.text}>{user?.created_at.split('T')[0].split('-').reverse().join('-')}</span></li>
            </ul>
           </div>
            <input type="text" placeholder='filter repo by name' onChange={e => setfilter(e.target.value)} value={filter} />
            <h2 className={styles.title}>User repo:</h2>
            <ul className={styles.repoList}>
                {visibleRpo.map((element: any) => (
                    <li key={element.id}>
                        <a target="_blank" className={styles.text} href={element.svn_url} rel="noreferrer">{element.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withRouter(UserDitails)