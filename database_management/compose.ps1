podman run --name frontdesk_database `
    -e POSTGRES_USER=postgres -e POSTGRES_DB=frontdesk_db -e POSTGRES_PASSWORD=shiloh_Server2024 -e POSTGRES_HOST_AUTH_METHOD=trust `
    -p 546:5432 `
    postgres:16 
    # -v=./db-data:/var/lib/postgresql