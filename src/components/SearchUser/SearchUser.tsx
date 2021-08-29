import React, { useState, useRef, useEffect } from "react";
import { getUsersByName } from "../../services/apiGithub";
import UsersList from "../UsersList";
import styles from './SearchUser.module.css'
const debounce = require('lodash.debounce');

export default function SearchUser  (){
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
 
  useEffect(() => {
    const users = sessionStorage.getItem('users')
    const parsedUsers = JSON.parse(users!)
    parsedUsers ? setData(parsedUsers) : setData([])
  },[])
  
  const delayedQuery = useRef(debounce(async (q: string) => {
    const response = await getUsersByName(q)
    setData(response)
  }, 500)).current;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
    if (!value) {
      refreshPage()
      return
    }
    delayedQuery(value);
  };

  const refreshPage = () => {
    setData([])
    setValue('')
    sessionStorage.removeItem('users')
  }

  return (
    <div className={styles.box}>
      <div>
        <input type="text"  placeholder="search user by name" value={value} onChange={handleChange} />
        {data?.length > 0 && <button onClick={refreshPage} className={styles.btnRefresh}>Refresh page</button>}
      </div>
      {data?.length > 0 && <UsersList data={data} />}
    </div>
  );
};