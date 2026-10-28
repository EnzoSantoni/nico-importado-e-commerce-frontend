import { useState } from "react"


export default function Pagination({totalItems, loadPage, limitProduct = 5, movement}) {
    const [ page, setPage] = useState(0);
    const totalBtns = Math.ceil(totalItems / limitProduct)

    function handlePageChange(value) {
        setPage(value);
        loadPage({page: value})
        if(movement) return window.scrollTo({ top: 0, behavior: 'smooth' })

    }

    

    function renderButtons() {
        const buttons = [];
        for (let i = 0; i < totalBtns; i++) {

            if(totalBtns === 1) return null
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)} className={`min-w-10 h-10 px-3 flex items-center justify-center rounded-md border text-sm font-medium tabular-nums cursor-pointer transition-colors duration-200 ${page === i ? 'border-accent bg-accent text-text-on-accent' : 'border-borders bg-surface text-text-muted hover:text-text hover:border-text-muted'}`}>
                    {i + 1}
                </button>
            )
        }
        return buttons
    }



    return (
        <div className="flex gap-2 justify-center mt-auto">
            {renderButtons()}
        </div>
    )
}
