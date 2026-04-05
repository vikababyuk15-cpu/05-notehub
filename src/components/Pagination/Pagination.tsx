import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

// Допоміжний тип: описує модуль, у якого реальний експорт лежить у полі .default. Це потрібно для коректної роботи з бібліотекою, яка експортує компонент як CommonJS модуль.
type ModuleWithDefault<T> = { default: T };

// Дістаємо справжній React-компонент із .default, щоб React отримав саме компонент.
// Ми явно повідомляємо TS форму значення, щоб зберегти правильні типи пропсів
// (ReactPaginateProps) і мати коректну перевірку/підказки в IDE.

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;
