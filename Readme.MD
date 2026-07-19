# WanderLust 🏡

An Airbnb-inspired full-stack listing platform where users can browse, create, edit, and review property listings — complete with image uploads, interactive maps, and secure authentication.

**🔗 Live Demo:** [wanderlust-lojk.onrender.com](https://wanderlust-lojk.onrender.com)

> Note: This app is hosted on Render's free tier, so it may take 30–50 seconds to load on the first visit if it's been idle.

---

## Features

- **User Authentication** — Secure signup/login/logout using Passport.js (local strategy), with hashed credentials via `passport-local-mongoose`
- **Listing Management** — Full CRUD: create, view, edit, and delete property listings
- **Image Uploads** — Listing photos uploaded and stored via Cloudinary, handled through Multer
- **Interactive Maps** — Mapbox integration to visualize listing locations by geocoordinates
- **Reviews** — Authenticated users can add and delete reviews on listings
- **Access Control** — Ownership checks ensure only the listing/review author can edit or delete their own content
- **Flash Messages** — User feedback for actions like login, signup, and listing updates
- **Persistent Sessions** — Sessions stored in MongoDB via `connect-mongo`, so logins survive server restarts
- **Input Validation** — Server-side validation using Joi schemas
- **Custom Error Handling** — Centralized error middleware with a dedicated error page

---

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB (via MongoDB Atlas) + Mongoose

**Frontend**
- EJS templating with EJS-Mate for layout support
- CSS

**Authentication & Sessions**
- Passport.js (Local Strategy)
- express-session + connect-mongo

**File Storage & Maps**
- Cloudinary (image hosting)
- Multer + multer-storage-cloudinary
- Mapbox SDK (geolocation & maps)

**Validation**
- Joi

**Deployment**
- Hosted on [Render](https://render.com)
- Database hosted on [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Project Structure

```
wanderlust/
├── controllers/       # Route logic (listings, reviews, users)
├── Models/             # Mongoose schemas (Listing, Review, User)
├── routes/             # Express route definitions
├── views/               # EJS templates
├── public/             # Static assets (CSS, JS)
├── utils/               # Error handling & async wrapper utilities
├── init/                 # Database seed script and sample data
├── middleware.js    # Auth & validation middleware
├── schema.js         # Joi validation schemas
├── cloudeConfig.js  # Cloudinary/Multer storage config
└── app.js               # App entry point
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB Atlas account (or local MongoDB instance)
- A Cloudinary account
- A Mapbox account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/amitkorgavkar/wanderlust.git
   cd wanderlust
   ```

2. Install dependencies
   ```bash
   npm install --legacy-peer-deps
   ```
   > `--legacy-peer-deps` is required due to a peer dependency mismatch between `cloudinary@2.x` and `multer-storage-cloudinary`.

3. Create a `.env` file in the project root with the following variables:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SESSION_SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   ```

4. Start the server
   ```bash
   node app.js
   ```
   The app will run on `http://localhost:8080`

---

## Known Setup Notes

- If you hit a `querySrv ECONNREFUSED` error connecting to Atlas, it's usually a DNS resolution issue on your network — try setting a public DNS (e.g. `8.8.8.8`) at the OS level, or add `dns.setServers(['8.8.8.8','8.8.4.4'])` at the top of `app.js`.
- Make sure your current IP is whitelisted under **Network Access** in MongoDB Atlas (or allow access from anywhere for local development).

---

## Roadmap / Future Improvements

- [ ] Add automated tests (Jest/Mocha) and CI pipeline
- [ ] Add search and filter functionality for listings
- [ ] Add pagination for listings index page
- [ ] Add wishlist/favorites feature
- [ ] Improve mobile responsiveness

---

## Author

**Amit Korgavkar**
[GitHub](https://github.com/amitkorgavkar)

---

## License

ISC