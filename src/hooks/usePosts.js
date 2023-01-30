import { useMemo } from "react"

export const useSortedPosts = (posts, sort) => {
    // useMemo() кэширует данные, и когда происходит пересчет данных она берет эти данные из кэша, и не пересчитывает данные заного 
    // а если произошло изменение, то пересчитывает данные и записывает новые в кэш
    // Передаётся, колбэк функция, которая будет вызвана в случае изменения данных и параметры(массив зависимости)
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts])

    return sortedPosts
}

export const usePosts = (posts, sort, query) => {
    // Поиск по постам
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts
}