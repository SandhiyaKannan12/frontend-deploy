import React from "react";
import { Link } from 'react-router-dom'

const Home = (props) => {
    const { category, setCategory } = props;
    return (
        <div className="card-container">
            {category.map((user) => (
                <div className="card" key={user}>
                    {/* Pass category as a parameter in the URL */}
                    <Link to={`/expense/${user}`}><p>{user}</p></Link>
                </div>
            ))}
        </div>
    )
}
export default Home;
