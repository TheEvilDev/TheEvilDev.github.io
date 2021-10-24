const CracoAlias = require("craco-alias");

module.exports = {
   webpack: {
      configure: {
         module: {
            rules: [
               {
                  test: /\.mdx?$/,
                  use: [
                     {
                        loader: 'babel-loader',
                        options: {
                           presets: ["@babel/env", "@babel/react"]
                        }
                     },
                     {
                        loader: '@mdx-js/loader'
                     }
                  ]
               }
            ]
         }
      }
   },
   plugins: [
     {
        plugin: CracoAlias,
        options: {
           source: "tsconfig",
           // baseUrl SHOULD be specified
           // plugin does not take it from tsconfig
           baseUrl: "./src",
           /* tsConfigPath should point to the file where "baseUrl" and "paths" 
           are specified*/
           tsConfigPath: "./tsconfig.paths.json"
        }
     }
  ]
};