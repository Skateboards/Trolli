import React from "react";

// See more loading icons here:
// https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons
const PageLoader = () => {
  return (
    <div className="page-loader">
      <img
        src="https://res.cloudinary.com/merrickcloud/image/upload/v1549773351/Rolling-1.3s-83px_glqaie.gif"
        alt="amazing-awesome-dog"
      />
      {/* <em className="fas fa-circle-notch fa-spin fa-2x text-muted" /> */}
    </div>
  );
};

export default PageLoader;
