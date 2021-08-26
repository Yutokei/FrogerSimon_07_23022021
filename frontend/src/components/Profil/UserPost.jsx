import {React} from 'react';
import useAxiosGet from '../../Hook/useAxiosGet';
import Post from '../Post/Post'

const UserPost = () => {
    const { data } = useAxiosGet("post/user")

    return (
            <ul className="post-list-container">
                {data.map((post)=>
                     (
                        <Post element={post} key={post.postId}/>    
                )
                )}
            </ul>
    )
                     }

export default UserPost
