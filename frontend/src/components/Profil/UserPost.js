import {React, useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../auth/AuthContext'
import Post from '../Post/Post'
import axios from 'axios';
import jwt_Decode from 'jwt-decode';

const UserPost = () => {
    const { authState } = useContext(AuthContext);
    const [listOfPosts, setListOfPosts] = useState([]);
    const [uptdatePost, setUptdatePost] = useState(0)


    const decodedToken = jwt_Decode(localStorage.getItem("token"))

    useEffect(()=> {
        const getPostsFromUser = ()=>{
            axios({
             method:'GET',
             url:`${process.env.REACT_APP_API_URL}api/post/user`,
             headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
         })
         .then((res)=> {
             setListOfPosts(res.data)
         }
         )}
         getPostsFromUser()
    }, [uptdatePost])




            //setUptdatePost( n => n+1)

    return (
        <div>
            <ul>
                {listOfPosts.map((post, key)=>
                     (
                        <Post element={post} key={key}/>    
                )
                )}
            </ul>
        </div>
    )
                     }

export default UserPost
