import {React, useState} from 'react';
import Post from './Post';
import  useAxiosGet from '../../Hook/useAxiosGet'
const Index = () => {
    const [update, setUpdate] = useState(0)
    const {data, loading, error} = useAxiosGet("post/", update,)

    return (
        <>
        <div className="profil-container">
            <div>
                Séparation
            </div>
            {data.map((post, key) => (
                    <Post element={post} mappingKey={key} />
                    ))
                }
        </div>
        </>
    );
}

export default Index;
