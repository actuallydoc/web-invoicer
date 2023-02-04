import React from "react";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
type Props = {};
//Only logged in users can access this page
type Service = {
  name: string;
  price: number;
  quantity: number;
  total: number;
  vat: number;
};

function index({}: Props) {
  const [services, setServices] = useState<any>([]);
  useEffect(() => {
    //Check if user is logged in
  }, []);
  const handleCreate = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    var blobPDF = new Blob([doc.output()], { type: "application/pdf" });
    var blobUrl = URL.createObjectURL(blobPDF); //<--- THE ERROR APPEARS HERE
    //This opens a new tab with the PDF
    window.open(blobUrl); // will open a new tab
  };
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <h1>Create Invoice</h1>
    </div>
  );
}

export default index;
