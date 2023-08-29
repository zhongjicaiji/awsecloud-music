import React from 'react'
import classes from "./SearchBar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
  return (
    
    <label className={classes.label}> 
     <FontAwesomeIcon  icon={faMagnifyingGlass} />
        <input className={classes.input}  title='搜索框'  type="search" placeholder='薛之谦' />
    </label>
  )
}

export default SearchBar