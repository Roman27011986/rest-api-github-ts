import React, { useState, useRef, useEffect } from "react";
import { getUsersByName } from "../../services/apiGithub";
import UsersList from "../UsersList";
import styles from './SearchUser.module.css'
const debounce = require('lodash.debounce');

export default function SearchUser  (){
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState(null);
 
  useEffect(() => {
    const users = sessionStorage.getItem('users')
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
    if (!value) {
      setData(null)
      return
    }
    delayedQuery(value);
  };

  return (
    <div className={styles.box}>
      <input type="text" placeholder="search user by name" value={value} onChange={handleChange} />
      {data && <UsersList data={data} />}
    </div>
  );
};