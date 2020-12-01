import React from "react";
import { Pagination } from "react-bootstrap";

const PageBar = ({ userWatchList, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(userWatchList.length / 6); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {pageNumbers.map((num) => (
        <Pagination.Item key={num} onClick={() => paginate(num)}>
          {num}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PageBar;
