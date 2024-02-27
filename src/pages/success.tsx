import { AppContext, sliceProducts } from "@/ContextProvider";
import { Div, Wrapper } from "@/styles/globals";
import { Title } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";


export default function Success() {

  const {paid} = useContext(AppContext);
  const router = useRouter();
  const {setCartProducts} = useContext(AppContext);
  const {setCart} = useContext(AppContext);

  const dispatch = useDispatch();
  

  

  useEffect(() => { 
    if(paid === true){ setCart([]) ; dispatch(sliceProducts.actions.emptyCartProducts()); }
    setTimeout(() => {      
      router.push('/');
    }, 3000);
  }, []);

  if (paid === false) {
    return (<Div><Wrapper><h1>Payment failed</h1></Wrapper></Div>);
  }

  return (
    <>
      <Div>
        <Wrapper>
          <h2>Success</h2>
          <p>You&rsquo;re being redirected...</p>
        </Wrapper>
      </Div>
    </>
  );
}
