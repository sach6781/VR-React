import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const url = process.env.PUBLIC_URL + "/images/gslab_gavs.png";
  return (
    <div>
      <header>
        <img src={url} alt="Company Logo" style={{ maxWidth: '100%', height: '50px', width: '50%'}} />
        
      </header>
      <section>
        <h2>Welcome to VR Player!</h2>
        {/* Add more company details here */}
      </section>

      <section>
        <h2>Video Gallery</h2>
        <ul>
          <li>
            <Link to="/video/1">Video 1</Link>
          </li>
          <li>
            <Link to="/video/2">Video 2</Link>
          </li>
          {/* Add more video links as needed */}
        </ul>
      </section>

      <footer>
        <p>&copy; 2023 GsLab | GAVS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
