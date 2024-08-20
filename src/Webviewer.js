import React, { useState, useEffect, useRef } from "react";

const WebViewer = () => {
  const defaultUrl = "https://www.example.com";
  const [url, setUrl] = useState(defaultUrl);
  const [pageTitle, setPageTitle] = useState("Web Viewer");
  const [darkMode, setDarkMode] = useState(false);
  const iframeRef = useRef(null);

  const handleChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl.trim() === "" ? defaultUrl : newUrl);
  };

  useEffect(() => {
    const updateTitle = () => {
      if (iframeRef.current) {
        try {
          const iframeDocument = iframeRef.current.contentDocument;
          if (iframeDocument) {
            setPageTitle(iframeDocument.title || "Web Viewer");
          }
        } catch (e) {
          setPageTitle("Web Viewer");
        }
      }
    };

    updateTitle();
    const intervalId = setInterval(updateTitle, 1000);

    return () => clearInterval(intervalId);
  }, [url]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: darkMode ? "#1E1E1E" : "#E5E5E5",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: darkMode ? "#2D2D2D" : "#FFFFFF",
          borderRadius: "10px",
          boxShadow: darkMode
            ? "0 4px 20px rgba(0, 0, 0, 0.3)"
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "85vh",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5px 10px 0 10px",
            backgroundColor: darkMode ? "#333333" : "#EADEF7",
            position: "relative",
            borderRadius: "10px 10px 0 0",
          }}
        >
          {/* Control Buttons */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              position: "absolute",
              // left: "70px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: darkMode ? "#FF605C" : "#FF605C",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></div>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: darkMode ? "#FFBD44" : "#FFBD44",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></div>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: darkMode ? "#00CA4E" : "#00CA4E",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></div>
          </div>

          {/* Tab Name */}
          <div
            style={{
              fontWeight: "500",
              fontSize: "14px",
              color: darkMode ? "#FFFFFF" : "#333333",
              backgroundColor: darkMode ? "#444444" : "#FEF7FF",
              borderRadius: "12px 12px 0 0",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              marginLeft: "70px",
              padding: "8px 16px",
            }}
          >
            {pageTitle}
          </div>
        </div>

        {/* URL Input Container */}
        <div
          style={{
            padding: "8px",
            backgroundColor: darkMode ? "#444444" : "#FEF7FF",
            borderBottom: darkMode ? "1px solid #555555" : "1px solid #E0E0E0",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={url}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: darkMode ? "#555555" : "#EDE7F2",
              borderRadius: "20px",
              border: "none",
              color: darkMode ? "#FFFFFF" : "#000000",
              boxSizing: "border-box",
            }}
            placeholder="Enter a URL here..."
          />

          {/* Dark Mode Toggle Switch */}
          <div
            style={{
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              marginLeft: "8px",
              position: "relative",
              width: "50px",
              height: "20px",
              backgroundColor: darkMode ? "#555555" : "#EADEF7",
              borderRadius: "15px",
              padding: "5px",
            }}
            onClick={toggleDarkMode}
          >
            {/* Moon Icon */}
            <i
              className={`fa-regular fa-moon ${darkMode ? "" : "hidden"}`}
              style={{
                color: "#FFFFFF",
                fontSize: "18px",
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></i>
            {/* Sun Icon */}
            <i
              className={`fa-regular fa-sun ${darkMode ? "hidden" : ""}`}
              style={{
                color: "#FFFFFF",
                fontSize: "18px",
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></i>

            {/* Toggle Circle */}
            <div
              style={{
                width: "23px",
                height: "23px",
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
                position: "absolute",
                top: "3px",
                left: darkMode ? "calc(100% - 28px)" : "3px",
                transition: "left 0.3s",
              }}
            ></div>
          </div>

          {/* Google Profile Icon */}
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#EF6C00",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "14px",
              marginLeft: "10px",
            }}
          >
            M
          </div>
        </div>

        {/* Web View Frame */}
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 120px)",
            borderRadius: "0 0 10px 10px",
            overflow: "hidden",
          }}
        >
          <iframe
            ref={iframeRef}
            src={url}
            title="Web Viewer"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WebViewer;
