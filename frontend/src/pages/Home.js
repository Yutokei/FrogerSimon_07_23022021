import {React, useEffect, useState, useContext} from 'react';
import { AuthContext } from '../auth/AuthContext'
import axios from 'axios';
import jwt_Decode from 'jwt-decode';
import Post from '../components/Post';
import AllPost from '../components/Post/Post';
import CreatePost from '../components/CreatePost/CreatePost'

const Home = () => {

    const { authState } = useContext(AuthContext);

    const decodedToken = jwt_Decode(localStorage.getItem("token"))

    const [allPosts, setAllPosts] = useState([]);

  const getPosts = () => { 
  axios({
        method:'GET',
        url:`${process.env.REACT_APP_API_URL}api/post/`,
        headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
    })
    .then((res)=> {
        setAllPosts(res.data)
        console.log(allPosts)
    })
}
    useEffect(()=> {
        getPosts();
    },[])

    
    return (
        <div className="profil-page">
            <div>
                <CreatePost />
            </div>
            <div>
                <>
                {allPosts.map((element, key) => (
                    <Post element={element} key={key}/>
                    ))
                }
                </>
           </div>
        </div>
    )
}



export default Home;