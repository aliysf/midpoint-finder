# 📍 MidPoint — Find the Middle Ground

**MidPoint** is a real-time web application that helps groups of friends find the geographic midpoint between their locations. Perfect for picking a fair meeting spot for lunch, weekend trips, or any group meetup.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)
![Prisma](https://img.shields.io/badge/Prisma-SQLite-2D3748?logo=prisma)

---

## 🎯 Features

- **No Login Required** — Create sessions and share links instantly, no accounts needed.
- **Shareable Links** — One unique link per session. Share via copy, SMS, or native share.
- **Real-time Updates** — The map and midpoint update every 3 seconds as participants join.
- **Interactive Map** — Leaflet-powered map with markers for each participant and the midpoint.
- **Google Maps Integration** — Open the calculated midpoint directly in Google Maps.
- **Midpoint Algorithm** — Uses the cartesian center-of-gravity method for accurate geographic midpoint calculation (handles edge cases near the date line and poles).
- **Responsive Design** — Beautiful UI built with shadcn/ui, works great on mobile and desktop.
- **SQLite Database** — Zero-config, file-based database via Prisma. No external DB required.

---

## 🚀 How It Works

1. **Create a Session** — Click "Create Session", name it, and get a unique link.
2. **Share the Link** — Send the link to your friends (via text, email, or any messenger).
3. **Join & Share Location** — Each friend opens the link, enters their name, and allows location access.
4. **See the Midpoint** — The map instantly shows everyone's location and the geographic midpoint (red marker).

---

## 🛠️ Tech Stack

| Layer       | Technology                                                       |
| ----------- | ---------------------------------------------------------------- |
| Framework   | [Next.js 15](https://nextjs.org/) (App Router)                  |
| Language    | [TypeScript](https://www.typescriptlang.org/)                    |
| UI          | [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS v4](https://tailwindcss.com/) |
| Maps        | [Leaflet](https://leafletjs.com/) via [react-leaflet](https://react-leaflet.js.org/) |
| Database    | [SQLite](https://www.sqlite.org/) via [Prisma ORM](https://www.prisma.io/) |
| Icons       | [Lucide React](https://lucide.dev/)                              |
| ID Gen      | [nanoid](https://github.com/ai/nanoid)                           |

---

## 📂 Project Structure

```
midpoint-finder/
├── prisma/
│   ├── schema.prisma        # Database schema (Session, Participant)
│   └── migrations/           # Auto-generated migration files
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with header, footer, Toaster
│   │   ├── page.tsx          # Home / landing page
│   │   ├── globals.css       # Tailwind + shadcn theme
│   │   ├── s/
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Dynamic session page
│   │   └── api/
│   │       └── sessions/
│   │           ├── route.ts              # POST: Create session
│   │           └── [slug]/
│   │               ├── route.ts          # GET: Fetch session + midpoint
│   │               └── join/
│   │                   └── route.ts      # POST: Join session
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (auto-generated)
│   │   ├── header.tsx         # Site navigation header
│   │   ├── create-session-dialog.tsx  # Dialog to create new session
│   │   ├── session-view.tsx   # Main session page component
│   │   ├── map-view.tsx       # Leaflet map with markers
│   │   ├── join-session.tsx   # Form to join a session
│   │   ├── share-link.tsx     # Copy/share link component
│   │   ├── participant-list.tsx  # List of joined participants
│   │   └── midpoint-display.tsx  # Midpoint coordinates display
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── geo.ts             # Midpoint & distance calculations
│   │   └── utils.ts           # shadcn utility (cn)
│   └── generated/
│       └── prisma/            # Generated Prisma client
├── package.json
├── tsconfig.json
├── components.json            # shadcn/ui config
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** 20+ installed
- **npm** 8+ installed

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd midpoint-finder

# 2. Install dependencies
npm install

# 3. Set up the database
npx prisma migrate dev --name init

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:3000**.

### Environment Variables

The project uses a `.env` file for configuration. The default SQLite setup works out of the box:

```env
DATABASE_URL="file:./dev.db"
```

---

## 📡 API Reference

### `POST /api/sessions`

Create a new session.

**Request Body:**
```json
{
  "name": "Weekend Meetup",
  "creatorName": "Alice"
}
```

**Response (201):**
```json
{
  "session": {
    "id": "clx...",
    "slug": "a1b2c3d4",
    "name": "Weekend Meetup",
    "creatorName": "Alice",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### `GET /api/sessions/[slug]`

Get session data with participants and midpoint.

**Response (200):**
```json
{
  "session": {
    "id": "clx...",
    "slug": "a1b2c3d4",
    "name": "Weekend Meetup",
    "creatorName": "Alice",
    "participants": [
      { "id": "...", "name": "Bob", "latitude": 40.7128, "longitude": -74.006 }
    ]
  },
  "midpoint": {
    "latitude": 40.7128,
    "longitude": -74.006
  }
}
```

### `POST /api/sessions/[slug]/join`

Join a session with your location.

**Request Body:**
```json
{
  "name": "Bob",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

**Response (201):**
```json
{
  "participant": { "id": "...", "name": "Bob", ... },
  "midpoint": { "latitude": 40.7128, "longitude": -74.006 }
}
```

---

## 🧮 Midpoint Algorithm

The app uses the **Cartesian center-of-gravity method** to calculate the geographic midpoint:

1. Convert each (lat, lng) to 3D cartesian coordinates (x, y, z)
2. Compute the arithmetic mean of all x, y, z values
3. Convert the averaged cartesian point back to (lat, lng)

This method is more accurate than simply averaging latitudes and longitudes, especially when points are spread across large distances, near the poles, or across the international date line.

See `src/lib/geo.ts` for the implementation.

---

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Reset database
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

---

## 📄 License

MIT — feel free to use this project for anything!
