# COMMIT NOTES

### 2024 September 18th, 09:22 AM
```sh
1. Creating database schema:
    - billing 
    - content 
    - user_accounts 
the goal is to uniform all database management 
2. Creating create_uniform_db_schema as a 
    simple code_gen to simplify db access 
3. next is to create:
    - visitor_info middleware in nextjs
    - auth middleware server_side 
    - content resource management nextjs side
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	modified:   biome.json
#	modified:   database_management/@types/schema/index.d.ts
#	modified:   database_management/@types/schema/main_tables.d.ts
#	modified:   database_management/@types/schema/tables.billing.d.ts
#	modified:   database_management/@types/schema/tables.public.d.ts
#	modified:   database_management/@types/schema/tables.user_accounts.d.ts
#	new file:   database_management/@types/schema/utils/contact_info.d.ts
#	modified:   database_management/@types/schema/utils/contacts_type.d.ts
#	modified:   database_management/@types/schema/utils/custom_json_type.d.ts
#	modified:   database_management/@types/schema/utils/visitor_identification_type.d.ts
#	new file:   database_management/@types/schema/utils/visitor_info.d.ts
#	modified:   database_management/biome.json
#	modified:   database_management/nodemon.json
#	renamed:    database_management/schema/0000_striped_gateway.sql -> database_management/schema/0000_talented_reptil.sql
#	modified:   database_management/schema/meta/0000_snapshot.json
#	modified:   database_management/schema/meta/_journal.json
#	modified:   database_management/scripts/repeat_introspect.js
#	modified:   database_management/src/drizzle.config.ts
#	modified:   database_management/src/env.js
#	modified:   database_management/src/schema/index.ts
#	modified:   database_management/src/schema/table_common.ts
#	modified:   database_management/src/schema/tables.billing.ts
#	modified:   database_management/src/schema/tables.content.ts
#	modified:   database_management/src/schema/tables.public.ts
#	modified:   database_management/src/schema/tables.user_accounts.ts
#	modified:   database_management/src/schema/utils/contact_info.ts
#	modified:   database_management/src/schema/utils/custom_json_type.ts
#	modified:   database_management/src/schema/utils/valid_schemas.ts
#	new file:   database_management/src/schema/utils/visitor_info.ts
#	modified:   dmwebapp/biome.json
#	modified:   dmwebapp/cache/config.json
#	modified:   dmwebapp/drizzle.config.ts
#	modified:   dmwebapp/next.config.js
#	modified:   dmwebapp/package.json
#	modified:   dmwebapp/postcss.config.cjs
#	modified:   dmwebapp/src/env.js
#	modified:   dmwebapp/src/lib/_components/main.tsx
#	modified:   dmwebapp/src/lib/db_accessories/client.ts
#	modified:   dmwebapp/src/lib/utils/cache_global.ts
#	modified:   dmwebapp/src/pages/404.tsx
#	modified:   dmwebapp/src/pages/_app.tsx
#	modified:   dmwebapp/src/pages/api/auth/[...nextauth].ts
#	modified:   dmwebapp/src/pages/api/forms/contact-us.ts
#	modified:   dmwebapp/src/pages/api/trpc/[trpc].ts
#	modified:   dmwebapp/src/pages/auth/[auth].tsx
#	modified:   dmwebapp/src/pages/blogs/[blog-id]/index.tsx
#	modified:   dmwebapp/src/pages/blogs/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/billing/[bill-id]/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/billing/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/blog/[blog-id]/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/blog/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/contact-forms/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/email/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/gallery/[photo-id].tsx
#	modified:   dmwebapp/src/pages/dashboard/gallery/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/seo.tsx
#	modified:   dmwebapp/src/pages/gallery/[photo-id].tsx
#	modified:   dmwebapp/src/pages/gallery/index.tsx
#	modified:   dmwebapp/src/pages/index.tsx
#	modified:   dmwebapp/src/server/api/root.ts
#	modified:   dmwebapp/src/server/api/routers/post.ts
#	modified:   dmwebapp/src/server/api/trpc.ts
#	modified:   dmwebapp/src/server/auth.ts
#	modified:   dmwebapp/src/server/db/index.ts
#	new file:   dmwebapp/src/server/db/schema/index.ts
#	new file:   dmwebapp/src/server/db/schema/table_common.ts
#	new file:   dmwebapp/src/server/db/schema/tables.billing.ts
#	new file:   dmwebapp/src/server/db/schema/tables.content.ts
#	new file:   dmwebapp/src/server/db/schema/tables.public.ts
#	renamed:    dmwebapp/src/server/db/schema.ts -> dmwebapp/src/server/db/schema/tables.user_accounts.ts
#	renamed:    golang_api/src/lib/db_access/sql/schema/0000_dashing_ultron.sql -> dmwebapp/src/server/db/schema/utils/common_types.ts
#	new file:   dmwebapp/src/server/db/schema/utils/contact_info.ts
#	new file:   dmwebapp/src/server/db/schema/utils/custom_json_type.ts
#	new file:   dmwebapp/src/server/db/schema/utils/index.ts
#	new file:   dmwebapp/src/server/db/schema/utils/valid_schemas.ts
#	new file:   dmwebapp/src/server/db/schema/utils/visitor_info.ts
#	modified:   dmwebapp/src/utils/api.ts
#	modified:   dmwebapp/tailwind.config.ts
#	modified:   golang_api/src/lib/db_access/generated/common_queries.sql.go
#	modified:   golang_api/src/lib/db_access/generated/models.go
#	modified:   golang_api/src/lib/db_access/sql/queries/common_queries.sql
#	new file:   golang_api/src/lib/db_access/sql/schema/0000_talented_reptil.sql
#	new file:   golang_api/src/lib/db_access/sql/schema/constraints_schema.sql
#	deleted:    golang_api/src/lib/db_access/sql/schema/patient_records.sql
#	modified:   golang_api/src/sqlc.yaml
#	modified:   package.json
#	modified:   setup/index.js
#	modified:   setup/lib/create_uniform_db_schema.js
#	modified:   setup/lib/env_handler.js
#	modified:   setup/lib/read_directory.js
#	modified:   setup/nodemon_config/env_handler.json
#	modified:   setup/nodemon_config/uniform_db_schema.json
#
```

### 2024 September 16th, 12:58 PM
```sh
1. Setting up pages departments:
    i. Gallery
    ii. Blogs
    iii. Billing
    iv. Contact Forms
    v. Email

2. Overall goals:
    i. CRUD Images for gallery
    ii. CRUD Blog posts
    iii. Ease payment systems for clients
    iv. Read contact form responses

3. Visionary goals:
    i. Simple copy-paste template for developing
    Nextjs CMS backends

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	new file:   dmwebapp/src/lib/auth/index.ts
#	modified:   dmwebapp/src/pages/auth/[auth].tsx
#	new file:   dmwebapp/src/pages/blogs/[blog-id]/index.tsx
#	new file:   dmwebapp/src/pages/blogs/index.tsx
#	new file:   dmwebapp/src/pages/dashboard/billing/[bill-id]/index.tsx
#	new file:   dmwebapp/src/pages/dashboard/billing/index.tsx
#	new file:   dmwebapp/src/pages/dashboard/blog/index.tsx
#	new file:   dmwebapp/src/pages/dashboard/contact-forms/index.tsx
#	new file:   dmwebapp/src/pages/dashboard/seo.tsx
#	modified:   package.json
#
```

### 2024 September 13th, 20:13 PM
```sh
1. both golang_api and webapp run dev successfully
2. connects to blackstar cms database
3. goal is to run golang api from vps and next 
    from vercel
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Author:    Blackstar-254 <157632014+Blackstar-254@users.noreply.github.com>
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	new file:   dmwebapp/cache/config.json
#	modified:   dmwebapp/src/env.js
#	modified:   package.json
#	modified:   setup/index.js
#
```

### 2024 September 12th, 12:08 PM 
```sh
1. Able to create uniform .env files for all 
subprojects
2. next step is auth
3. google auth?
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is ahead of 'origin/main' by 2 commits.
#   (use "git push" to publish your local commits)
#
# Changes to be committed:
#	new file:   .env.example
#	modified:   biome.json
#	modified:   package-lock.json
#	modified:   package.json
#	modified:   setup/index.js
#	modified:   setup/lib/env_handler.js
#	modified:   setup/lib/read_directory.js
#
```

### 2024 September 11th, 19:41 PM
```sh
1. Adding biomejs
2. adding .env functionality
3. setting up codespace

Goal: single template for all blackstar projects
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	deleted:    Biomefile
#	new file:   biome.json
#	modified:   database_management/@types/drizzle.config.d.ts
#	modified:   database_management/@types/schema/main_tables.d.ts
#	modified:   database_management/biome.json
#	modified:   database_management/schema/meta/0000_snapshot.json
#	modified:   database_management/schema/meta/_journal.json
#	modified:   database_management/src/drizzle.config.ts
#	modified:   database_management/src/schema/accounts.ts
#	modified:   database_management/src/schema/main_tables.ts
#	modified:   database_management/src/schema/table_common.ts
#	modified:   database_management/tsconfig.json
#	deleted:    dmwebapp/.eslintrc.cjs
#	new file:   dmwebapp/biome.json
#	modified:   dmwebapp/drizzle.config.ts
#	modified:   dmwebapp/next.config.js
#	modified:   dmwebapp/package.json
#	modified:   dmwebapp/postcss.config.cjs
#	deleted:    dmwebapp/prettier.config.js
#	modified:   dmwebapp/src/env.js
#	modified:   dmwebapp/src/pages/_app.tsx
#	modified:   dmwebapp/src/pages/api/auth/[...nextauth].ts
#	modified:   dmwebapp/src/pages/api/trpc/[trpc].ts
#	modified:   dmwebapp/src/pages/index.tsx
#	modified:   dmwebapp/src/server/api/root.ts
#	modified:   dmwebapp/src/server/api/routers/post.ts
#	modified:   dmwebapp/src/server/api/trpc.ts
#	modified:   dmwebapp/src/server/auth.ts
#	modified:   dmwebapp/src/server/db/index.ts
#	modified:   dmwebapp/src/server/db/schema.ts
#	modified:   dmwebapp/src/utils/api.ts
#	deleted:    dmwebapp/start-database.sh
#	modified:   dmwebapp/tailwind.config.ts
#	modified:   dmwebapp/tsconfig.json
#	modified:   nodemon.json
#	modified:   package.json
#	modified:   setup/index.js
#	modified:   setup/lib/env_handler.js
#	modified:   setup/lib/read_directory.js
#
```


### 2024 September 10th, 09:31 AM
```sh
1. added preliminary golang_api
2. added preliminary database_management code
3. need to fine tune operations for easy 
    copy-pasting
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	new file:   database_management/@types/drizzle.config.d.ts
#	new file:   database_management/@types/schema/main_tables.d.ts
#	new file:   database_management/@types/schema/table_common.d.ts
#	new file:   database_management/biome.json
#	new file:   database_management/compose.ps1
#	new file:   database_management/package-lock.json
#	new file:   database_management/package.json
#	new file:   database_management/rebuild_schem.cmd
#	new file:   database_management/schema/0000_misty_devos.sql
#	new file:   database_management/schema/meta/0000_snapshot.json
#	new file:   database_management/schema/meta/_journal.json
#	new file:   database_management/src/drizzle.config.ts
#	new file:   database_management/src/schema/accounts.ts
#	new file:   database_management/src/schema/main_tables.ts
#	new file:   database_management/src/schema/table_common.ts
#	new file:   database_management/tsconfig.json
#	new file:   golang_api/.gitignore
#	new file:   golang_api/CommitNotes.md
#	new file:   golang_api/dev_frontend.cmd
#	new file:   golang_api/dev_server.cmd
#	new file:   golang_api/post_cmd.txt
#	new file:   golang_api/postgres_error_codes.md
#	new file:   golang_api/scripts/bash/dev_dev.ps1
#	new file:   golang_api/scripts/bash/dev_peer.cmd
#	new file:   golang_api/scripts/bash/dev_server.cmd
#	new file:   golang_api/src/go.mod
#	new file:   golang_api/src/go.sum
#	new file:   golang_api/src/lib/base/atomic_json.go
#	new file:   golang_api/src/lib/base/base.go
#	new file:   golang_api/src/lib/base/buffer_pool.go
#	new file:   golang_api/src/lib/base/init.go
#	new file:   golang_api/src/lib/base/ip_handling.go
#	new file:   golang_api/src/lib/base/mutexed_map.go
#	new file:   golang_api/src/lib/base/os_termination_signal.go
#	new file:   golang_api/src/lib/base/string_operations.go
#	new file:   golang_api/src/lib/base/utils.go
#	new file:   golang_api/src/lib/calendar/calendar_main.go
#	new file:   golang_api/src/lib/config/base.go
#	new file:   golang_api/src/lib/context/context.go
#	new file:   golang_api/src/lib/cors/cors_test.go
#	new file:   golang_api/src/lib/cors/hash_javascript.go
#	new file:   golang_api/src/lib/cors/hash_javascript_directory.go
#	new file:   golang_api/src/lib/cors/types.go
#	new file:   golang_api/src/lib/db_access/db_main.go
#	new file:   golang_api/src/lib/db_access/generated/common_queries.sql.go
#	new file:   golang_api/src/lib/db_access/generated/db.go
#	new file:   golang_api/src/lib/db_access/generated/models.go
#	new file:   golang_api/src/lib/db_access/init/common_queries.sql
#	new file:   golang_api/src/lib/db_access/sql/queries/common_queries.sql
#	new file:   golang_api/src/lib/db_access/sql/schema/patient_records.sql
#	new file:   golang_api/src/lib/file_handler/bytes_store.go
#	new file:   golang_api/src/lib/file_handler/file_basic.go
#	new file:   golang_api/src/lib/file_handler/file_hash.go
#	new file:   golang_api/src/lib/file_handler/lock_file.go
#	new file:   golang_api/src/lib/file_handler/read_csv.go
#	new file:   golang_api/src/lib/logging/log_item/v2/log_item_type.go
#	new file:   golang_api/src/lib/logging/logger_engine.go
#	new file:   golang_api/src/lib/logging/logger_type.go
#	new file:   golang_api/src/lib/logging/writer_type.go
#	new file:   golang_api/src/lib/tls_handler/cert_data.go
#	new file:   golang_api/src/lib/tls_handler/cert_handler_2.go
#	new file:   golang_api/src/peer/.air.toml
#	new file:   golang_api/src/peer/peer_main.go
#	new file:   golang_api/src/post_cmd.txt
#	new file:   golang_api/src/public/index.html
#	new file:   golang_api/src/server/.air.toml
#	new file:   golang_api/src/server/gin_server/main.go
#	new file:   golang_api/src/server/post_cmd.txt
#	new file:   golang_api/src/server/server_main.go
#	new file:   golang_api/src/sqlc.yaml
#

```