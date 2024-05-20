import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Head>
          <title>CRUD - NOSQL</title>
        </Head>
        <main>
          <ToastContainer />
          <Component {...pageProps} />
        </main>
      </>
    </QueryClientProvider>
  );
}
