import {React, useEffect, useState, useContext} from 'react';
//import { AuthContext } from '../../auth/AuthContext'
import axios from 'axios';
import jwt_Decode from 'jwt-decode';

const UserPost = () => {

    const [listOfPosts, setListOfPosts] = useState([]);
    //const { authState } = useContext(AuthContext);

    const decodedToken = jwt_Decode(localStorage.getItem("token"))

    useEffect(()=> {

        axios({
            method:'GET',
            url:`${process.env.REACT_APP_API_URL}api/post/user`,
            headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
        })
        .then((res)=> {
            setListOfPosts(res.data)
            console.log(listOfPosts)
        })
    }, [])

    const deletePost = (id) => {
        axios({
            method:'DELETE',
            headers:{token: localStorage.getItem("token"), uuid: decodedToken.uuid},
            url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
        })
        .then(()=>{
            axios({
                method:'get',
                url:`${process.env.REACT_APP_API_URL}api/post/user`,
                headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
            })
            .then((res)=> {
                setListOfPosts(res.data)
                console.log(listOfPosts)
            })  
        })
    }

    return (
        <div>
            <ul>
                {listOfPosts.map((post, key)=>{
                    return (
                        <li key={key} className="">
                            <div className="">
                                <h3>{post.userName}</h3>
                                <span>Posté le {post.createdAt}</span>
                            </div>
                            <div className="">
                                <h3>{post.textContent}</h3>
                            </div>  
                            <div className="">
                                <h3>{post.imageContent}</h3>
                            </div>
                            <button onClick={()=> {deletePost(post.postId)}} className="danger post-id">Supprimer le post</button>  
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default UserPost;
