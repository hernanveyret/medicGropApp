import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import './qr.css';

const Qr = ({dataQr, setIsQr}) => {
  const ref = useRef(null);
  
const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  data: JSON.stringify(dataQr),
  dotsOptions: { color: "#000", type: "rounded" },
  backgroundOptions: { color: "#fff" },
  imageOptions: { crossOrigin: "anonymous", margin: 5 },
});

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = ""; // limpiar si se vuelve a renderizar
      qrCode.append(ref.current);
    }
  }, []);

  const handleDownload = () => {
    qrCode.download({ name: "qr-code", extension: "png" });
  };

  return (
    <div className="container-qr">
      <div ref={ref}  className="qr"></div>
      <button onClick={() => {setIsQr(false)}} className="btn">salir</button>
    </div>
  );
};
//<button onClick={handleDownload}>Descargar QR</button>

export default Qr;