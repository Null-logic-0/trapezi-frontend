import Brand from "./Brand";
import QuickLinks from "./QuickLinks";
import Legal from "./Legal";
import SocialMedia from "./SocialMedia";

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

        <div className="border-t border-[#54575c] pt-8 text-xs font-semibold text-center text-[#a9abad]">
          <p>© {new Date().getFullYear()} Trapezi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
