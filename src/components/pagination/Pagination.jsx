import { useState } from "react";

export default function Pagination({
  totalItems,
  loadPage,
  limitProduct = 5,
  movement,
}) {
  const [page, setPage] = useState(0);
  const totalBtns = Math.ceil(totalItems / limitProduct);

  function handlePageChange(value) {
    setPage(value);
    loadPage({ page: value });
    if (movement) return window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderButtons() {
    const buttons = [];
    for (let i = 0; i < totalBtns; i++) {
      if (totalBtns === 1) return null;
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border px-3 text-sm font-medium tabular-nums transition-colors duration-200 ${page === i ? "border-accent bg-accent text-text-on-accent" : "border-borders bg-surface text-text-muted hover:border-text-muted hover:text-text"}`}
        >
          {i + 1}
        </button>,
      );
    }
    return buttons;
  }

  return (
    <div className="mt-auto flex justify-center gap-2">{renderButtons()}</div>
  );
}
