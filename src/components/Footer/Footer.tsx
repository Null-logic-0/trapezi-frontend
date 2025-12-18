import Brand from "./Brand";
import QuickLinks from "./QuickLinks";
import Legal from "./Legal";
import SocialMedia from "./SocialMedia";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#292d33] text-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <Brand />

          {/* Quick Links */}
          <QuickLinks />

          {/* Legal */}
          <Legal />

          {/* Socials */}
          <SocialMedia />
        </div>

        {/* Payment Icons */}

        <div className="border-t border-[#54575c] flex justify-between items-center pt-4 text-xs font-semibold text-center text-[#a9abad]">
          <p>© {new Date().getFullYear()} Trapezi. All rights reserved.</p>
          <div className="flex justify-center items-center gap-6 text-3xl mb-6 text-[#fafafa]">
            <FaCcVisa />
            <FaCcMastercard />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
