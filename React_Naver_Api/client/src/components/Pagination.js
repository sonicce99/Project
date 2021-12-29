const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  let active = currentPage;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav">
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={number === active ? "page-item active" : "page-item"}>
            <a onClick={(event) => paginate(event, number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Pagination;