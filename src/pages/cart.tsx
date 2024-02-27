import { AppContext, sliceProducts } from "@/ContextProvider";
import {
  Btn,
  Button,
  CartContainer,
  CartWrapper,
  Container,
  Div,
  FlexColumn,
  FlexRow,
  Img,
  ProductInfo,
  Wrapper,
} from "@/styles/globals";
import { use, useContext, useEffect, useState } from "react";

import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const { products } = useContext(AppContext);
  const { cart } = useContext(AppContext);
  const { removeFromCart } = useContext(AppContext);
  const { reduceQuantity } = useContext(AppContext);
  const { increaseQuantity } = useContext(AppContext);
  const { getTotalPrice } = useContext(AppContext);
  const { cartProducts, setCartProducts } = useContext(AppContext);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const dispatch = useDispatch();

  const onClickMinus = () => {
    dispatch(sliceProducts.actions.decreaseCartProducts());
  };
  const onClickPlus = () => {
    dispatch(sliceProducts.actions.setCartProducts(1));
  };

  const router = useRouter();

  const navigateToBuy = () => {
    router.push("/payment");
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [cart]);

  if (cart.length < 1) return <h1>Cart is empty</h1>;
  return (
    <>
      <Div>
        <Wrapper>
          <h1>Shopping Cart:</h1>
        </Wrapper>
        <hr />
        <CartWrapper>
          {cart.map((el) => (
            <div key={el.id}>
              {" "}
            
              <FlexRow>
                <Img src={el.background_image} />
               
                <FlexColumn>
                   <h3 style={{margin:0, padding:0}}>{el.name}</h3>
                  <div>
                    <strong style={{margin:0, padding:0}}>Price: {el.price}€</strong>
                   <Btn
                  onClick={() => {
                    reduceQuantity(el.id);
                    onClickMinus();
                  }}
                >
                  -
                </Btn>{" "}
                {el.quantity}
                <Btn
                  onClick={() => {
                    increaseQuantity(el.id);
                    onClickPlus();
                  }}
                >
                  +
                </Btn></div>{" "}
                </FlexColumn>
                 <Button
                onClick={() => {
                  removeFromCart(el.id);
                  setCartProducts(cartProducts - el.quantity);
                }}
              >
                remove
              </Button>
                <br />
              </FlexRow>
            </div>
            // <Card
            //   sx={{ display: "flex", m: "20px", maxWidth: "400px" }}
            // >
            //   <Box sx={{ display: "flex", flexDirection: "column" }}>
            //     <CardContent sx={{ flex: "1 0 auto" }}>
            //       <Btn onClick={() => { removeFromCart(el.id);
            //       setCartProducts(cartProducts - el.quantity)}}>
            //         remove from cart
            //       </Btn>
            //       <Typography component="div" variant="h5">
            //         Quantity:
            //         <br />
            //         <Btn onClick={() => {reduceQuantity(el.id);
            //         onClickMinus()}}>-</Btn>{" "}
            //         {el.quantity}<Btn onClick={() => {
            //         increaseQuantity(el.id);
            //         onClickPlus()}}>+</Btn> <br />
            //         Price: {el.price}€
            //       </Typography>
            //     </CardContent>
            //   </Box>
            //   <CardMedia>
            //     <h5>{el.name}</h5>
            //     <Img src={el.background_image} />
            //   </CardMedia>
            // </Card>
          ))}
          <div>
            <ProductInfo>Total : {totalPrice}€</ProductInfo>
            <Btn onClick={() => navigateToBuy()}>Buy</Btn>
          </div>
        </CartWrapper>
      </Div>
    </>
  );
}
