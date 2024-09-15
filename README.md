## Application Architecture

The application follows a client-server architecture:

### Front-end (Angular & React)

- **Consumes the RESTful API** provided by the back-end.
- **Displays a list of the newest stories** with titles and links.
- **Provides a search feature** to filter stories.
- **Implements pagination** to display stories in manageable chunks.

### Back-end (Node.js with Express)

- **Exposes a RESTful API** to fetch Hacker News stories.
- **Caches the newest stories** to reduce API calls and improve performance.
- **Uses dependency injection** for modularity and testability.

## Front-end (Angular & React)

The front-end of this application is built using both Angular and React to consume the RESTful API provided by the back-end. It displays a list of the newest Hacker News stories with titles and links, provides a search feature to filter stories, and implements pagination to display stories in manageable chunks.

#### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)
- Angular CLI (for Angular project)
- Vite for React (for React project)

### Features

- **Consumes the RESTful API**: The front-end applications consume the RESTful API provided by the back-end to fetch and display Hacker News stories.

- **Displays a list of the newest stories**: Both Angular and React applications display a list of the newest Hacker News stories with titles and links.

- **Provides a search feature**: Users can search for stories by title to filter the displayed list.

- **Implements pagination**: Stories are displayed in manageable chunks with pagination controls.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Frostdev7506/Myrsatech_Assignment.git



    ```

2.  **Navigate to the project directory:**

    ```bash
    cd frontend




    ```

3.  **Install the dependencies for Angular & React:**

    ```bash
    cd angular-app
    npm install

    ```

    ```bash
    cd hacker-news-react
    npm install

    ```

4.  **Run Applications for Angular & React:**

    ```bash
    cd angular-app
    ng serve

    ```

    ```bash

    cd hacker-news-react
    npm run dev

    ```

# Back-end Hacker News API

This is a Node.js back-end application that exposes a RESTful API to fetch Hacker News stories. It caches the newest stories to reduce API calls and improve performance. The application uses dependency injection for modularity and testability.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

### API Endpoints

- **GET /stories**: Fetch the newest Hacker News stories.
- **GET /stories/search**: Search for Hacker News stories by title.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Frostdev7506/Myrsatech_Assignment.git



   ```

2. **Navigate to the Backend directory:**

```bash
  cd Myrsatech_Assignment/Backend



```

3. **Install dependencies:**

```bash
  npm install



```

4. **Run in localHost:**

```bash
  npm run dev



```

5. **Run Tests Using:**

```bash
  npm run test



```
