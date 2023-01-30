import React from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { useState } from "react";

const PostForm = ({ create }) => {

    // Нужно для получения данных из управляемого инпута
    // Тут мы получаем только значение
    // const [title, setTitle] = useState("")
    // const [body, setBody] = useState("")

    // Нужно для получения данных из неуправляемого инпута
    // Получает доступ к DOM элементу, и у этого элемента получает value
    // Тут мы получаем полностью элемент через bodyInputRef.current, а там и значение можно получить
    // const bodyInputRef = useRef();
    
    const [post, setPost] = useState({ title: "", body: "" })

    const addNewPost = (e) => {
        e.preventDefault()

        const newPost = {
            ...post, id: Date.now()
        }

        create(newPost)

        setPost({ title: "", body: "" })
        // console.log(newPost)
        // console.log(title)
        // console.log(body)
        // console.log(bodyInputRef.current.value)
    }

    return (
        <form>
            {/* Управляемый компонент инпут*/}
            {/* Это называет двусторонее связывание */}
            <MyInput
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Название поста"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
                type="text"
                placeholder="Описание поста"
            />

            {/* Неупраляемый инпут */}
            {/* Не рекомендуется, но иногда необходимо */}
            {/* <MyInput
              ref={bodyInputRef}
              type="text"
              placeholder="Описание поста"
            /> */}

            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;