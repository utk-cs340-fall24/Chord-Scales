import React, { useState } from 'react';

const scaleDetails = {
  major: "Major scale: Happy and bright in nature. It is used in a wide variety of music genres.",
  minor: "Minor scale: Sad and emotional. It's commonly used in genres that require emotional depth.",
  diminished: "Diminished scale: Creates a sense of tension and suspense, suitable for jazz and experimental music.",
  augmented: "Augmented scale: Often used for solos in jazz music, providing a complex and intriguing sound.",
  pentatonic: "Pentatonic scale: Commonly used for solos in rock, blues, and pop music due to its simplicity and effectiveness."
};

const ScaleInfoSidebar = ({ scaleType }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div className="scale-info-sidebar">
      <button onClick={toggleVisibility}>{visible ? 'Hide Info' : 'Show Info'}</button>
      {visible && scaleType && (
        <div>
          <h3>Scale Information</h3>
          <p>{scaleDetails[scaleType] || 'Select a scale or chord to see more information.'}</p>
        </div>
      )}
    </div>
  );
};

export default ScaleInfoSidebar;