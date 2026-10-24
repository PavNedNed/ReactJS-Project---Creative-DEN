# Creative DEN

Creative DEN is my ReactJS project for the SoftUni ReactJS Regular Exam 2026.

Creative DEN is a stripped-down graphics catalog: creators list graphics, and the community likes work that deserves a second look.
Inspired by big stock sites: one catalog, clear create/edit forms, login for sellers, and a like action for graphics you do not own.

## Live Demo

https://react-js-project-creative-den.vercel.app/

## GitHub Repository

https://github.com/PavNedNed/ReactJS-Project---Creative-DEN

## Technologies

- React
- JavaScript
- React Router
- Vite
- Supabase
- PostgreSQL
- CSS
- ESLint

## Project Structure

The project is separated into components, context, hooks, utils and CSS files.

```text
src/
├── components/
├── contexts/
├── hooks/
├── utils/
├── App.jsx
└── Main.jsx
```

The components contain the UI in JSX format.

Utils folder contains the forms error validations and some css.

Authentication state is shared through `UserContext`.

---

# Run the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/PavNedNed/ReactJS-Project---Creative-DEN.git
```

## 2. Open the project folder

```bash
cd ReactJS-Project---Creative-DEN
```

## 3. Install the dependencies

```bash
npm install
```

## 4. Configure the environment variables

I have sent the .env file to the SoftUni mentors team.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

## 5. Start the development server

```bash
npm run dev
```

## Other Commands

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# Functional Guide

## 1. Project Overview

**Application Name:** Creative DEN

**Application Category / Topic:** Catalog for graphics

### Main Purpose

Creative DEN is a small catalog for graphic designers, illustrators and web designers.

Visitors can browse graphics in 5 categories - vector, raster, logo, web, caricature.

Registered users can create their own listings and manage(edit and delete) them. They can also like listings of other users.

---

## 2. User Access & Permissions

### Guest

A guest user can access the public parts of the application.

Available pages include:

- Home
- Catalog
- Listing Details
- About
- Login
- Register

Public data shown:
- Home — the latest 3 graphics (preview image, title, category, author, likes, price)
- Catalog — all listings, with optional filter by category
- Listing Details — full listing info (category, author, title, description, price, likes count)
- About — static project information

Guests cannot:

- Create listings
- Edit listings
- Delete listings
- Like/ Unlike listings

### Authenticated User

A logged-in user has access to all public pages and also to the private functionality.

Authenticated users can:

- Create listings
- Edit their own listings
- Delete their own listings
- Like or Unlike others' listings

A user cannot edit or delete a listing created by another user.

---

## 3. Authentication & Session Handling

### Authentication Flow

Authentication is handled by Supabase Auth REST API.

When the application starts, `UserProvider` checks if there is an existing Supabase session.

If a session exists, the current user is stored in the authentication context.

Registration creates a new Supabase user using email and password(`'/signup' endpoint`).

Login uses Supabase email and password to authenticate(`'/grant_type=password' endpoint`).

Logout signs the current user out and clears the current session from the application state(`'/logout' endpoint`).


### Session Persistence

`UserContext` is used to share the current user and authentication state across the React application.

The LocalStorage keeps the information for the authentication until it is cleared by logging out.

#### EXTRA
The token expiration time is set to 24 hours and after that if a user visits the application and is still logged in locally but the session has expired - he is redirected to login page and the Local Storage is cleared.

---

## 4. Routing Structure

The application uses React Router for client-side routing.

The main routes are:

```text
/                              Home
/catalog                       Catalog
/about                         About
/graphics/:graphicId           Listing Details
/graphics/create               Create Listing
/graphics/:graphicId/edit      Edit Listing
/login                         Login
/register                      Register
/logout                        Logout
*                              Not Found
```

### Route Guards

`AuthGuard` is used for pages that require authentication.

```text
/graphics/create   
/graphics/:graphicId/edit 
/logout
```
A guest trying to open one of these routes is redirected to Login.

`GuestGuard` is used for:

```text
/login
/register
```

If logged-in user tries to open Login or Register, the user is navigated to Home page.

### Nested and Parameterized Routes

`AuthGuard` and `GuestGuard` hold nested routes.
`App` itself is responsible for the application's layout - holding `<Header>` and `Footer` and all the other routes between them.

Parameterized routes include:

```text
/graphics/:graphicId
/graphics/:graphicId/edit
```

The graphicId is taken from the URL with `useParams`.

---

## 5. List → Details Flow

### Catalog

The graphics Catalog loads listings data from Supabase.

Each article shows basic information and has a link to its details page.

Listings can also be sorted by one of five categories - vector, raster, logo, web, caricature.

### Details Page

When you select a listing, you are navigated to `/graphics/:graphicId` page with Link for the button and useNavigate hook.

The graphicId is read from the URL and is used to request the correct listing from Supabase.

The Listing Details page displays:

- Category
- Author email
- Title
- Description
- Price
- Number of likes

---

## 6. Data Source & Backend

The application uses Supabase as a backend.

Supabase provides:

- PostgreSQL database
- Authentication
- Row Level Security

The database tables used by the app are:

```text
graphics - public
likes - public
users - auth
```

The data persists even after the application is refreshed or reopened.

---

## 7. Data Operations (CRUD)

The main CRUD collection is `graphics`.

### Create

A logged-in user can create a listing from the Create page.

The form contains:

- Title
- Category
- ImageUrl
- Price
- Description

Each article is connected to its authenticated author through `user_id`.

### Read

Article data is retrieved from Supabase and displayed across different sections of the application.

Articles are displayed on:

- Home (Latest 3)
- Catalog (All or filtered by category dropdown)


### Update

The article owner can access the Edit page.

The form is pre-filled with the existing listing data.

The user can modify the text fields.

After a successful update, navigate to the graphic details page with fresh data.

### Delete

Only the listing owner can access the Delete action.

The application requests confirmation before deleting a listing.

The listing is deleted from Supabase.

Listing ownership is verified in the React application and enforced by Supabase Row Level Security (RLS).

After successful deletion, redirect to the catalog page.

### Other User Interactions

Likes are also stored in Supabase.

Logged-in users can like and unlike others' listings.

A user can have one like record per listing.

---

## 8. Forms & Validation

### Forms Used

The application contains the following forms:

- Register - Uncontrolled form
- Login - Uncontrolled form
- Create Listing - Controlled form
- Edit Listing - Controlled form

### Validation Rules

Some examples of validation are:

#### --- Register and Login forms:

**Email**
- Required
- Minimum 5 characters
- Must match a valid email format

**Password**
- Required
- Minimum 6 characters
- Confirm Password must match the password - for Register Page only

#### --- Create and Edit forms:

**title**

- Required
- Minimum 3 characters

**imageUrl**
- Required

**description**
- Required
- Minimum 10 characters

**category**
- Required

**price**
- NUMBER / at least 1

The forms use controlled and uncontrolled inputs and event handlers.

Validation and API errors are displayed to the user through `toast` notifications and form error fields, preventing application crashes.

---

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

The project uses React hooks including:

```text
useState
useEffect
useContext
useRef
useNavigate
useParams
```

A custom `useFetch` hook is used to handle API requests.

useEffect manages remote data loading and authentication lifecycle behavior.

When a component loads listing data, an `AbortController` is created to manage the request.

If the component unmounts, the ongoing request can be cancelled.

### Context API

`UserContext` stores shared auth details.

It provides:

- Current user
- Register
- Login
- Logout

It is consumed by Details, Create, Edit, the guards and other.

### Component Styling

The project uses external CSS files.

The styles are separated into files such as:

```text
index.css - reset
App.css
error-field.module.css
```

---

## 10. Typical User Flow

1. The user opens Creative DEN and browses the available listings.
2. The user selects a listing to view its details.
3. The user registers for an account or logs in.
4. After logging in, the user can create new listings.
5. The user can edit or delete their own listings.
6. The user can like listings created by other users.
7. The user logs out when finished.

---

## 11. Error & Edge Case Handling

The application handles different error and edge cases.

Examples include:

- Loading indicators while fetching data from Supabase
- Handling missing or unavailable listings
- Validation of registration form inputs
- Handling authentication errors during login
- Validation of listing form data
- Handling invalid listing UUIDs
- Preventing unauthorized attempts to edit or delete listings
- Handling failed or invalid Supabase API requests
- A 404 page is shown for unknown routes.

---
# Pre-filled data:
The application has registered two users for testing:

### user 1:
email: pavel@abv.bg
password: 123456

### user 2:
email: mitko@abv.bg
password: 123456

The have 5 listings in total with some likes between eachother.

# Deployment

The frontend is deployed with Vercel:

https://react-js-project-creative-den.vercel.app/

The backend is by Supabase.