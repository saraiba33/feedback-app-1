import { Link } from "react-router-dom"
import Card from "../components/shared/Card"

function AboutPage() {
  return (
    <Card>
    <div>
        <h1>
            About this project
        </h1>
        <p>This is  areact app to leave feedback</p>
        <p>version 1.0.0</p>
        <p>
            <Link to="/">Back to home</Link>
        </p>
    </div>
    </Card>
  )
}

export default AboutPage