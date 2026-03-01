import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Twitter, Instagram } from "lucide-react";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "All Products",  to: "/products"    },
      { label: "Fashion",       to: "/fashion"      },
      { label: "Electronics",   to: "/electronics"  },
      { label: "Home & Living", to: "/home"         },
      { label: "Sports",        to: "/sports"       },
      { label: "Deals",         to: "/deals"        },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Login",        to: "/login"   },
      { label: "Register",     to: "/register"},
      { label: "My Profile",   to: "/profile" },
      { label: "My Orders",    to: "/orders"  },
      { label: "Wishlist",     to: "/wishlist"},
      { label: "My Cart",      to: "/cart"    },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "FAQ",               to: "/faq"      },
      { label: "Shipping Policy",   to: "/shipping" },
      { label: "Return Policy",     to: "/returns"  },
      { label: "Track Order",       to: "/track"    },
      { label: "Contact Us",        to: "/contact"  },
      { label: "Privacy Policy",    to: "/privacy"  },
    ],
  },
];

const socials = [
  { Icon: Github,    href: "https://github.com",    label: "GitHub"    },
  { Icon: Twitter,   href: "https://twitter.com",   label: "Twitter"   },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          <div className="lg:col-span-2 flex flex-col gap-5">

            <Link to="/" className="flex items-baseline w-fit select-none">
              <span className="text-2xl font-extrabold text-white">All</span>
              <span className="text-2xl font-extrabold text-indigo-400">-</span>
              <span className="text-xl font-semibold text-slate-400">In</span>
              <span className="text-2xl font-extrabold text-indigo-400">-</span>
              <span className="text-2xl font-extrabold text-indigo-400">One</span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Your one-stop shop for everything you need. Quality products,
              fast delivery, and excellent customer service.
            </p>

            <div className="flex flex-col gap-2.5 text-sm">
              <a href="mailto:support@allinone.com" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <Mail size={15} className="text-indigo-500" />
                support@allinone.com
              </a>
              <a href="tel:+11234567890" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <Phone size={15} className="text-indigo-500" />
                +977 98123456
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-indigo-500" />
                I-Clicked 6th Floor
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"         
                  rel="noopener noreferrer" 
                  aria-label={label}      
                  className="bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white p-2.5 rounded-lg transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

          </div>
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">

              {/* Column heading */}
              <h4 className="text-white font-semibold text-sm tracking-wide">
                {heading}
              </h4>

              {/* Links list */}
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar: copyright ── */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">

          {/* Copyright */}
          <p>© {new Date().getFullYear()} All-In-One. All rights reserved.</p>
         

          {/* Legal links */}
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link to="/terms"   className="hover:text-slate-400 transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-slate-400 transition-colors">Cookies</Link>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;