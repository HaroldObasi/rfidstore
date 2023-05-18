import Head from "next/head";
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";

export default function Home() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://70yashkdmb.execute-api.eu-central-1.amazonaws.com/production"
    );

    const message = {
      action: "sendMessage",
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(message));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      setCart(json.payload);
      console.log("data from event: ", json);
      console.log(`[message] Data received from server: ${json}`);
      try {
        if ((json.event = "data")) {
          console.log(json.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <>
      <Head>
        <title>Your cart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,900;1,400;1,600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main className="font-poppins max-w-screen-md md:mx-auto mx-3 pt-5 md:pt-10">
        <h1 className="text-3xl font-bold">Your cart</h1>
        {cart.length >= 1 && <p>You have {cart.length} items in your cart</p>}

        {cart.map((item) => (
          // <div>{item.itemName}</div>
          <CartItem item={item} />
        ))}

        {cart.length >= 1 && (
          <button className="bg-red-600 hover:bg-red-400 p-3 w-full rounded-md text-lg text-white">
            Check out
          </button>
        )}
      </main>
    </>
  );
}
