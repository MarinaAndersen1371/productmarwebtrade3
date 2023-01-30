import React from "react";
import { Pagination } from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

const Paginate = ({ pages, page }) => {
  const location = useLocation();
  const path = location.pathname;
  const baseURL =
    path.split("/page/")[0] === "/" ? "" : path.split("/page/")[0];

  if (pages <= 1) return null;

  return (
    <Pagination className='justify-content-center my-3'>
      {page >= 2 && (
        <Pagination.Item as='div'>
          <NavLink to={`${baseURL}/page/${page - 1}`}>
            <i className='fas fa-angle-double-left'></i>
          </NavLink>
        </Pagination.Item>
      )}
      {page >= 2 && (
        <Pagination.Item as='div'>
          <NavLink to={`${baseURL}/page/${page - 1}`}>{page - 1} </NavLink>
        </Pagination.Item>
      )}
      <Pagination.Item as='div' active={page}>
        <NavLink to={`${baseURL}/page/${page}`} className='lavender'>
          {page}
        </NavLink>
      </Pagination.Item>
      {pages - page > 0 && (
        <Pagination.Item as='div'>
          <NavLink to={`${baseURL}/page/${page + 1}`}>{page + 1} </NavLink>
        </Pagination.Item>
      )}

      {pages - page > 0 && (
        <Pagination.Item as='div'>
          <NavLink to={`${baseURL}/page/${page + 1}`}>
            <i className='fas fa-angle-double-right'></i>{" "}
          </NavLink>
        </Pagination.Item>
      )}
    </Pagination>
  );
};

export default Paginate;
