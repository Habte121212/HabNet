import './leftbar.scss'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { useContext } from 'react'
import { useNavigate} from 'react-router-dom'

const Leftbar = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className="leftbar">
      <div className="leftbar-logo">
        <span>HabNet</span>
      </div>
      <div className="leftbar-menu">
        <div className="user">
          <img src={currentUser?.profilePic || '/Avater.png'} alt="User" />
          <span>{currentUser?.name || 'Guest'}</span>
        </div>
        <div className="menu-item">
          <PersonAddAlt1OutlinedIcon />
          <span>Friends</span>
        </div>
        <div className="menu-item">
          <GroupOutlinedIcon />
          <span>Groups</span>
        </div>
        <div className="menu-item">
          <ChatBubbleOutlineOutlinedIcon />
          <span>Messages</span>
        </div>
        <div className="menu-item">
          <WorkOutlineOutlinedIcon />
          <span>Job</span>
        </div>
        <div className="menu-item">
          <CodeOutlinedIcon />
          <span>skill</span>
        </div>
        <div
          className="menu-item"
          onClick={() => navigate('/bookmarks')}
          style={{
            pointerEvents: currentUser ? 'auto' : 'none',
            opacity: currentUser ? 1 : 0.5,
          }}
        >
          <BookmarksTwoToneIcon />
          <span>Bookmark</span>
        </div>
        <div className="menu-item" onClick={() => navigate('/settings')}>
          <SettingsIcon />
          <span>Settings</span>
        </div>
        <div className="menu-item" onClick={() => navigate('/logoout')}>
          <LogoutIcon />
          <span>logo out</span>
        </div>
      </div>
    </div>
  )
}

export default Leftbar
