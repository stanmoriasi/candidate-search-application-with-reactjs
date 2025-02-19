import CandidateSearch from "../pages/CandidateSearch";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <>
    <nav >
      <ul className="nav">
        <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="/candidate" className="nav-link">Potential Candidates</a></li>
      </ul>
      <CandidateSearch />
    </nav>
    </>
  )
};

export default Nav;
