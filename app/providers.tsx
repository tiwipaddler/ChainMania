// "use client";

// import { type ReactNode } from "react";
// import { base } from "wagmi/chains";
// import { MiniKitProvider } from "@coinbase/onchainkit/minikit";

// export function Providers(props: { children: ReactNode }) {
//   return (
//     <MiniKitProvider
//       apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
//       chain={base}
//       config={{
//         appearance: {
//           mode: "auto",
//           theme: "mini-app-theme",
//           name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
//           logo: process.env.NEXT_PUBLIC_ICON_URL,
//         },
//       }}
//     >
//       {props.children}
//     </MiniKitProvider>
//   );
// }

// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useState, type ReactNode } from "react";
// import { WagmiProvider } from "wagmi";

// import { config } from "@/wagmi";

// export function Providers(props: { children: ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         {props.children}
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }
"use client"

import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { baseSepolia } from "wagmi/chains"; // or your chain
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { config } from "@/wagmi";

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia} // or your chain
      config={{
        appearance: {
          mode: "auto",
          theme: "mini-app-theme",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          logo: process.env.NEXT_PUBLIC_ICON_URL,
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </WagmiProvider>
    </MiniKitProvider>
  );
}