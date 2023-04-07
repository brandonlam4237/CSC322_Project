# Donut PCs

Donut PCs is a website application that uses React and Django

## Table of Contents

1. [Setup](#setup)

   - [Server Setup](#server-setup)
   - [Database Setup](#database-setup)
   - [Environment Variables Setup](#environment-variables-setup)

2. [How To Run](#how-to-run)

   - [Running the Server](#running-the-server)

## Setup

### Server Setup

1. Install `virtualenv` on your system.

   **Unix/macOS**

   ```txt
   python3 -m pip install --user virtualenv
   ```

   **Windows**

   ```txt
   py -m pip install --user virtualenv
   ```

2. Create the virtual environment

   ```txt
   virutalenv env
   ```

3. Run the virtual environment in your system.

   **Unix/macOS**

   ```txt
   source env/bin/activate
   ```

   **Windows**

   ```txt
   .\env\Scripts\activate
   ```

4. Install the packages in `requirements.txt`.

   ```txt
   pip install -r requirements.txt
   ```

5. Change to the server directory.

   ```txt
   cd server
   ```

6. Set up and migrate the database.

   ```txt
   python manage.py makemigrations
   python manage.py migrate
   ```

7. Create a superuser (Owner Account)

   ```txt
   python manage.py createsuperuser
   ```

### Database Setup

1. Create a database in PostgreSQL named `donut_pcs`

   ```txt
   CREATE DATABASE donut_pcs;
   ```

### Environment Variables Setup

1. Run secret_key.py to get Django secret key

   ```txt
   python server/scripts/secret_key.py
   ```

2. Open `server/.env` file.

3. Enter your PostgreSQL username, password, and Django secret_key in the env file.

   ```txt
   POSTGRES_USERNAME=<PostgreSQL Username>
   POSTGRES_PASSWORD=<PostgreSQL Password>
   SECRET_KEY=<SECRET_KEY>
   ```

## How to Run

### Running the Server

1. Change to the server directory.

   ```txt
   cd server
   ```

2. Run the following command to run the server.

   ```txt
   python manage.py runserver
   ```

## FAQ

- How would you flush the database?

  Go into the server directory and run the following command.

  ```txt
  python manage.py flush
  ```
