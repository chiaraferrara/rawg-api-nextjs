import { ReactNode, createContext, useEffect, useState } from "react";
import { Cart, Product, TContext } from "./declarations";
import { useRouter } from "next/router";
import { configureStore, createSlice } from "@reduxjs/toolkit";


export const getServerSideProps = async () => {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      throw new Error('API key is not defined.');
    }

    const res = await fetch(`https://api.rawg.io/api/games?&key=${apiKey}`);
    const data = await res.json();

    return { props: { data, apiKey } };
  } catch (error : any) {
    return { props: { error: error.message } };
  }
};

export const sliceProducts = createSlice({
  name: "cartProducts",
  initialState: 0,
  reducers: {
    setCartProducts: (state, action) => state + action.payload,
    decreaseCartProducts: (state, action) => state - action.payload,
    emptyCartProducts: (state) => 0,

  },
});

export const store = configureStore({
  reducer: {
    cartProducts: sliceProducts.reducer,
  }
});

export const AppContext = createContext<TContext>({
  cart: [],
  setCart: () => {},
  paid: false,
  products: null,
  cartProducts: 0,
  setCartProducts: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  reduceQuantity: () => {},
  increaseQuantity: () => {},
  getTotalPrice: () => 0,
  pay: () => {},
  done: () => {},
  // getProductQuantity: () => 0,
  loading: false,
  error: "",
});

// interface Props {
//   children: ReactNode;
// }

interface Props {
  children: ReactNode;
  data: any;
  apiKey: string;
  error: string;
}

export function ContextProvider({ children, data, apiKey, error: string }: Props) {

  const [cart, setCart] = useState<TContext["cart"]>([]);
  const [paid, setPaid] = useState<TContext["paid"]>(false);
  const [products, setProducts] = useState<TContext["products"]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cartProducts, setCartProducts] = useState<number>(0);

  const addToCart = (idProduct: Product["id"]) => {
    const found = cart.find((el) => el.id === idProduct);
    const product = products?.find((el) => el.id === idProduct);
    if (!!found) {
      const newCart = cart.map((el) => {
        if (el.id !== idProduct) return el;
        return {
          id: el.id,
          name: product?.name ?? "",
          quantity: el.quantity + 1,
          description: product?.description ?? "",
          background_image: product?.background_image ?? "",
          price: product?.price ?? Math.floor(Math.random() * 60) + 1,
        };
      });
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        {
          id: idProduct,
          name: product?.name ?? "",
          quantity: 1,
          description: product?.description ?? "",
          background_image: product?.background_image ?? "",
          price: product?.price ?? Math.floor(Math.random() * 60) + 1,
        },
      ]);
    }
  };

  const removeFromCart = (idProduct: Product["id"]) => {
    const newCart = cart.filter((el) => el.id !== idProduct);
    setCart(newCart);
  };

  const reduceQuantity = (idProduct: Product["id"]) => {
    const newCart = cart.reduce((acc, el) => {
      if (el.id === idProduct) {
        if (el.quantity > 1) {
          acc.push({
            id: el.id,
            name: el.name,
            quantity: el.quantity - 1,
            description: el.description,
            background_image: el.background_image,
            price: el.price,
          });
          return acc;
        }
        return acc;
      } else {
        acc.push(el);
        return acc;
      }
    }, [] as Cart);
    setCart(newCart);
  };


  const increaseQuantity = (idProduct: Product["id"]) => {
    const newCart = cart.map((el) => {
      if (el.id === idProduct) {
        return {
          id: el.id,
          name: el.name,
          quantity: el.quantity + 1,
          description: el.description,
          background_image: el.background_image,
          price: el.price,
        };
      }
      return el;
    });
    setCart(newCart);
  };

  const router = useRouter();


  const navigateToSuccess = () => {
    router.push('/success');
};


  const pay = () => {
    navigateToSuccess();
    setPaid(true);
    // setCart([]);
    
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.rawg.io/api/games?&key=${apiKey}`);
      const data = await response.json();
      setProducts(data.results);
      setLoading(false);
    } catch (error : any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const done = () => {
    setPaid(false);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, el) => {
      return acc + el.price * el.quantity;
    }, 0);
  };

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     setProducts(data.results);
  //     setLoading(false);
  //   } catch (error: any) {
  //     setError(error.message);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    console.log(apiKey)
    if (!products && !error) {
      getProducts();
    }
  }, []);


  return (
    <AppContext.Provider
    value={{
      cart,
      setCart,
      paid,
      products,
      cartProducts,
      setCartProducts,
      addToCart,
      removeFromCart,
      reduceQuantity,
      increaseQuantity,
      getTotalPrice,
      pay,
      loading,
      error,
      done,
    }}
  >
      {children}
    </AppContext.Provider>
  );
}
