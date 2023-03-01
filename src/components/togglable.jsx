import { forwardRef, useImperativeHandle, useState } from "react";

export const Togglable = forwardRef((props, ref) => {
  const { openButtonLabel, closeButtonLabel = "Cancel", children } = props;

  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => setVisible((visible) => !visible);

  useImperativeHandle(ref, () => ({ toggleVisiblity }));

  return (
    <div>
      <div style={{ display: visible ? "none" : undefined }}>
        <button type="button" onClick={toggleVisiblity}>
          {openButtonLabel}
        </button>
      </div>
      <div style={{ display: visible ? undefined : "none" }}>
        {children}
        <button type="button" onClick={toggleVisiblity}>
          {closeButtonLabel}
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";
