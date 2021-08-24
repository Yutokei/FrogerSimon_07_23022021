import {React, useEffect, useState, useContext} from 'react';
import useAxiosGet from '../../Hook/useAxiosGet';
import Post from '../Post/Post'

const UserPost = () => {
    const { data, loading, error } = useAxiosGet("post/user")
    const [uptdatePost, setUptdatePost] = useState(0)
    console.log(data)



    return (
        <div>
            <ul>
                {data.map((post, key)=>
                     (
                        <Post element={post} mappingKey={key}/>    
                )
                )}
            </ul>
        </div>
    )
                     }

export default UserPost
