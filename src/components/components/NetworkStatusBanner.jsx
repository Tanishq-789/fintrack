// src/components/NetworkStatusBanner.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function NetworkStatusBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const showOfflinePopup = () => {
    MySwal.fire({
      icon: "error",
      title: "You're offline",
      html: `
        <div style="font-size: 15px; color: #555;">
          Please check your internet connection.
        </div>
      `,
      background: "#fff",
      confirmButtonText: "Retry",
      confirmButtonColor: "#6366F1",
      showCloseButton: true,
      allowOutsideClick: false,
      customClass: {
        popup: "swal2-shadow-custom",
        title: "swal2-title-custom",
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) popup.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
      },
    }).then((result) => {
      if (!navigator.onLine) {
        showOfflinePopup(); // Retry loop if still offline
      }
    });
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      showOfflinePopup();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Show popup immediately if offline
    if (!navigator.onLine) showOfflinePopup();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null;
}

export default NetworkStatusBanner;



// // src/components/NetworkStatusBanner.jsx
// import { useEffect, useState } from 'react';

// function NetworkStatusBanner() {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);

//   if (isOnline) return null;

//   return (
//     <div
//       style={{
//         backgroundColor: '#ff4d4f',
//         color: 'white',
//         padding: '0.75rem',
//         textAlign: 'center',
//         fontWeight: 'bold',
//         position: 'fixed',
//         top: 0,
//         width: '100%',
//         zIndex: 1000,
//       }}
//     >
//       ⚠️ You're offline. Please check your connection.
//     </div>
//   );
// }

// export default NetworkStatusBanner;
