# Donut PCs

Donut PCs is a website application that uses React and Django

## Setup

### Server Installation

1. Install `virtualenv` on your system.

   **Unix/macOS**

   ```sh
   python3 -m pip install --user virtualenv
   ```

   **Windows**

   ```sh
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

   ```sh
   pip install -r requirements.txt
   ```

5. Set up and migrate the database.

   **Unix/macOS**

   ```sh
   python ./server/manage.py makemigrations
   python ./server/manage.py migrate
   ```

   **Windows**

   ```sh
   python .\server\manage.py makemigrations
   python .\server\manage.py migrate
   ```

## How to Run

### Server

1. Change to the server directory.

   ```txt
   cd server
   ```

2. Run the following command to run the server.

   ```sh
   python manage.py runserver
   ```
