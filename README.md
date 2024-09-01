# ProjectPulse Application

ProjectPulse is a dynamic project management application designed to help users organize and track their work
efficiently.
The application supports user authorization with profile creation, project management, and detailed task tracking, all
wrapped up in an intuitive interface with both dark and light themes.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Custom Library](#custom-library)
- [Acknowledgements](#acknowledgements)

## Project Overview

ProjectPulse is built to streamline project management by allowing users to create projects, add task lists, and manage
tasks within those lists. The application also includes a dashboard with statistical charts, providing insights into
project and user statistics.

## Features

- **User Authorization & Profile Management**: Secure user login and profile creation.
- **Project & Task Management**: Create projects, add task lists, and manage multiple tasks within each task list.
- **Dashboard with Statistical Charts**: Visualize project progress with interactive charts.
- **Theme Customization**: Switch between dark and light themes based on user preference.

## Technology Stack

ProjectPulse leverages the following technologies:

- **React**: For building the user interface.
- **Routing**: To navigate between different views in the application.
- **TypeScript**: For type-safe coding and enhanced developer experience.
- **Redux**: For state management across the application.
- **ECharts**: For creating dynamic and interactive statistical charts.
- **Axios**: For handling HTTP requests to the backend.

## Getting Started

To get started with ProjectPulse, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/taskmaster.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd projectpulse
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## Usage

Once logged in / registered, users can:

- **Create and Manage Projects**: Start by creating a new project. Add task lists to each project and populate them with
  tasks.
- **Monitor Statistic**: Use the dashboard to view statistical charts that show statistic across projects and users.
- **Switch Themes**: Choose between dark and light themes to customize the application’s appearance.

## Custom Library

This project utilizes a custom components and methods through
library, [Pulse Library](https://github.com/Qinastha/pulse_library.git), to enhance functionality and maintain
consistency across the application.

## Acknowledgements

- **ECharts**: for providing a powerful library to create the statistical charts used in the application.
