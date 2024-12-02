'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  documentId: string;
  id: string;
  title: string;
  price: number;
  description: string;
  category_name: string;
  image: string;
  quantity?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  getCartTotal: () => number;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // const [cartItems, setCartItems] = useState<CartItem[]>(() => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('cartItems')
  //       ? JSON.parse(localStorage.getItem('cartItems') || '[]')
  //       : [];
  //   } else {
  //     return [];
  //   }
  // });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems));
      } catch (error) {
        console.error("Failed to parse cart items from localStorage", error);
        setCartItems([]);
      }
    }
  }, []);

  const addToCart = (item: any) => {
    const isItemInCart = cartItems.find((cartItem: any) => cartItem.documentId === item.documentId);
    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem: any) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: CartItem) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.documentId === item.documentId);
    if (isItemInCart) {
      const currentQuantity = isItemInCart.quantity ?? 0;
      if (currentQuantity === 1) {
        setCartItems(cartItems.filter((cartItem) => cartItem.documentId !== item.documentId));
      } else {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.documentId === item.documentId
              ? { ...cartItem, quantity: currentQuantity - 1 }
              : cartItem
          )
        );
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total: any, item: any) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};



















// 'use client';
// import { createContext, useState, useEffect, ReactNode } from 'react';


// export interface CartItem{
//   documentId:string;
//   id:string;
//   title:string;
//   price:number;
//   description:string;
//   category_name:string;
//   image:string;
//   quantity?:number;
// }
// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (item: CartItem) => void;
//   getCartTotal: () => number;
//   clearCart:()=>void;
// }

// export const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({children}:{ children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>(
//     localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')||'[]') : [])

//   const addToCart = (item:any) => {
//     const isItemInCart = cartItems.find((cartItem:any) => cartItem.documentId === item.documentId);

//     if (isItemInCart) {
//       setCartItems(
//         cartItems.map((cartItem:any) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity:( cartItem.quantity || 0 )+ 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (item: CartItem) => {
//     const isItemInCart = cartItems.find((cartItem) => cartItem.documentId === item.documentId);

//     if (isItemInCart) {
//       const currentQuantity = isItemInCart.quantity ?? 0;
//     if (currentQuantity === 1) {
//       setCartItems(cartItems.filter((cartItem) => cartItem.documentId !== item.documentId));
//     } else {
//       setCartItems(
//         cartItems.map((cartItem) =>
//           cartItem.documentId === item.documentId
//             ? { ...cartItem, quantity: currentQuantity - 1 }
//             : cartItem
//         )
//       );
//     }
//   }
//   };
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce((total:any, item:any) => total + item.price * item.quantity, 0);
//   };

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   useEffect(() => {
//     const cartItems = localStorage.getItem("cartItems");
//     if (cartItems) {
//       setCartItems(JSON.parse(cartItems));
//     }
//   }, []);
//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         getCartTotal,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );

  
// };



