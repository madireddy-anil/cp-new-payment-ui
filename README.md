# New Payment UI

Micro Frontend product for payments

## Preparing your Micro-frontend to be consumed by other projects:
Check your `webpack.js` file to see if you have the following configuration:

```js
    new ModuleFederationPlugin({
      name: "{YOUR_MFE_NAME}", // Your remote MFE name to be used by the host.
      filename: "remoteEntry.js", // The entrypoint for the remote MFE.
      // List of routes exposed to the host.
      // We are exposing both the public and private routes.
      exposes: {
        "./listOfPublicRoutes": "./src/router/PublicRoutes/PublicRouteList.tsx",
        "./listOfPrivateRoutes":
          "./src/router/PrivateRoutes/PrivateRouteList.tsx"
      },
      // List of package modules to share with the remote MFE. 
      // Avoid duplication packages being imported and used.
      shared: [
        {
          ...deps,
          react: { requiredVersion: deps.react, singleton: true },
          "react-dom": {
            requiredVersion: deps["react-dom"],
            singleton: true
          },
          "react-router-dom": {
            requiredVersion: deps["react-router-dom"],
            singleton: true
          },
          "@auth0/auth0-react": {
            singleton: true,
            strictVersion: true
          }
        }
      ]
```
