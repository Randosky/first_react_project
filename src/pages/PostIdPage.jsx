import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import Loader from '../components/UI/loader/Loader'
import { useFetching } from '../hooks/useFetching'

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const responce = await PostService.getByID(id)
        setPost(responce.data);
    });
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const responce = await PostService.getCommentsByID(id)
        setComments(responce.data);
    });

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [params.id])

    return (
        <div>
            <h1>Вы открыли страницу поста c ID = {params.id}</h1>
            {
                isLoading
                    ? <div style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}><Loader /></div>
                    : <div>{post.id}. {post.title}<div>{post.body}</div></div>
            }
            <h1 style={{ marginTop: "15px", marginBottom: "15px" }}>
                Комментарии
            </h1>
            {
                isComLoading
                    ? <div style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}><Loader /></div>
                    : <div>
                        {comments.map(comm =>
                            <div key={comm.id} style={{ marginTop: "15px" }}>
                                <h5>{comm.email}</h5>
                                <div>{comm.body}</div>
                            </div>)}
                    </div>
            }
        </div>
    )
}

export default PostIdPage