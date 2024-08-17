# Fullstack Product Search and Filter Website - Backend

## Project Overview

This project is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to provide users with a seamless experience in searching, filtering, and sorting products. The backend is responsible for managing the database, handling API requests, and implementing key functionalities such as pagination, searching, categorization, and sorting.

## Features

1. **Setup and Basic Structure:**
   - Set up a MERN stack project.
   - Created and structured relevant APIs to fetch product data from the MongoDB database.
   - Inserted 40+ dummy product data entries into the database.

2. **Pagination:**
   - Implemented pagination to efficiently load products.
   - Backend APIs support pagination parameters for easy navigation.

3. **Searching:**
   - Implemented a search feature that allows users to search products by name.

4. **Categorization:**
   - Categorized products by brand, category, and price range.
   - Users can apply single or multiple filters simultaneously.

5. **Sorting:**
   - Added sorting functionality to allow users to sort products by:
     - Price (Low to High, High to Low)
     - Date Added (Newest First)


## Technologies Used

- **Node.js**: JavaScript runtime environment for executing server-side code.
- **Express.js**: Web application framework for building APIs.
- **MongoDB**: NoSQL database used to store product information.

## API Endpoints

- **GET /api/products**: Retrieve a list of products with optional filtering, pagination, and sorting.
  - Query Parameters:
    - `page`: Page number for pagination.
    - `limit`: Number of products per page.
    - `search`: Search term for product name.
    - `brand`: Filter by brand.
    - `category`: Filter by category.
    - `priceRange`: Filter by price range.
    - `sort`: Sort by price (asc/desc) or date (newest).



## Environment Variables:
 - Create a .env file in the root directory.
 - Add the following environment variables
 ```bash
   DB_USER= // database user name
   DB_PASS // db password
   
## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AmirHossain58/phone-world-server.git
   cd phone-world-server
   npm install
   npm run dev
