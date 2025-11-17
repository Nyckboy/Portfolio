import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white font-space-grotesk">
      <div className="container mx-auto px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          {/* Column 1: Identity */}
          <div className="md:col-span-2">
            <h2 className="text-4xl font-bold font-space-grotesk">
              Mouad Abbassid
            </h2>
            <p className="mt-3 text-lg text-white/70">
              Full-Stack Developer • Crafting modern and scalable experiences
            </p>
          </div>

          {/* Column 2: Navigation + Quote */}
          <div className="md:text-right">
            <ul className="space-y-4">
              <li>
                <a
                  href="#home"
                  className="text-lg text-white/80 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-lg text-white/80 hover:text-white transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com"
                  className="text-lg text-white/80 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-lg text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
            <p className="mt-10 text-lg italic text-white/60">
              “Tout ça c'est le destin, mon pote.” - Ninho
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Separator and Copyright */}
      <div className="container mx-auto px-24">
        <div className="w-full h-px bg-white/10"></div>
        <div className="text-center py-12">
          <p className="text-base text-white/40">
            © {currentYear} Mouad Abbassid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

