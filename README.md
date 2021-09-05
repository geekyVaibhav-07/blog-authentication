# blog-authentication
Auth service for project blog

Routes: 
    - path: /login
    - methods: 
        - post: authenticate a user

    - path: /auth
    - methods:
        -post: check if authenticated

env varriables that should be set in .env file: 
    DATABASE_HOST='mongodb+srv' URIs
    DATABASE_USER=database username
    DATABASE_PASSWORD=database pasword
    DATABASE=database
    PRODUCTION_PORT=8002
    DEVELOPMENT_PORT=8003
    SALT_ROUNDS=12
    JWT_PRIVATE_KEY=privateKey
    JWT_EXPIRES_IN=90d