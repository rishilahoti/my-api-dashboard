# My API Dashboard

## Brief Explanation

### dashboard.tsx

The `dashboard.tsx` file is the main component of the application. It provides a user interface to select and call APIs, view results, and manage API settings.

#### Key functionalities:

- **State Management:** Uses React `useState` hook to manage the state of API keys, results, loading, and error states.
- **API Selection:** Allows users to select from a list of predefined free APIs or input custom URLs.
- **Method Selection:** Supports GET and POST methods, with an input for request bodies for POST requests.
- **Theme Toggle:** Integrates with a theme context to allow users to toggle between light and dark themes.
- **API Execution:** Executes the selected APIs in sequence and displays the results using `ReactJson`.

### fetchData.ts

The `fetchData.ts` module abstracts the logic for making API requests.

#### Key functionalities:

- **Fetch Requests:** Uses the Fetch API to perform GET or POST requests.
- **Error Handling:** Provides detailed error messages based on the response.
- **Request Options:** Configures request headers and bodies appropriately based on the method.

## Assumptions and Decisions

### dashboard.tsx

- **Default API Keys:** Assumes the availability of a list of free APIs for selection.
- **Error Handling:** Assumes the error messages returned by the APIs are meaningful and user-friendly.
- **Custom URL Handling:** Assumes users can input any valid URL for custom API requests.

### fetchData.ts

- **Fetch API:** Decided to use the Fetch API over Axios for simplicity and native browser support.
- **Error Parsing:** Assumes that the response body is in JSON format when an error occurs.

## Completed Features

- **API Key Management:** Add, remove, and update API keys.
- **API Execution:** Execute multiple API requests in sequence and display results.
- **Method Support:** Support for both GET and POST methods.
- **Custom URLs:** Input and manage custom API URLs.
- **Theme Toggle:** Toggle between light and dark themes.
- **Error Handling:** Display detailed error messages when API requests fail.

## Known Issues

- **Sequential Execution:** API requests are executed sequentially, which may not be efficient for a large number of requests.
- **Error Handling:** Some APIs may return non-JSON error responses, which are not handled gracefully.
- **Limited Methods:** Currently, only GET and POST methods are supported. Other HTTP methods (PUT, DELETE, etc.) are not implemented.

Feel free to reach out if you need further assistance or additional features.