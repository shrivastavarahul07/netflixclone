import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const apikey = "099007c401e11b2b5d2153e5d1ebea2c"
const url = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/original"
const movie = "discover/movie"
const trending = "trending/movie/day"
const tv = "trending/tv/day"
const tvshow = "tv/popular"

const Card = ({ img }) => (
  <img className='card' src={img} alt="cover" />
)

const Row = ({ title, arr = [] }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {arr.map((item , index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>

)

const Home = () => {

  const [upcomingMovies, setupcomingMovies] = useState([])
  const [movies, setmovies] = useState([])
  const [trendings, settrendings] = useState([])
  const [tvshows, settvshows] = useState([])

  useEffect(() => {
    const fetchPopular = async()=>{
      const {data : {results}} = await axios.get(`${url}/${tv}?api_key=${apikey}`)
      setupcomingMovies(results)
    }

    const fetchMovies = async()=>{
      const {data : {results}} = await axios.get(`${url}/${movie}?api_key=${apikey}`)
      setmovies(results)
    }

    const fetchTrending = async()=>{
      const {data : {results}} = await axios.get(`${url}/${trending}?api_key=${apikey}`)
      settrendings(results)
    }

    const fetchTvShows = async()=>{
      const {data : {results}} = await axios.get(`${url}/${tvshow}?api_key=${apikey}`)
      settvshows(results)
    }

    fetchPopular();
    fetchMovies();
    fetchTrending();
    fetchTvShows();
  }, [])
  
  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage:movies[0] ? `url(${`${imgUrl}/${movies[0].poster_path}`})` : "rgb(20,20,20)"
      }}>

          {movies[0] && <h1>{movies[0].original_title}</h1>}
          {movies[0] && <p>{movies[0].overview}</p>}

          <div>
          <button>Play <BiPlay/></button>
          <button>Watch Later <AiOutlinePlus/></button>
          </div>
      </div>

      <Row title={"Popular on Netflix"} arr={upcomingMovies}/>
      <Row title={"TV Shows"} arr={tvshows}/>
      <Row title={"Movies"} arr={movies}/>
      <Row title={"Recently Added"} arr={trendings}/>
    </section>
  )
}

export default Home