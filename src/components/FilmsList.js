import React, { useState } from 'react';
import {getDocs} from 'firebase/firestore';


const FilmsList = () => {
    const [movieList, setMovieList] = useState([]);
    useEffect(() => {
      const getMoviesList =async ()=>{
        //read the data
        // set the movie list 
      await 
      }
    }, [])
    
  return (
    <div>
      <h1>List of Movies</h1>
    </div>
  )
}

export default FilmsList
