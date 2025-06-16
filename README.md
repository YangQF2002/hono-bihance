# Bihance File Server
## Hono Server, Deployed on CloudFlare

### Set Up 🤩
1. Clone this repo 
2. Go into the project directory 
   ```
   cd hono
   ```
3. Install dependencies 
   ``` 
   npm install
   ```
4. Create `.env` file 
   ```
   # Refer to project's notion page!!

   # For deleteFiles to work locally 
   # Need to read from local .env: 
     # npm install dotenv, then wrangler.jsonc put "compatability flags"
     # import dotenv/config

   UPLOADTHING_TOKEN=
   ```

5. Create `.dev.vars` file 
   ```
   # Refer to project's notion page!!

   # ENV variables for local development
   # UPLOADTHING_MODE should be development 
   # Simulate the callback to localhost (after processing request from our server)

   UPLOADTHING_TOKEN=
   UPLOADTHING_MODE=
   ```
6. Run the local server 
   ```
   # http://127.0.0.1:8000 OR 
   # http://localhost:8000 OR 
   # http://<public-ip>:8000

   npm run dev --ip 0.0.0.0
   ```
7. Alternatively, use the deployed server 
   ```
   # git push to master will automatically re-deploy

   https://hono.yangqf18.workers.dev/api/uploadthing
   ```