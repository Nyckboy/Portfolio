import React from "react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Nyckboy", // Replace with your actual URL
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <title>GitHub</title>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/mouadabbassid", // Replace with your actual URL
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <title>LinkedIn</title>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
  {
    name: "Twitter",
    url: "https://twitter.com/nyckboy01", // Replace with your actual URL
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <title>Twitter</title>
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
    ),
  },
];

const SideElements: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <>
      {/* Left Side - Socials */}
      <div
        className={`fixed bottom-0 left-10 z-20 hidden md:flex flex-col items-center transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "1500ms" }}
      >
        <ul className="flex flex-col items-center space-y-6">
          {socialLinks.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white hover:-translate-y-1 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
        <div className="w-px h-24 bg-gray-400 mt-6"></div>
      </div>

      {/* Right Side - Email */}
      <div
        className={`fixed bottom-0 right-10 z-20 hidden md:flex flex-col items-center transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "1500ms" }}
      >
        <a
          href="mailto:abasside1234@gmail.com" // Replace with your email
          className="writing-mode-vertical-rl text-gray-400 tracking-widest text-sm hover:text-white hover:-translate-y-1 transition-all duration-300 font-space-grotesk"
        >
          abasside1234@gmail.com
        </a>
        <div className="w-px h-24 bg-gray-400 mt-6"></div>
      </div>
    </>
  );
};

export default SideElements;
