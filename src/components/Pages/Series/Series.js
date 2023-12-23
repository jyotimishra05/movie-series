import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';
import Genres from '../../Genres';
import useGenre from '../../Hooks/useGenre';

const Series = () => {
  const[page,setPage]=useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genresForUrl = useGenre(selectedGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=00c0c07dfded532b45ecbeba5fc3aac6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresForUrl}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  
    
  };
  useEffect(()=>{
fetchMovies();
// eslint-disable-next-line
  },[page,genresForUrl])
  return (
    <>
      <span className='pageTitle'>DISCOVER SERIES</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
    <div className="trending">
      {
        content&& content.map((c)=>(
          <SingleContent
             key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
          />
        )
        )
      }
    </div>
    {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
   </>
  )
}

export default Series