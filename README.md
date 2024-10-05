# My API Dashboard

## Explanation


https://github.com/user-attachments/assets/37290f01-666d-4519-a96f-f6e21d0e46d1


### Optimized Version

## `dashboard.tsx`

The `dashboard.tsx` file is the main component of the application, providing an interface for selecting and executing API requests, viewing results, and managing API configurations. It has been optimized for performance and readability.

### Key Functionalities:

-   **State Management**: Uses React’s `useState` and `useCallback` hooks efficiently to manage state related to API keys, results, loading, and error messages.
-   **API Selection**: Allows users to select from a predefined list of APIs or input custom URLs, supporting both GET and POST methods with a body input for POST requests.
-   **Theme Toggle**: Implements a light/dark theme toggle using context (`useTheme`) to dynamically change styles.
-   **Optimized API Execution**: Executes multiple API requests efficiently with improved error handling and better sequential execution.
-   **Result Display**: Uses `react18-json-view` for JSON formatting and renders the results based on the current theme, with optimized handling for large datasets.

#### Optimizations:

-   **Use of `useCallback`**: Functions like `addNewKey`, `handleInputChange`, and `executeWorkflow` are wrapped in `useCallback` to avoid unnecessary re-renders and ensure optimal performance during frequent state updates.
-   **Improved Error Handling**: Errors are caught and displayed gracefully, providing meaningful feedback to the user.
-   **Memoized Theme Styling**: Results are rendered based on the current theme (light/dark), and these are efficiently updated using dynamic JSON view styles to avoid unnecessary re-renders.

## `fetchData.ts`

The `fetchData.ts` module is responsible for handling API requests. It has been optimized for better error handling, cleaner request options, and better performance in error scenarios.

### Key Functionalities:

-   **API Requests**: Uses the Fetch API for making both GET and POST requests. The request method and body are dynamically handled based on the input.
-   **Enhanced Error Handling**: Captures and handles a variety of error states including HTTP response errors and network failures. Falls back to a simple status message if the response isn't in JSON format.
-   **Optimized Request Options**: Dynamically configures request headers and body based on the method and input, ensuring clean and flexible request handling.

#### Optimizations:

-   **Error Handling**: Enhanced with fallback logic in case of non-JSON responses and better handling of edge cases such as network errors or malformed requests.
-   **Fetch Logic**: The fetch logic is cleaner and more readable, using async/await along with structured error handling to provide better feedback on failures.

---

# Assumptions and Decisions

## `dashboard.tsx`

-   **Default API Keys**: The application includes a list of free API URLs that users can select from, assuming they are valid and accessible.
-   **Error Handling**: Assumes that the API responses provide meaningful error messages. If not, fallback messages are used.
-   **Custom URL Handling**: Assumes users input valid URLs when choosing to use custom URLs for API requests.

## `fetchData.ts`

-   **Fetch API**: Handles both GET and POST requests while dynamically setting request options. The implementation assumes APIs respond with JSON.
-   **Error Handling**: Provides fallback error messages for scenarios where APIs return non-JSON responses or are unreachable.

---

# Completed Features (Optimized)

-   **API Key Management**: Users can add, remove, and update API keys for predefined or custom URLs.
-   **Sequential API Execution**: Multiple API requests are executed in sequence with proper error handling, displaying results in real-time.
-   **GET and POST Methods**: Supports both GET and POST methods, allowing for POST request bodies.
-   **Custom API URLs**: Users can input custom API URLs for testing or experimentation.
-   **Theme Toggle**: Users can toggle between light and dark themes, with the results styled according to the selected theme.
-   **Optimized Error Handling**: Error messages are more informative and handle a wide range of error cases.
-   **Performance Optimizations**: Improved component rendering performance by using `useCallback` to optimize event handlers and API request workflows.

---

# Known Issues (Optimized)

-   **Sequential Execution**: API requests are still executed sequentially, which can slow down performance when handling a large number of APIs. Future optimizations could involve parallel execution.
-   **Error Handling for Non-JSON Responses**: Some APIs return non-JSON responses, which may result in errors not being properly displayed. A more robust error-handling approach could be implemented.
-   **API Compatibility**: Some APIs may work with specific HTTP clients (e.g., Axios) rather than the Fetch API. For such APIs, Axios could be considered as an alternative for handling these cases.
