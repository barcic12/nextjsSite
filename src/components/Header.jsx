import MenuItem from "./MenuItem";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  FaInstagramSquare,
  FaFacebook,
  FaHome,
  FaListUl,
} from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
export default function Header() {
  return (
    <div className="flex justify-between bg-lime-200 p-2">
      <div className="flex gap-4">
        <MenuItem
          title="Sign Up"
          address="/signup"
          Icon={CiLogin}
          //onClick={run}
        />
        <MenuItem title="remove" address="/removeUser" Icon={MdRemoveCircle} />
        <MenuItem title="items" address="/items" Icon={FaListUl} />
        <MenuItem title="cart" address="/cart" Icon={BsCart4} />
        <MenuItem
          title="whatsApp"
          address="https://wa.me/972509090004"
          Icon={IoLogoWhatsapp}
          target="_blank"
        />
        <MenuItem
          title="instagram"
          address="https://www.instagram.com/barcicurel"
          Icon={FaInstagramSquare}
          target="_blank"
        />
        <MenuItem
          title="facebook"
          address="https://www.facebook.com/bcicurel050"
          Icon={FaFacebook}
          target="_blank"
        />
      </div>
      <div className="">
        <MenuItem title="home" address="/" Icon={FaHome} />
      </div>
    </div>
  );
}
