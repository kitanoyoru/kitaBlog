// Basic imports
import Link from "next/link";

// Types
import { NextPage } from 'next'


const Header: NextPage = () => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>Logo</a>
        </Link>
      </div>
      <nav>
        <Link href="/about">
          <div>
            <h1>About</h1>
            <div></div>
          </div>
        </Link>
        <Link href="/contact">
          <div>
            <h1>Contact me</h1>
            <div></div>
          </div>
        </Link>
      </nav>
    </div>    
  );
};

export default Header;


