// Basic imports
import { FaGithub, FaTwitter, FaTelegram } from "react-icons/fa"

// Types
import type { FC } from "react";
import type { IconType } from "react-icons";

type Socials = {
  Twitter: {
      icon: IconType,
      link: string
  },
  Telegram: {
      icon: IconType,
      link: string
  },
  Github: {
      icon: IconType,
      link: string
  }
}

const Footer: FC= () => {
  const socials: Socials = {
    Twitter: {
      icon: FaTwitter,
      link: "https://twitter.com/kitanoyoru_"
    },
    Telegram: {
        icon: FaTelegram,
        link: ""
    },
    Github: {
        icon: FaGithub,
        link: "https://github.com/kitanoyoru"
    }
  };

  return (
    <footer>
      <div>
        <div>
          <h1>kitaBlog</h1>
          <p></p>
        </div>
        <div></div>
      </div> 
      <h1>Copyright</h1>
    </footer>
  );    
};

export default Footer;
