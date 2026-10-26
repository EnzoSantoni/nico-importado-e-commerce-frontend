import { useState } from "react"


export default function Pagination({totalItems, loadPage, limitProduct}) {
    const [ page, setPage] = useState(0);
    const totalBtns = Math.ceil(totalItems / limitProduct)

    function handlePageChange(value) {
        setPage(value);
        loadPage(value)
    }

    function renderButtons() {
        const buttons = [];
        for (let i = 0; i < totalBtns; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)} className={`px-3 py-1 rounded-md cursor-pointer ${page === i ? 'bg-accent text-text-on-accent' : 'bg-surface text-text'}`}>
                    {i + 1}
                </button>
            )
        }
        return buttons
    }



    return (
        <div className="flex gap-2 justify-center">
            {renderButtons()}
        </div>
    )
}
