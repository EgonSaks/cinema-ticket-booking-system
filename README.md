# Cinema Ticket Booking System

![cinema](/cinema.gif)

Cinema Ticket Booking System is a web application built with React and Java Spring Boot 3.2, allowing users to browse, search, and book movie tickets seamlessly.

## Table of Contents

- [Cinema Ticket Booking System](#cinema-ticket-booking-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
  - [Steps to Setup the Spring Boot Backend app](#steps-to-setup-the-spring-boot-backend-app)
  - [Steps to Setup the React Frontend app](#steps-to-setup-the-react-frontend-app)

## Features

- **User registration**: For personalization and access to exclusive deals.
- **Movie Selection**: Browse through a wide selection of available movies.
- **Movie Search**: Easily find movies by name using the search feature.
- **Genre Filtering**: Filter movies based on genres for a more tailored browsing experience.
- **Movie Sessions**: Choose the best time for you to watch a movie.
- **Seat recommendation**: Recommended for optimal sound quality and viewing experience.  
- **Seat Selection**: Choose your desired seats for the selected movie.
- **Booking Management**: Efficiently book seats and store booking information in the database.
- **Dynamic Seat Updates**: Real-time updates of seat availability based on new bookings and movie sessions.
- **Movie recommendations**: Movie recommendations for registered users based on their past viewing history and preferences.

## Technologies

- Spring Boot 3.2
- Maven

## Getting Started

To get started with this project, you will need to have the following installed on your local machine:

- JDK 21+
- Maven 3+
- MySQL 8+

## Steps to Setup the Spring Boot Backend app

1. **Clone the application**

```zsh
git clone https://github.com/EgonSaks/cinema-ticket-booking-system.git
cd backend
```
2. **Installing and Starting MySQL**

There are different ways to install MySQL. The following covers the easiest methods for [installing and starting MySQL on different platforms](https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing).

3. **Create MySQL database**

Open a terminal (command prompt in Microsoft Windows) and open a MySQL client as a user who can create new users.

For example, on a Mac, use the following command;

```zsh
mysql -u root -p
```

```zsh
mysql> CREATE DATABASE cinema;
mysql> CREATE USER 'springuser'@'%' IDENTIFIED BY 'ThePassword';
mysql> GRANT ALL PRIVILEGES ON cinema.* TO 'springuser'@'%';
mysql> FLUSH PRIVILEGES;
```

[More info how to do it here](https://spring.io/guides/gs/accessing-data-mysql)

4. **Change MySQL username and password as per your MySQL installation**

	+ open `src/main/resources/application.properties` file.

	+ change `spring.datasource.username` and `spring.datasource.password` properties as per your mysql installation

5. **Run the app**

	You can run the spring boot app by typing the following command

	```zsh
	mvn spring-boot:run
	```

	The backend application will be available at http://localhost:8080.

## Steps to Setup the React Frontend app

1. **Get API Key and API Read Access Token for accessing movies data**

     + [API KEY](https://www.themoviedb.org/settings/api)

2. **Add API KEY and API Read Access Token to .env**

    + open `frontend/.env`
    + add `REACT_APP_API_KEY=YOUR_API_KEY` and `REACT_APP_ACCESS_TOKEN=YOUR_ACCESS_TOKEN` properties as per your data from [themovies.org](https://www.themoviedb.org/settings/api)

3. **Run the app**
```zsh
cd frontend
npm install
npm start
```

The frontend application will be available at http://localhost:3000.
