import { AppContext } from "@/ContextProvider";
import { Button, Div, FlexColumn, FlexRow, Img, ProductInfo, Wrapper } from "@/styles/globals";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sliceProducts } from "../ContextProvider";
import CardActions from "@mui/material/CardActions";
import { API_KEY } from "../../api";

export default function ProductPage() {
  const router = useRouter();
  const { idProduct } = router.query;
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useContext(AppContext);
  const dispatch = useDispatch();
  


 const onClickAddToCart = () => {
     dispatch(sliceProducts.actions.setCartProducts(1));
  };


  useEffect(() => {
    if (idProduct) {
      getProductDetails();
    }
  }, [idProduct]);


  const getProductDetails = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games/${idProduct}?key=${API_KEY}`
    );
    const data = await response.json();
    setProduct(data);
    console.log(product)
  };

  if(!product) { return <Div><h1>Loading...</h1></Div> }
return (
    <>
    <Div>
    <Wrapper><h1>Product Details:</h1></Wrapper>
         <hr />
        {product &&  (
          <>
                <Wrapper>
                        <h2>{product.name}</h2>
                        <FlexRow>
                        <Img src={product.background_image} alt={product.title} />
                       
                        <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                        
                        <br/>
                        <p></p>
                        
                </FlexRow>
                
                <ProductInfo>Release: {product.released} | Rating : {product.rating}</ProductInfo>
                <CardActions><Button onClick={() => {
                    addToCart(product.id);
                    onClickAddToCart();
                }}>Add To Cart</Button></CardActions>
                </Wrapper>
                
                </>
        )} 
        
        </Div>
    </>
);
}
