import './home.scss'
import Stories from '../stories/Stories'
import Share from '../share/Share'

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Stories />
        <Share />
      </div>
    </div>
  )
}

export default Home
