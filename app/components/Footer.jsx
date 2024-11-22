import { Mail, Phone } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col gap-3 border-t bg-blue-100 p-5 md:pl-10">
      <div className="flex w-full flex-col justify-between gap-3 border-b md:flex-row">
        <img className="h-10" src="/shopy.svg" alt="image" />
        <div className="flex flex-1 flex-col justify-end gap-4 md:flex-row">
          <div className="flex items-center justify-center gap-2">
            <Phone size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-500">+91 555-555-555</h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail size={12} className="text-blue-500" />
            <h2 className="text-sm text-gray-500">webdevcarlosl@gmail.com</h2>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <h3 className="text-xs text-gray-700">@2024. All rights reserved</h3>
      </div>
    </footer>
  );
};

export default Footer;
