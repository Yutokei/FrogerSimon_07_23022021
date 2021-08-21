import {React, useState, useEffect} from 'react';
import axios from 'axios';
import jwt_Decode from 'jwt-decode';
import Post from './Post'

const Index = () => {

    const [allPosts, setAllPosts] = useState([]);

    const decodedToken = jwt_Decode(localStorage.getItem("token"))

    const getPosts = () => { 
    axios({
          method:'GET',
          url:`${process.env.REACT_APP_API_URL}api/post/`,
          headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
      })
      .then((res)=> {
          setAllPosts(res.data)
      })
  }

    useEffect(()=> {
        getPosts();
    },[])

    return (
        <>
        <div className="profil-container">
            <div>
                Séparation
            </div>
            {allPosts.map((post, key) => (
                    <Post element={post} key={key}/>
                    ))
                }
        </div>
        </>
    );
}

export default Index;
