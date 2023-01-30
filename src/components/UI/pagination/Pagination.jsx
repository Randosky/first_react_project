import React, { useMemo } from 'react'
import "../../../styles/App.css"
import { getPagesArray } from '../../../utils/pages'

const Pagination = ({ totalPages, page, changePage }) => {

    const pagesArray = useMemo(() => {
        return getPagesArray(totalPages)
    }, [totalPages])

    return (
        <div className="page__wrapper">
            {
                pagesArray.map(p => {
                    return <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={page === p ? 'page page__current' : 'page'}>
                        {p}
                    </span>
                })
            }
        </div>
    )
}

export default Pagination