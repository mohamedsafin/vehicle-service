# Get Quote Backend Setup

This project now includes a React quote form and a Node.js/Express/MongoDB backend.

## 1. MongoDB Atlas Setup

1. Sign in to MongoDB Atlas.
2. Create a new project, then create a free or dedicated cluster.
3. Open **Database Access** and create a database user with a username and password.
4. Open **Network Access** and add your IP address. For local testing only, you can temporarily allow `0.0.0.0/0`.
5. Open **Database**, click **Connect**, choose **Drivers**, and copy the connection string.
6. Replace the placeholder values in `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/transport_db?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

Mongoose will use the `transport_db` database from the connection string. The `quotes` collection is created automatically the first time a quote is saved.

## 2. Frontend Environment

Create a frontend `.env` file from `.env.example` if you want to configure the API URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

If `VITE_API_BASE_URL` is not set, the form uses `http://localhost:5000`.

## 3. Install Commands

From the project root:

```bash
npm install
npm install axios
```

From the backend folder:

```bash
cd backend
npm install
```

These dependencies are already reflected in the project package files.

## 4. Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
npm run dev
```

Open the Vite URL, usually `http://localhost:5173`, and submit the quote form in the **Get Quote** section.

## 5. API

`POST http://localhost:5000/api/quotes`

Request body:

```json
{
  "name": "Alex Carter",
  "phone": "+1 800 555 0199",
  "email": "alex@example.com",
  "pickupLocation": "New York Warehouse",
  "dropLocation": "Boston Distribution Center",
  "vehicleType": "Container Truck",
  "message": "Pickup tomorrow morning. Cargo weight is 2 tons."
}
```

Success response:

```json
{
  "success": true,
  "message": "Quote submitted successfully"
}
```

The backend also returns the saved quote id, status, and creation time in `data`.
