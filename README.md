# Chat-App-Socket.io
Realtime chatting application in MERN stack using Socket.io library

## Setup Instructions

1. Clone the repo
2. Navigate to the backend directory:
    ```bash
    cd backend
    npm install
    ```

3. Navigate to the frontend directory:
    ```bash
    cd frontend
    npm install
    ```

4. Add .env in both frontend and backend directory:
	  ```bash
	  #Sample file of .env in frontend
	  VITE_BASE_URL=http://localhost:4000
	  VITE_API_BASE_API_URL_V1=http://localhost:4000/api/v1/
	  ```
    ```bash
	  #Sample file of .env in backend
	  DB_URL=mongodb+srv://<username>:<password>@cluster-chatapp.9m53n.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=cluster-chatApp
	  BASE_URL=http://localhost:5173
	  PORT=4000
	  JWT_SECRET_KEY=mysecretkey
	  CLOUDINARY_CLOUD_NAME=fat8dstxh1
	  CLOUDINARY_API_KEY=947140975210569
	  CLOUDINARY_API_SECRET=On5Dk010qb_vAKPZ-cKAL6Sh9gh
	  NODE_ENV=development
	  ```
5. In sample of .env CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET are dummy values, create a account at https://cloudinary.com/ you will get those values there.
6. This application is not completed yet. Some minor features are yet to add.
7. How to run the application?
	```bash
	# Open a new terminal at project directory
	cd backend
 	npm run dev
 	```
	```bash
 	# Open a new terminal at project directory
	cd frontend
 	npm run dev
 	```
