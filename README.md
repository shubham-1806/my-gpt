# my-gpt
Frontend for my-gpt

Development instructions

Clone the repository to your local

1. Install dependencies

   ```
   yarn install
   ```

2. Create the config file by copying the contents of the example, from the root directory run

   ```
   cp src/Config/config.example.ts ./src/Config/config.ts
   ```

3. Start the vite development server in Dev mode

   ```
   yarn dev
   ```
4. Add githooks 

   ```
   yarn husky install
   ```

App can be built using `yarn build` and found in release/{version} folder