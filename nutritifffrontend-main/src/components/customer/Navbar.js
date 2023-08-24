import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-green bg-green" style={{backgroundColor:"olivedrab"}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item mx-3">
          <a className="nav-link active" href="/changeprofile"><b>Change profile</b></a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link active" href="#"><b>Change password</b></a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link active" href="#"><b>Favourites</b></a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link active" href="#"><b>My orders</b></a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link active" href="#"><b>My Subsciption</b></a>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
  )
}

export default Navbar