import React, { useState,useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import {getDocs,collection, addDoc} from 'firebase/firestore';


const FilmsList = () => {
    const [movieList, setMovieList] = useState([]);

    // New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)
    const moviesListRef = collection(db,'movies');

    const getMoviesList =async ()=>{
      //read the data
      // set the movie list 
    try {
      const data = await getDocs(moviesListRef);
      const filterdData = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      setMovieList(filterdData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    };

    useEffect(() => {
      getMoviesList();
    }, [])
    const onSubmitMovie = async ()=> {
     try {
      await addDoc(moviesListRef,{
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar : isNewMovieOscar,
      });
      getMoviesList();
     } catch (error) {
      console.log(error);
     }
    }
  return (
    <div>
      <h1>List of Movies</h1>
      <div>
        <input type="text" 
        placeholder='Add new movie title'
        onChange ={(e) => setNewMovieTitle (e.target.value)}
        />
        <input type="number" 
        placeholder=' Add Movie Release date'
        onChange ={(e) => setNewReleaseDate(Number(e.target.value)) }
        />
        <input type="checkbox" 
        checked={isNewMovieOscar}
        onChange ={(e) => setIsNewMovieOscar (e.target.checked)}
         />
        <label>Received an Oscar</label><br/><br/>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie)=>{
          return(
            <div>
            <h1 style={{color: movie.receivedAnOscar ? 'green' :'red'}}>{movie.title}</h1>
            <p>Date:{movie.releaseDate}</p>

          </div>
          )
          
        })}
      </div>
    </div>
  )
}

export default FilmsList
