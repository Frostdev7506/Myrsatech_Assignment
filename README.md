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
