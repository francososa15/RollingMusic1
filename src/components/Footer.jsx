import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        
        <div className="mb-3">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white mx-2 hover-text-green-400"
          >
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white mx-2 hover-text-green-400"
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white mx-2 hover-text-green-400"
          >
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div>

        <div className="mb-3">
          <p className="mb-0">
            <i className="fas fa-envelope me-2"></i> info@tuapp.com
          </p>
        </div>

        <div className="text-secondary small">
          © {new Date().getFullYear()} Tu App Musical
        </div>
      </div>
    </footer>
  );
};

export default Footer;