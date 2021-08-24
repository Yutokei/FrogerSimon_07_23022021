import { React, useEffect, useState, useContext } from "react";
import useAxiosGet from "../../Hook/useAxiosGet";
import Post from "../Post/Post";

const AdminPost = () => {
    const { data, loading, error } = useAxiosGet("post")


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
};

export default AdminPost;
