import axios from 'axios'
import React, { useEffect } from 'react'
import { Chip } from "@material-ui/core"


const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {
    const fetchGenres = async()=>{
        const {data}=await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=00c0c07dfded532b45ecbeba5fc3aac6&language=en-US`
        )
        setGenres(data.genres)
    }
    console.log(genres)
    useEffect(()=>{
        fetchGenres();
       
          // eslint-disable-next-line
    },[])

    const handleClick=(genre)=>{
        setSelectedGenres([genre,...selectedGenres]);
        setGenres(genres.filter((g)=> 
             g.id!== genre.id
        ))
        
        setPage(1)

    }
    const handleDelete=(genre)=>{
        
    setSelectedGenres(selectedGenres.filter((s)=>
    s.id!== genre.id
    ))
    setGenres([...genres,genre])
        setPage(1)

    }

  return (
    <div style={{ padding: "6px 0" }}>
    {selectedGenres && selectedGenres.map((genre)=>(
        <Chip
        label={genre.name}
        style={{margin:4,boxShadow:"0 5px 10px black"}}
        size="small"
        color='primary'
        key={genre.id}
        clickable
        onDelete={()=>handleDelete(genre)}
        />
    ))}
    {genres && genres.map((genre)=>(
        <Chip
        label={genre.name}
        style={{margin:4,boxShadow:"0 5px 10px black"}}
        size="small"
        key={genre.id}
        clickable
        onClick={()=>handleClick(genre)}
        />
    ))}
    
    </div>
  )
}

export default Genres