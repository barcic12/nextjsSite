import MenuItem from "./MenuItem";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagramSquare, FaFacebook, FaHome } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
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
