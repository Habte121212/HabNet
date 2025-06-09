import './rightbar.scss'

const RightBar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="suggestions">
          <h2>Suggestions For You</h2>
          <div className="user">
            <img src="/image.png" alt="User" />
            <span>User Name</span>
            <button>Follow</button>
            <button>Dismiss</button>
          </div>
        </div>
        <div className="recent">
          <h2>Recent Activity</h2>
          <div className="activity">
            <span>Profile pic change</span>
          </div>
          <div className="activity">
            <span>User2 commented on your photo</span>
          </div>
        </div>
        <div className="online">
          <h2>Online Friends</h2>
          <div className="user">
            <img src="/image.png" alt="User" />
            <span>User Name</span>
            <span className="online-dot"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar
