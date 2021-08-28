import React, { useState, useRef, useEffect } from "react";
import { getUsersByName } from "../../services/apiGithub";
import { withRouter } from "react-router";
import UsersList from "../UsersList";
import styles from './SearchUser.module.css'
const debounce = require('lodash.debounce');

// interface User {
//   avatar_url: string;
//   bio: string;
//   blog: string;
//   company: string;
//   created_at: string;
//   events_url: string;
//   followers: number;
//   followers_url: string;
//   following: number;
//   following_url: string;
//   gists_url:string;
//     gravatar_id:string;
//     hireable:boolean;
//     html_url:string;
//     id:number;
//     location:string;
//     login:string;
//     name:string;
//     node_id:string;
//     organizations_url:string;
//   public_gists:number;
//   public_repos:number;
//   received_events_url:string;
//   repos_url:string;
//   site_admin:boolean;
//   starred_url:string;
//   subscriptions_url:string;
//   type:string;
//   updated_at:string;
//   url:string;
// }

const SearchUser = () => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState(null);
 
  useEffect(() => {
    const users = localStorage.getItem('users')
    const parsedUsers = JSON.parse(users!)
    parsedUsers ? setData(parsedUsers) : setData(null)
  },[])
  
  const delayedQuery = useRef(debounce(async (q: string) => {
    const response = await getUsersByName(q)
    setData(response)
    
  }, 500)).current;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
    delayedQuery(value);
  };

  return (
    <div className={styles.box}>
      <input type="text" placeholder="search user by name" value={value} onChange={handleChange} />
      {data && <UsersList data={data} />}
    </div>
  );
};

export default withRouter(SearchUser)