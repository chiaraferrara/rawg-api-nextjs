import Head from "next/head";
import { Inter } from "next/font/google";
import { useContext, useEffect } from "react";
import { AppContext, sliceProducts } from "@/ContextProvider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Wrapper } from "@/styles/globals";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { products, loading, error } = useContext(AppContext);
  const { addToCart } = useContext(AppContext);
  const { cartProducts, setCartProducts } = useContext(AppContext);
  // const { getProductQuantity } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    console.log(products);
    console.log(loading);
    console.log(error);
  }, []);

  const redirectToProduct = (id: string) => {
    router.push(`/${id}`);
  };

  const dispatch = useDispatch();

  const onClickAddToCart = () => {
    dispatch(sliceProducts.actions.setCartProducts(1));
  };

  return (
    <>
   <Wrapper><h1>Products:</h1></Wrapper>
         <hr />
      <Container>
         
        {products && products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} sx={{ width: 245, m: 0.5 }}>
              <CardMedia sx={{ height: 140 }} image={product.background_image
} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                
                  <br/>
                  <br/>
                  Released: {product.released}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {product.rating}
                </Typography>
              </CardContent>
              <CardActions>
               
                  <Button
                    size="small"
                    onClick={() => {
                      addToCart(product.id);
                      onClickAddToCart();
                    }}
                  >
                    Add to cart
                  </Button>

                <Button
                  onClick={() => {
                    redirectToProduct(product.id.toString());
                  }}
                >
                  Detail
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </Container>
    </>
  );
}
