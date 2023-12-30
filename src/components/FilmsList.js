import React, { useState,useEffect } from 'react';
// import { Auth } from './auth';
import { db,auth } from '../config/firebaseConfig';
import {getDocs,collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';


const FilmsList = () => {
    const [movieList, setMovieList] = useState([]);

    // New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)
    const moviesListRef = collection(db,'movies');
    // update title state
    const [updatedTitle, setUpdatedTitle] = useState()
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
        userid: auth?.currentUser?.uid,
      });
      getMoviesList();
     } catch (error) {
      console.log(error);
     }
    }
    const deleteMovie = async (id)=>{
      const movieDoc = doc(db,'movies',id)
      await deleteDoc(movieDoc);
      getMoviesList();
    }
    const updateMovieTitle = async (id)=>{
      const movieDoc = doc(db,'movies',id)
      await updateDoc(movieDoc,{title:updatedTitle})
     getMoviesList();
    }
  return (
    <div>
      <h2> CRUD Operation on Movies List</h2>
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
            <button style={{backgroundColor:'blue'}} onClick={()=>deleteMovie(movie.id)}>Delete Movie</button><br/><br/>
            <input type="text"
            onChange ={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
          </div>
          )
          
        })}
      </div>
    </div>
  )
}

export default FilmsList
