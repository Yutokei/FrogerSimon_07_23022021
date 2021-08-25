import {React, useState} from 'react';
import Post from './Post';
import  useAxiosGet from '../../Hook/useAxiosGet'
import './style.scss'

const Index = () => {
    const [update, setUpdate] = useState(0)
    const {data, loading, error} = useAxiosGet("post/", update,)

    return (
        <>
        <ul className="post-list-container">
            {data.map((post, key) => (
                    <Post element={post} mappingKey={key} />
                    ))
                }
        </ul>
        </>
    );
}

export default Index;
