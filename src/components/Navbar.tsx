import { AppContext } from "@/ContextProvider";
import { Button, CartQty, Container, Nav } from "@/styles/globals";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import {CartIcon, HomeIcon} from "@/styles/Icons";
import { useSelector } from "react-redux";
import { sliceProducts } from "@/ContextProvider";

const Navbar = () => {
  const { cart } = useContext(AppContext);
  // const {cartProducts} = useContext(AppContext);
  const router = useRouter();

  const cartProductsTotal = useSelector<any>((store) => store.cartProducts);

  const goToCart = () => {
    router.push("/cart");
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <>
      <Nav>
       
        <Button onClick={goToHome}><HomeIcon props={undefined}/></Button> 
        <Button onClick={goToCart}>
          <CartIcon props={undefined} />
          <CartQty>{String(cartProductsTotal)}</CartQty>
        </Button>
      </Nav>
    </>
  );
};

export default Navbar;
