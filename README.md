# Customer Management Application

This is a full-stack application built with .NET 6 and Angular 13. The application provides a user interface for managing customer data.

## Features

- **Backend:** The backend is a .NET 6 (Asp.Net Core Web App)application that provides a RESTful API. It includes a `CustomerController` for handling HTTP requests related to customers.

- **Frontend:** The frontend is an Angular 13 application. It includes two components: `CustomerComponent` and `CustomerFormComponent`. The `CustomerComponent` displays a list of customers, and the `CustomerFormComponent` provides a form for adding and updating customer data.

- **Service:** The Angular application includes a service that communicates with the `CustomerController` to retrieve and update customer data.

- **UI/UX:** The application uses Bootstrap as the CSS framework, FontAwesome for icons, Angular animations for transitions and Toastr for displaying toast messages.

## Setup

**Prerequisites:**

- .NET 6
- Node.js and npm
- Angular CLI

**Backend:**

To run the backend, navigate to the backend directory and run:

```bash
dotnet build
dotnet run
