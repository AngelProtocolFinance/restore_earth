//import Image from "next/image";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  useWallet,
  getChainOptions,
  WalletProvider,
  WalletStatus,
  ConnectType,
} from "@terra-money/wallet-provider";

const Terra = ({ onConnectionSuccess, onConnectionError }) => {
  const {
    // status,
    // network,
    // wallets,
    //availableConnectTypes,
    // availableInstallTypes,
    availableConnections,
    connect,
    // install,
    // disconnect,
  } = useWallet();

  return (
    <>
      {availableConnections
        .filter(({ type }) => type != ConnectType.READONLY)
        .map(({ type, name, icon, identifier = "" }) => (
          <li key={"connection-" + type + identifier}>
            <button onClick={() => connect(type, identifier)}>
              <img src={icon} alt={name} width={16} height={16} />
              {name}
            </button>
          </li>
        ))}
    </>
  );
};

const TerraConnections = ({ onConnectionSuccess, onConnectionError }) => {
  useEffect(() => {
    getChainOptions().then((chainOptions) => {
      ReactDOM.render(
        <WalletProvider {...chainOptions}>
          <Terra
            onConnectionSuccess={onConnectionSuccess}
            onConnectionError={onConnectionError}
          />
        </WalletProvider>,
        document.getElementById("terra-wallet-connect")
      );
    });
  });

  return <ul id="terra-wallet-connect"></ul>;
};

// const ConnectTerra = () => {
// const {
//   status,
//   network,
//   wallets,
//   availableConnectTypes,
//   availableInstallTypes,
//   availableConnections,
//   connect,
//   install,
//   disconnect,
// } = useWallet();

//   return (
//     <div>
//       <h1>Connect Sample</h1>
//       <section>
//         <pre>
//           {JSON.stringify(
//             {
//               status,
//               network,
//               wallets,
//               availableConnectTypes,
//               availableInstallTypes,
//             },
//             null,
//             2
//           )}
//         </pre>
//       </section>

//       <footer>
//         {status === WalletStatus.WALLET_NOT_CONNECTED && (
//           <>
//             {availableInstallTypes.map((connectType) => (
//               <button
//                 key={"install-" + connectType}
//                 onClick={() => install(connectType)}
//               >
//                 Install {connectType}
//               </button>
//             ))}
// {
//   availableConnectTypes.map((connectType) => (
//     <button key={"connect-" + connectType} onClick={() => connect(connectType)}>
//       Connect {connectType}
//     </button>
//   ));
// }
//             <br />
//             {availableConnections.map(
//               ({ type, name, icon, identifier = "" }) => (
//                 <button
//                   key={"connection-" + type + identifier}
//                   onClick={() => connect(type, identifier)}
//                 >
//                   <img
//                     src={icon}
//                     alt={name}
//                     style={{ width: "1em", height: "1em" }}
//                   />
//                   {name}
//                 </button>
//               )
//             )}
//           </>
//         )}
//         {status === WalletStatus.WALLET_CONNECTED && (
//           <button onClick={() => disconnect()}>Disconnect</button>
//         )}
//       </footer>
//     </div>
//   );
// };

export default TerraConnections;
