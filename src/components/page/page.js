import React from "react";
import "./page.scss";

export default React.forwardRef(function Page({ name, children }, ref) {
  return (
    <div className={`page page--${name}`} ref={ref}>
      {children}
    </div>
  );
});
