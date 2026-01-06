import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { path: "/", label: "Home" },
        { path: "/properties", label: "Search Properties" },
        { path: "/design-space", label: "Design My Space" },
        { path: "/consultation", label: "Free Consultation" },
        { path: "/about", label: "About Us" },
      ],
    },
    {
      title: "Services",
      links: [
        { path: "/buy", label: "Buy Property" },
        { path: "/sell", label: "Sell Property" },
        { path: "/rent", label: "Rent Properties" },
        { path: "/interior-design", label: "Interior Design" },
        { path: "/consultation", label: "Expert Consultation" },
      ],
    },
    {
      title: "Support",
      links: [
        { path: "/contact", label: "Contact Us" },
        { path: "/faq", label: "FAQ" },
        { path: "/privacy", label: "Privacy Policy" },
        { path: "/terms", label: "Terms of Service" },
        { path: "/support", label: "Customer Support" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
  ];

  const contactInfo = [
    { icon: <Phone size={18} />, text: "+1 (555) 123-4567" },
    { icon: <Mail size={18} />, text: "hello@astra-homes.com" },
    { icon: <MapPin size={18} />, text: "123 Design District, Creative City" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <footer className="bg-gray-900 text-white ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.img
                src="./assets/logo1.png"
                alt="AstraHomes"
                className="h-14 w-14 transition-transform duration-300 group-hover:scale-105"
                whileHover={{ rotate: 5 }}
              />
              <motion.span
                className="text-3xl font-sans font-bold text-white tracking-wide"
                whileHover={{ color: "#4ECDC4" }}
              >
                AstraHomes
              </motion.span>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Transforming spaces into dream homes. We offer premium property solutions, 
              innovative interior design, and expert consultation to help you find or create 
              the perfect living space.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-gray-300"
                  whileHover={{ x: 5, color: "#4ECDC4" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-6 text-white relative inline-block">
                {section.title}
                <motion.div
                  className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-secondary"
                  whileHover={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li key={linkIndex} whileHover={{ x: 5 }}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-gray-300 hover:text-secondary transition-colors duration-200 group text-sm"
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-gray-800 py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <motion.p
              whileHover={{ color: "#4ECDC4" }}
              transition={{ duration: 0.2 }}
            >
              © {currentYear} AstraHomes. All rights reserved.
            </motion.p>
            
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="hover:text-secondary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-secondary transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="hover:text-secondary transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;