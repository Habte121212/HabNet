import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { AuthContext } from '../../context/AuthContext'
import './navbar.scss'

function Navbar() {
  const { currentUser } = useContext(AuthContext)
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="left">
        {/* headerLogo */}
        <Link to="/" className="logo-link" aria-label="Home">
          <span>
            <img
              src="/image.png"
              alt="HabNet Logo"
              style={{ height: 60, width: 100, objectFit: 'contain' }}
            />
          </span>
        </Link>
        <HomeOutlinedIcon aria-label="Home" />
        <div className="language">
          <select name="language" id="language-select">
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="am">AM</option>
            <option value="ar">AR</option>
          </select>
        </div>

        <GridViewOutlinedIcon aria-label="Dashboard" />
        <div className="search">
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon aria-label="Profile" />
        <ChatBubbleOutlineOutlinedIcon aria-label="Messages" />
        <NotificationsNoneOutlinedIcon aria-label="Notifications" />
        <div className="user">
          <img
            src={currentUser?.profilePic || '/Avater.png'}
            alt="User avatar"
          />
          <span>{currentUser?.name || 'Guest'}</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
