
## **Routes**

### **Public Routes**
#### **Authentication**
- **`POST /api/v1/login`**
  - **Description**: Authenticates a user and generates a JWT, to be stored
  in a cookie with the key being "Authorization".
  - **Controller**: `AuthController.login`
  - **Request Body**: JSON with credentials (e.g., email, password).
    ```json
    {
      "email": "john.doe@example.com",
      "password": "secertpassword"
    }
    ```
  - **Response**:
    - Success: status 204 No Content, "Authorization" header with a JWT.
    - Failure: status 401 Unauthorized.
    ```json
    {
      "error": "invalid credentials"
    }
    ```

- **`POST /api/v1/register`**
  - **Description**: Creates a new user.
  - **Handler**: `UserController.createuser`.
  - **Request Body**:
    ```json
    {
      "name": "John",
      "email": "john.doe@example.com",
      "password": "secertpassword",
      "profession": "Engineer",
      "companyId"?: "ce42b90f-1045-4dbc-8690-967079da4bb0"
    }
    ```
  - **Response**:
    - Success: 201 Created.
    ```json
    {
      "id": "673d37d2a0d5e53e1ceb4df7",
      "name": "John",
      "email": "john.doe@example.com",
      "profession": "Engineer",
      "companyId": "ce42b90f-1045-4dbc-8690-967079da4bb0"
    }
    ```
    - Failure: 400 Bad Request. (Each field is optional)
    ```json
    {
      "error": [
        {
          "name": "name length should be at least %d characters",
          "email": "email %s is invalid",
          "profession": "profession length should be at least %d characters",
          "password": "password length should be at least %d characters",
          "companyId": "companyId is invalid"
        }
      ]
    }
    ```
    - Failure: 422 Unprocessable Entity. (Email in use)
    ```json
    {
      "error": [
        "entity already exists"
      ]
    }
    ```

---

### **Authenticated Routes (`/api/v1`)**

#### **User Routes**
- **`GET /api/v1/users`**
  - **Description**: Fetches all users.
  - **Handler**: `UserController.getUsers`.
  - **Response**:
    - Success: 200 Ok.
    ```json
    {
      [
        {
          "id": "673d37d2a0d5e53e1ceb4df7",
          "name": "John",
          "email": "john.doe@example.com",
          "profession": "Engineer",
          "companyId": "ce42b90f-1045-4dbc-8690-967079da4bb0"
        },
        {
          "id": "673d37d2a0d5e53e1ceb4dd8",
          "name": "Thomas",
          "email": "thomas@example.com",
          "profession": "Manager",
          "companyId": "ce42b90f-1045-4dbc-8690-967079da4bb0"
        }
      ]
    }
    ```
- ** `GET /api/v1/users/:id`**
  - **Description**: Fetches a user by ID.
  - **Handler**: `UserController.getUser`.
  - **Response**:
    - Success: 200 Ok.
    ```json
    {
      "id": "673d37d2a0d5e53e1ceb4df7",
      "name": "John",
      "email": "john.doe@example.com",
      "profession": "Engineer",
      "companyId": "ce42b90f-1045-4dbc-8690-967079da4bb0"
    }
    ```
    - Failure: 404 Not Found.
    ```json
    {
      "error": [
        "entity not found"
      ]
    }
    ```
    - Failure: 400 Bad Request.
    ```json
    {
      "error": [
        "id is invalid"
      ]
    }
    ```
- **`PUT /api/v1/users/:id`**
  - **Description**: Updates a user by ID.
  - **Handler**: `UserController.updateUser`.
  - **Request Body**: each field is optional.
    ```json
    {
      "name": "John",
      "email": "john.doe@example.com",
      "password": "secertpassword",
      "profession": "Engineer",
      "companyId": "ce42b90f-1045-4dbc-8690-967079da4bb0"
    }
    ```
