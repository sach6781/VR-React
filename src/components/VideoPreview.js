import React from 'react';
import { Link } from 'react-router-dom';

const VideoPreview = ({ videoId, videoTitle, thumbnailUrl }) => {
  return (
    <div style={{ marginBottom: '5px' }}>
      <Link to={`/video/${videoId}`}>
        <img src={thumbnailUrl} alt={`Thumbnail for ${videoTitle}`} style={{ maxWidth: '100%', height: 'auto' }} />
        <h3>{videoTitle}</h3>
      </Link>
    </div>
  );
};

export default VideoPreview;
