import React, { useState, CSSProperties } from 'react';
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'

const styles: { [key: string]: CSSProperties } = {
  Tital:{
    fontSize: '20px'
  }
}

function AllBook() {
  return (
    <>
        <Header />
        <SearchBar />
        <div style={styles.Tital}>All Book</div>
    </>
  )
}

export default AllBook