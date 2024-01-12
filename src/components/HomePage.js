import React from 'react';
import { Link } from 'react-router-dom';
import VideoPreview from './VideoPreview';

const HomePage = () => {
  const url = process.env.PUBLIC_URL + "/images/gslab_gavs.png";
  const eagle = process.env.PUBLIC_URL + "/images/eagle.png";
  const sea = process.env.PUBLIC_URL + "/images/360-sea.png";
  const london_bridge = process.env.PUBLIC_URL + "/images/london_bridge.png";

  const videoData = [
    {
      id: 'london_bridge_360',
      title: 'London Bridge',
      thumbnailUrl: london_bridge,
    },
    {
      id: 'sea_360',
      title: 'Dubai in 360',
      thumbnailUrl: sea,
    },
    {
      id: 'eagle_360',
      title: 'Eagle Soaring in Skies.',
      thumbnailUrl: eagle,
    }
    // Add more video data as needed
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100vh',
  };

  const headerStyle = {
    marginBottom: '5px',
    width: '80%',
    textAlign: 'center',
    padding: '5px',
  };

  const logoStyle = {
    maxWidth: '100%',
    height: 'auto',
    width: '45%',
  };

  const sectionStyle = {
    marginBottom: '20px',
    textAlign: 'center',
  };

  const videoListStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    listStyle: 'none',
    padding: '0',
    margin: '0',
  };

  const videoListItemStyle = {
    marginBottom: '20px',
    width: '300px', // Set a fixed width for each card
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const footerStyle = {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    padding: '10px',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <img src={url} alt="Company Logo" style={logoStyle} />
      </header>
      <section style={sectionStyle}>
        <h2>Welcome to VR Player!</h2>
        {/* Add more company details here */}
      </section>

      <section style={sectionStyle}>
        <h2>360 Video Gallery</h2>
        <ul style={videoListStyle}>
          {videoData.map((video) => (
            <li key={video.id} style={videoListItemStyle}>
               <Link to={`/video/${video.id}`}></Link>
              <VideoPreview
                videoId={video.id}
                videoTitle={video.title}
                thumbnailUrl={video.thumbnailUrl}
              />
            </li>
          ))}
        </ul>
      </section>

      <footer style={footerStyle}>
        <p>&copy; 2023 GsLab | GAVS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
