# Commit Notes

### 2024 August 31st 18:45 PM GMT+03
```sh
1. Able to populate appointments in db 
2. Able to retrieve booked appointments in db
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'main/main'.
#
# Changes to be committed:
#	new file:   practice/create_calendar/calendar/calendar_main.go
#	modified:   practice/create_calendar/calendar_main.go
#	modified:   practice/create_calendar/go.mod
#	new file:   practice/create_calendar/go.sum
#	new file:   practice/create_calendar/lib/base/atomic_json.go
#	new file:   practice/create_calendar/lib/base/base.go
#	new file:   practice/create_calendar/lib/base/buffer_pool.go
#	new file:   practice/create_calendar/lib/base/init.go
#	new file:   practice/create_calendar/lib/base/ip_handling.go
#	new file:   practice/create_calendar/lib/base/mutexed_map.go
#	new file:   practice/create_calendar/lib/base/os_termination_signal.go
#	new file:   practice/create_calendar/lib/base/string_operations.go
#	new file:   practice/create_calendar/lib/base/utils.go
#	new file:   practice/create_calendar/lib/calendar/calendar_main.go
#	new file:   practice/create_calendar/lib/config/base.go
#	new file:   practice/create_calendar/lib/context/context.go
#	new file:   practice/create_calendar/lib/cors/cors_test.go
#	new file:   practice/create_calendar/lib/cors/hash_javascript.go
#	new file:   practice/create_calendar/lib/cors/hash_javascript_directory.go
#	new file:   practice/create_calendar/lib/cors/types.go
#	new file:   practice/create_calendar/lib/db_access/db_main.go
#	new file:   practice/create_calendar/lib/db_access/generated/common_queries.sql.go
#	new file:   practice/create_calendar/lib/db_access/generated/db.go
#	new file:   practice/create_calendar/lib/db_access/generated/models.go
#	new file:   practice/create_calendar/lib/db_access/init/common_queries.sql
#	new file:   practice/create_calendar/lib/db_access/sql/queries/common_queries.sql
#	new file:   practice/create_calendar/lib/db_access/sql/schema/patient_records.sql
#	new file:   practice/create_calendar/lib/file_handler/bytes_store.go
#	new file:   practice/create_calendar/lib/file_handler/file_basic.go
#	new file:   practice/create_calendar/lib/file_handler/file_hash.go
#	new file:   practice/create_calendar/lib/file_handler/lock_file.go
#	new file:   practice/create_calendar/lib/file_handler/read_csv.go
#	new file:   practice/create_calendar/lib/logging/log_item/v2/log_item_type.go
#	new file:   practice/create_calendar/lib/logging/logger_engine.go
#	new file:   practice/create_calendar/lib/logging/logger_type.go
#	new file:   practice/create_calendar/lib/logging/writer_type.go
#	new file:   practice/create_calendar/lib/tls_handler/cert_data.go
#	new file:   practice/create_calendar/lib/tls_handler/cert_handler_2.go
#	new file:   practice/create_calendar/sqlc.yaml
#	modified:   practice/read_csv/read_csv_main.go
#	modified:   v2/drizzle_handler/.tsbuildinfo
#	renamed:    v2/drizzle_handler/schema/0000_slow_salo.sql -> v2/drizzle_handler/schema/0000_misty_devos.sql
#	modified:   v2/drizzle_handler/src/schema/main_tables.ts
#	modified:   v2/drizzle_handler/src/schema/table_common.ts
#	modified:   v2/frontend/frontdesk/src/lib/components/main.tsx
#	modified:   v2/frontend/frontdesk/src/routes/queue/index.tsx
#	modified:   v2/src/lib/context/context.go
#	modified:   v2/src/lib/db_access/db_main.go
#	modified:   v2/src/lib/db_access/generated/common_queries.sql.go
#	modified:   v2/src/lib/db_access/generated/models.go
#	modified:   v2/src/lib/db_access/sql/queries/common_queries.sql
#	modified:   v2/src/lib/file_handler/bytes_store.go
#	modified:   v2/src/lib/file_handler/file_basic.go
#	modified:   v2/src/lib/file_handler/file_hash.go
#	modified:   v2/src/lib/file_handler/lock_file.go
#	modified:   v2/src/lib/file_handler/read_csv.go
#	deleted:    v2/src/lib/logging/log_item/error_type.go
#	modified:   v2/src/lib/tls_handler/cert_handler_2.go
#	modified:   v2/src/server/gin_server/main.go
#
```

### 2024 August 12th 21:21 PM GMT+03
```sh
1. Setting up v2 of simple cms
2. Basic goal: log entry and exit for each patient 
3. Vision: set up foundation for HMIS
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Changes to be committed:
#	new file:   .gitignore
#	new file:   CommitNotes.md
#	new file:   drizzle_handler/.tsbuildinfo
#	new file:   drizzle_handler/@types/drizzle.config.d.ts
#	new file:   drizzle_handler/@types/schema/main_tables.d.ts
#	new file:   drizzle_handler/@types/schema/table_common.d.ts
#	new file:   drizzle_handler/compose.ps1
#	new file:   drizzle_handler/rebuild_schem.cmd
#	new file:   drizzle_handler/schema/0000_sticky_solo.sql
#	new file:   drizzle_handler/src/drizzle.config.ts
#	new file:   drizzle_handler/src/schema/accounts.ts
#	new file:   drizzle_handler/src/schema/main_tables.ts
#	new file:   drizzle_handler/src/schema/table_common.ts
#	new file:   frontend/frontdesk/.gitignore
#	new file:   frontend/frontdesk/README.md
#	new file:   frontend/frontdesk/index.html
#	new file:   frontend/frontdesk/postcss.config.cjs
#	new file:   frontend/frontdesk/public/vite.svg
#	new file:   frontend/frontdesk/src/App.css
#	new file:   frontend/frontdesk/src/App.tsx
#	new file:   frontend/frontdesk/src/assets/react.svg
#	new file:   frontend/frontdesk/src/lib/components/main.tsx
#	new file:   frontend/frontdesk/src/main.tsx
#	new file:   frontend/frontdesk/src/routeTree.gen.ts
#	new file:   frontend/frontdesk/src/routes/__root.tsx
#	new file:   frontend/frontdesk/src/routes/about.lazy.tsx
#	new file:   frontend/frontdesk/src/routes/index.lazy.tsx
#	new file:   frontend/frontdesk/src/routes/queue/index.tsx
#	new file:   frontend/frontdesk/src/styles/globals.css
#	new file:   frontend/frontdesk/src/styles/index.css
#	new file:   frontend/frontdesk/src/styles/tailwind.css
#	new file:   frontend/frontdesk/src/vite-env.d.ts
#	new file:   frontend/frontdesk/tailwind.config.cjs
#	new file:   frontend/frontdesk/vite.config.ts
#	new file:   post_cmd.txt
#	new file:   postgres_error_codes.md
#	new file:   scripts/bash/dev_peer.cmd
#	new file:   scripts/bash/dev_server.cmd
#	new file:   src/go.mod
#	new file:   src/go.sum
#	new file:   src/lib/base/atomic_json.go
#	new file:   src/lib/base/base.go
#	new file:   src/lib/base/buffer_pool.go
#	new file:   src/lib/base/init.go
#	new file:   src/lib/base/ip_handling.go
#	new file:   src/lib/base/mutexed_map.go
#	new file:   src/lib/base/os_termination_signal.go
#	new file:   src/lib/base/string_operations.go
#	new file:   src/lib/base/utils.go
#	new file:   src/lib/config/base.go
#	new file:   src/lib/context/context.go
#	new file:   src/lib/cors/cors_test.go
#	new file:   src/lib/cors/hash_javascript.go
#	new file:   src/lib/cors/hash_javascript_directory.go
#	new file:   src/lib/cors/types.go
#	new file:   src/lib/db_access/db_main.go
#	new file:   src/lib/db_access/generated/common_queries.sql.go
#	new file:   src/lib/db_access/generated/db.go
#	new file:   src/lib/db_access/generated/models.go
#	new file:   src/lib/db_access/init/common_queries.sql
#	new file:   src/lib/db_access/sql/queries/common_queries.sql
#	new file:   src/lib/db_access/sql/schema/patient_records.sql
#	new file:   src/lib/file_handler/bytes_store.go
#	new file:   src/lib/file_handler/file_basic.go
#	new file:   src/lib/file_handler/file_hash.go
#	new file:   src/lib/file_handler/lock_file.go
#	new file:   src/lib/logging/log_item/error_type.go
#	new file:   src/lib/logging/log_item/v2/log_item_type.go
#	new file:   src/lib/logging/logger_engine.go
#	new file:   src/lib/logging/logger_type.go
#	new file:   src/lib/logging/writer_type.go
#	new file:   src/lib/tls_handler/cert_data.go
#	new file:   src/lib/tls_handler/cert_handler_2.go
#	new file:   src/peer/.air.toml
#	new file:   src/peer/peer_main.go
#	new file:   src/post_cmd.txt
#	new file:   src/server/.air.toml
#	new file:   src/server/gin_server/main.go
#	new file:   src/server/server_main.go
#	new file:   src/sqlc.yaml
#
# Changes not staged for commit:
#	modified:   ../v1/CommitNotes.md
#	modified:   ../v1/server/lib/db_access/db_main.go
#
```

### 2024 July 31st 13:56 PM GMT+03
```sh
1. Setup staff_frontend using:
    - vite, tanstack-router, tailwind, react
2. Goal is to easily build an interactive frontend
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Changes to be committed:
#	new file:   CommitNotes.md
#	new file:   frontend/staff_frontend/.gitignore
#	new file:   frontend/staff_frontend/README.md
#	new file:   frontend/staff_frontend/index.html
#	new file:   frontend/staff_frontend/lint_result
#	new file:   frontend/staff_frontend/postcss.config.js
#	new file:   frontend/staff_frontend/public/vite.svg
#	new file:   frontend/staff_frontend/src/App.css
#	new file:   frontend/staff_frontend/src/assets/react.svg
#	new file:   frontend/staff_frontend/src/main.tsx
#	new file:   frontend/staff_frontend/src/routeTree.gen.ts
#	new file:   frontend/staff_frontend/src/routes/App.tsx
#	new file:   frontend/staff_frontend/src/routes/__root.tsx
#	new file:   frontend/staff_frontend/src/routes/about.lazy.tsx
#	new file:   frontend/staff_frontend/src/styles/global.css
#	new file:   frontend/staff_frontend/src/styles/index.css
#	new file:   frontend/staff_frontend/src/styles/tailwind.css
#	new file:   frontend/staff_frontend/src/vite-env.d.ts
#	new file:   frontend/staff_frontend/tailwind.config.js
#	new file:   frontend/staff_frontend/tasklist
#	new file:   frontend/staff_frontend/vite.config.ts
#	modified:   server/mainthread/browser_server/server_type.go
#
```

### 2024 July 31 08:31 AM GMT+03
```sh
1. Init new project: simple_cms:
    content management system
2. setup subsections:
    - setup working logger system
    - setup gin server with ping route
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
#
# Initial commit
#
# Changes to be committed:
#	new file:   ../.gitignore
#	new file:   ../docker-compose.yaml
#	new file:   ../postgres_error_codes.md
#	new file:   .air.toml
#	new file:   .env
#	new file:   container.air.toml
#	new file:   dockerfile
#	new file:   go.mod
#	new file:   go.sum
#	new file:   help.txt
#	new file:   lib/base/atomic_json.go
#	new file:   lib/base/base.go
#	new file:   lib/base/buffer_pool.go
#	new file:   lib/base/init.go
#	new file:   lib/base/ip_handling.go
#	new file:   lib/base/mutexed_map.go
#	new file:   lib/base/os_termination_signal.go
#	new file:   lib/base/string_operations.go
#	new file:   lib/base/utils.go
#	new file:   lib/context/context.go
#	new file:   lib/cors/cors_test.go
#	new file:   lib/cors/hash_javascript.go
#	new file:   lib/cors/hash_javascript_directory.go
#	new file:   lib/cors/types.go
#	new file:   lib/db_access/db_main.go
#	new file:   lib/db_access/generated/common_queries.sql.go
#	new file:   lib/db_access/generated/db.go
#	new file:   lib/db_access/generated/models.go
#	new file:   lib/db_access/init/common_queries.sql
#	new file:   lib/db_access/sql/queries/common_queries.sql
#	new file:   lib/db_access/sql/schema/patient_records.sql
#	new file:   lib/file_handler/bytes_store.go
#	new file:   lib/file_handler/file_basic.go
#	new file:   lib/file_handler/file_hash.go
#	new file:   lib/file_handler/lock_file.go
#	new file:   lib/logging/log_item/error_type.go
#	new file:   lib/logging/log_item/v2/log_item_type.go
#	new file:   lib/logging/logger_engine.go
#	new file:   lib/logging/logger_type.go
#	new file:   lib/logging/writer_type.go
#	new file:   lib/tls_handler/cert_data.go
#	new file:   lib/tls_handler/cert_handler_2.go
#	new file:   main.go
#	new file:   mainthread/browser_server/server.go
#	new file:   mainthread/browser_server/server_type.go
#	new file:   mainthread/config/config.go
#	new file:   mainthread/loop.go
#	new file:   sqlc.yaml
#
```