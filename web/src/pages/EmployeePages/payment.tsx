import { useState } from "react";
import QRCodeComponent from "../../components/QrCode";
import { Watermark } from "../../components/Watermark";

export default function EmployeePaymentPage() {
  const [url] = useState("http://10.10.255.154/quentin.png");

  return (
    <Watermark text="SIMULATION PAYMENT">  
      <div>
          <main className=" m-25 flex items-center justify-center">
            <div className="p-4 bg-muted rounded-lg shadow-lg">
              <QRCodeComponent value={url} size={300} />
            </div>
          </main>
      </div>
    </Watermark>
  );
}
