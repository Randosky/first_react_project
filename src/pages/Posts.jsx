import React, { useEffect, useState, useRef } from "react";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostService from "../API/PostService"
import { usePosts } from "../hooks/usePosts";
import "../styles/App.css"
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages"
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  // const [value, setValue] = useState("Какой-то текст")

  const lastElement = useRef()
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: "", query: "" })
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {

    const response = await PostService.getAll(limit, page);
    const totalCount = response.headers["x-total-count"]

    setPosts([...posts, ...response.data])
    setTotalPages(getPageCount(totalCount, limit))
  })

  // Две функции, которые получают аргументы из дочернего элемента
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  // хук useEffect, передаётся колбэк функция и параметры. Функция для размонтирования, параметры для мотирования.
  // массив пустой, чтобы она отработала лишь единожды
  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line
  }, [page, limit])

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  return (
    <div className="App">
      {/* <h1>{value}</h1>
      <input
        type="text"
        value={value}
        onChange={event => setValue(event.target.value)} />
      <Counter />
      <ClassCounter /> */}

      <MyButton style={{ marginRight: "50px" }} onClick={fetchPosts}>Получить посты для наполнения</MyButton>
      <MyButton style={{ marginTop: "30px" }} onClick={() => { setModal(true) }}>Добавить новый пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} ></PostForm>
      </MyModal>
      <hr style={{ margin: "15px 0" }}></hr>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 15, name: '15'},
          {value: 20, name: '20'},
          {value: -1, name: 'Показать все'},
        ]}
      />
      {
        postError &&
        <h1>Произошла ошибка &{postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"}></PostList>
      <div ref={lastElement} style={{ height: "20px", background: "transpanent" }}></div>
      {
        isPostsLoading &&
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "150px" }}><Loader /></div>
      }

      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  );
}

export default Posts;
