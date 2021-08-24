import {React, useContext} from 'react';
import { AuthContext } from '../auth/AuthContext'
import Post from '../components/Post';
import CreatePost from '../components/CreatePost/CreatePost'

const Home = () => {

    const { authState } = useContext(AuthContext);
 
    return (
        <div className="profil-page">
            <div>
                <CreatePost />
            </div>
                <>
                    <Post />
                </>
        </div>
    )
}



export default Home;