import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './utils.css';

export const RedesSociales = () => {
  return (
    <div className="social">
      <span>Redes Sociales</span>
      <a className="social-link" href="#">
        <FaFacebook />
      </a>
      <a className="social-link" href="#">
        <FaTwitter />
      </a>
      <a className="social-link" href="#">
        <FaLinkedin />
      </a>
      <a className="social-link" href="#">
        <FaInstagram />
      </a>
    </div>
  );
};

