import React from 'react'

import './Pagination.scss'

function Pagination({page, lastPage, prev, next}) {

    const handlePrev = () => {
        if (prev !== undefined) {
            prev()
        }
    }

    const handleNext = () => {
        if (next !== undefined) {
            next()
        }
    }

    return <ul className="pagination-list">
        <li>
            <button onClick={handlePrev} disabled={page <= 1}>
                <span>&#171;</span> Prev
            </button>
        </li>
        <li>
            <span className="page-number">{page}</span>
        </li>
        <li>
            <button onClick={handleNext} disabled={page >= lastPage}>
                Next <span>&#187;</span>
            </button>
        </li>
    </ul>
}

export default Pagination