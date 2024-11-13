"use client";
import MenuItem from "./MenuItem";
import { useState, useEffect } from "react";
import { IoLogoWhatsapp, IoMdCart } from "react-icons/io";
import { FaInstagramSquare, FaFacebook, FaHome } from "react-icons/fa";
import { MdRemoveCircle, MdOutlineCreateNewFolder } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import DropMenu from "./DropMenu";
export default function Header() {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    const fetchProductsRoutes = async () => {
      try {
        const response = await fetch("/api/product/create");
        const data = await response.json(); // Parse the JSON response
        setRoutes(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProductsRoutes();
  }, []);
  return (
    <div className="flex justify-between bg-lime-200 p-2">
      <div className="flex gap-4">
        <MenuItem
          title="Log In"
          address="/login"
          Icon={CiLogin}
          //onClick={run}
        />
        <MenuItem title="remove" address="/removeUser" Icon={MdRemoveCircle} />

        <DropMenu
          title="products"
          initAddress="/products"
          routes={routes}
        ></DropMenu>

        <MenuItem
          title="create products"
          address="/products/create"
          Icon={MdOutlineCreateNewFolder}
        />
        <MenuItem title="cart" address="/cart" Icon={IoMdCart} />
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
