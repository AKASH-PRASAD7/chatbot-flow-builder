import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-2 text-center flex flex-col md:flex-row justify-center gap-2 md:gap-4 items-center">
      <div>
        <p className="text-sm">Made by &copy; {new Date().getFullYear()} Akash Prasad</p>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/AKASH-PRASAD7"
          target="_blank"
          className="hover:text-gray-400"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/akash-prasad7/"
          target="_blank"
          className="hover:text-gray-400"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://x.com/Akash_Prasad7"
          target="_blank"
          className="hover:text-gray-400"
        >
          <Twitter size={18} />
        </a>
        <a
          href="mailto:akashprsd7@gmail.com"
          target="_blank"
          className="hover:text-gray-400"
        >
          <Mail size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
