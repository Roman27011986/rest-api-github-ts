import {useState, useEffect } from "react";
import { getUserRepo,getUserInfo } from '../../services/apiGithub';
import { withRouter } from "react-router";
import Loader from "react-loader-spinner";
import styles from './UserDitails.module.css'

const UserDitails = ({ history, match }: any) => {
    const [user, setUser] = useState<any>(null);
    const [repo, setRepo] = useState<any>([]);
    const [filter, setfilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    useEffect(() => {
        getRepo(match.params.user)
        getUserDitails(match.params.user)
    }, [match.params.user]);
    
    const getRepo = async (name: string) => {
        setIsLoading(true)
        const response = await getUserRepo(name)
        setIsLoading(false)
        setRepo(response?.data)
    };

    const getUserDitails = async (name: string) => {
        const response = await getUserInfo(name)
        setUser(response?.data)
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
            { !isLoading ? <div className={styles.userDitailsBox}>
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
           </div> : <Loader type="ThreeDots"
                      color="#00BFFF"
                      height={100}
                      width={100}
                      timeout={3000}/> }
            <input type="text" placeholder='filter repo by name' onChange={e => setfilter(e.target.value)} value={filter} />
            <h2 className={styles.title}>User repo:</h2>
           { !isLoading ? <ul className={styles.repoList}>
                {visibleRpo.map((element: any) => (
                    <li key={element.id}>
                        <a target="_blank" className={styles.text} href={element.svn_url} rel="noreferrer">{element.name}</a>
                    </li>
                ))}
            </ul> : <Loader type="ThreeDots"
                      color="#00BFFF"
                      height={100}
                      width={100}
                      timeout={3000}/> }  
            </div>
    );
};

export default withRouter(UserDitails)