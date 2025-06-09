import './share.scss'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'

const Share = () => {
  const { currentUser } = useContext(AuthContext)
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!desc && !file) {
      setError('Please add a description or a file.')
      return
    }
    // ...submit logic here...
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.ProfilePic || '/Avater.png'} alt="" />
          <input
            type="text"
            placeholder={`what is in your mind ${currentUser.name}`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="actions">
          <ul className="share-actions">
            <li className="item">
              <InsertPhotoOutlinedIcon />
              <span>Photo</span>
            </li>
            <li className="item">
              <VideocamOutlinedIcon />
              <span>Video</span>
            </li>
            <li className="item">
              <EmojiEmotionsOutlinedIcon />
              <span>Emoji</span>
            </li>
          </ul>
          <div className="right">
            <button
              onClick={handleSubmit}
              disabled={loading || (!desc && !file)}
              className="sharebutton"
            >
              {loading ? (
                <>
                  <svg
                    style={{ marginRight: 6, verticalAlign: 'middle' }}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Sharing...
                </>
              ) : (
                <>
                  <svg
                    style={{ marginRight: 6, verticalAlign: 'middle' }}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Share
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share
