# COMMIT NOTES

### 2024 October 14th, 02:16 AM GMT+3
```sh
1. Implementing fastify-api as api for cms 
2. implementing cross server communication 
3. nodejs development is so far much faster than 
golang
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	modified:   src/index.js
#	modified:   src/lib/db/common_queries.js
#	new file:   src/lib/db/users.js
#	modified:   src/lib/initialise/index.js
#	new file:   src/routes/api/cms.gallery.js
#	new file:   src/routes/api/index.js
#	modified:   src/routes/gallery.js
#	new file:   test_bed/index.js
#
# Changes not staged for commit:
#	modified:   ../.env.example
#	modified:   ../.gitignore
#	modified:   ../CommitNotes.md
#	modified:   ../biome.json
#	modified:   ../database_management/@types/env.d.ts
#	modified:   ../database_management/src/env.js
#	modified:   ../dmwebapp/src/env.js
#	modified:   ../golang_api/src/lib/config/base.go
#	modified:   ../package.json
#	modified:   ../setup/lib/env_handler.js
#
# Untracked files:
#	../blackstar_cms/
#
```

### 2024 October 10th, 23:25 PM GMT+3
```sh
1. working on golang is taking too long and comp 
is struggling, 
implementing fastify api for faster development
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is ahead of 'origin/main' by 1 commit.
#   (use "git push" to publish your local commits)
#
# Changes to be committed:
#	modified:   .gitignore
#	modified:   golang_api/.gitignore
#	modified:   golang_api/src/lib/db_access/generated/common_queries.sql.go
#	modified:   golang_api/src/lib/db_access/sql/queries/common_queries.sql
#	modified:   golang_api/src/lib/file_handler/file_hash.go
#	modified:   golang_api/src/server/gin_server/gallery_handlers.go
#	new file:   golang_api/src/server/public/91ff7cee-bb4e-4551-a9c7-5b7f4a5326dc/images/116449445_3148661418504399_49363013400333769_n.png
#	new file:   golang_api/src/server/public/91ff7cee-bb4e-4551-a9c7-5b7f4a5326dc/images/78997724_2591073760929837_2536989060933615616_n.png
#	new file:   golang_api/src/server/public/91ff7cee-bb4e-4551-a9c7-5b7f4a5326dc/images/81358662_2629018217135391_4360776004680024064_n.png
#	new file:   golang_api/src/server/public/91ff7cee-bb4e-4551-a9c7-5b7f4a5326dc/images/81668032_2655253744511838_6107655069295968256_n.png
#	new file:   golang_api/src/server/public/91ff7cee-bb4e-4551-a9c7-5b7f4a5326dc/images/82220007_2655299367840609_4743437215428771840_n.png
#	new file:   golang_api/src/server/public/91ff7cee-bb4e-4551-a9c7-5b7f4a5326dc/images/83930275_2709691425734736_48241966021869568_n.png
#	new file:   golang_api/src/server/public/91ff7cee-bb4e-4551-a9c7-5b7f4a5326dc/images/88108975_2756600341043844_8218669132078383104_n.png
#
```

### 2024 September 29th, 17:54 PM GMT+3
```sh
1. Able to choose image
2. working on posting to CMS 
3. Need to setup push to Vercel and AWS
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is ahead of 'origin/main' by 2 commits.
#   (use "git push" to publish your local commits)
#
# Changes to be committed:
#	modified:   dmwebapp/biome.json
#	modified:   dmwebapp/package-lock.json
#	modified:   dmwebapp/package.json
#	modified:   dmwebapp/src/env.js
#	modified:   dmwebapp/src/lib/_components/form_components.tsx
#	modified:   dmwebapp/src/lib/_components/main.tsx
#	new file:   dmwebapp/src/lib/api/email_handlers.ts
#	new file:   dmwebapp/src/lib/api/log_errors.ts
#	modified:   dmwebapp/src/middleware.ts
#	modified:   dmwebapp/src/pages/api/auth/[...nextauth].ts
#	new file:   dmwebapp/src/pages/api/cms/log.ts
#	modified:   dmwebapp/src/pages/dashboard/gallery/index.tsx
#	modified:   dmwebapp/src/pages/dashboard/index.tsx
#	deleted:    dmwebapp/src/pages/index.tsx
#	modified:   dmwebapp/src/server/api/root.ts
#	modified:   dmwebapp/src/server/api/routers/contact_forms.ts
#	new file:   dmwebapp/src/server/api/routers/gallery.ts
#	deleted:    dmwebapp/src/server/api/routers/post.ts
#	modified:   dmwebapp/src/server/api/trpc.ts
#	modified:   golang_api/src/lib/base/mutexed_map.go
#	modified:   golang_api/src/lib/db_access/generated/common_queries.sql.go
#	modified:   golang_api/src/lib/db_access/sql/queries/common_queries.sql
#	modified:   golang_api/src/server/.air.toml
#	new file:   golang_api/src/server/gin_server/gallery_handlers.go
#	modified:   golang_api/src/server/gin_server/hot_cache_item.go
#	modified:   golang_api/src/server/gin_server/main.go
#	modified:   setup/lib/env_handler.js
#
```

### 2024 September 21st, 20:27 PM GMT+3
```sh
1. using nextauth for authentication
2. using email as login provider
3. next:
    - gallery
    - upload images
    - blog
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	modified:   .env.example
#	modified:   database_management/@types/schema/tables.user_accounts.d.ts
#	modified:   database_management/package.json
#	renamed:    database_management/schema/0000_fast_micromacro.sql -> database_management/schema/0000_shiny_dreadnoughts.sql
#	modified:   database_management/schema/meta/0000_snapshot.json
#	modified:   database_management/schema/meta/_journal.json
#	new file:   database_management/scripts/test/billing.organisation.sql
#	new file:   database_management/scripts/test/user_accounts.user.sql
#	modified:   database_management/src/schema/tables.billing.ts
#	modified:   database_management/src/schema/tables.user_accounts.ts
#	modified:   dmwebapp/package-lock.json
#	modified:   dmwebapp/package.json
#	modified:   dmwebapp/src/env.js
#	new file:   dmwebapp/src/lib/_components/form_components.tsx
#	new file:   dmwebapp/src/lib/_components/html_templates/user_verification_email.html
#	modified:   dmwebapp/src/lib/_components/main.tsx
#	modified:   dmwebapp/src/lib/api/auth.ts
#	new file:   dmwebapp/src/pages/_auth/[...auth].tsx
#	new file:   dmwebapp/src/pages/_auth/index.tsx
#	modified:   dmwebapp/src/pages/api/auth/[...nextauth].ts
#	deleted:    dmwebapp/src/pages/auth/[auth].tsx
#	modified:   dmwebapp/src/server/api/root.ts
#	new file:   dmwebapp/src/server/api/routers/contact_forms.ts
#	modified:   dmwebapp/src/server/auth.ts
#	modified:   dmwebapp/src/server/db/schema/tables.billing.ts
#	modified:   dmwebapp/src/server/db/schema/tables.user_accounts.ts
#	modified:   golang_api/src/lib/db_access/generated/models.go
#	renamed:    golang_api/src/lib/db_access/sql/schema/0000_fast_micromacro.sql -> golang_api/src/lib/db_access/sql/schema/0000_shiny_dreadnoughts.sql
#	modified:   package.json
#	modified:   setup/lib/create_uniform_db_schema.js
#	modified:   setup/lib/env_handler.js
#
```

### 2024 September 20th, 00:06 AM GMT+3
```sh
1. created visitors table in db 
2. created /api/cms/visitors 
3. added visitor-id to cookie
4. next is to update contact us form to db 
5. allow client to:
    - upload images 
    - auth/login 
    - upload blog
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	modified:   .gitignore
#	modified:   biome.json
#	modified:   database_management/@types/drizzle.config.d.ts
#	modified:   database_management/@types/env.d.ts
#	modified:   database_management/@types/schema/tables.billing.d.ts
#	modified:   database_management/@types/schema/tables.content.d.ts
#	modified:   database_management/@types/schema/tables.public.d.ts
#	modified:   database_management/@types/schema/tables.user_accounts.d.ts
#	modified:   database_management/@types/schema/utils/contact_info.d.ts
#	modified:   database_management/@types/schema/utils/custom_json_type.d.ts
#	modified:   database_management/@types/schema/utils/valid_schemas.d.ts
#	modified:   database_management/@types/schema/utils/visitor_info.d.ts
#	modified:   database_management/package-lock.json
#	modified:   database_management/package.json
#	renamed:    database_management/schema/0000_talented_reptil.sql -> database_management/schema/0000_medical_komodo.sql
#	modified:   database_management/schema/meta/0000_snapshot.json
#	modified:   database_management/schema/meta/_journal.json
#	modified:   database_management/src/schema/tables.billing.ts
#	modified:   database_management/src/schema/tables.public.ts
#	modified:   database_management/src/schema/tables.user_accounts.ts
#	modified:   database_management/src/schema/utils/common_types.ts
#	modified:   database_management/src/schema/utils/visitor_info.ts
#	new file:   dmwebapp/public/test/Gallery.css
#	new file:   dmwebapp/public/test/Gallery.html
#	new file:   dmwebapp/public/test/Home.html
#	new file:   dmwebapp/public/test/images/10486568.png
#	new file:   dmwebapp/public/test/images/116449445_3148661418504399_49363013400333769_n.png
#	new file:   dmwebapp/public/test/images/121352197_3369841003053105_51205684272514932_n.png
#	new file:   dmwebapp/public/test/images/130285072_3525514494152421_1544287742367305442_n.png
#	new file:   dmwebapp/public/test/images/186543141_153732450098724_5169552202587625704_n.png
#	new file:   dmwebapp/public/test/images/191047715_160386636099972_3067390665334471319_n.png
#	new file:   dmwebapp/public/test/images/284294744_410474884424478_3955126763285761820_n.png
#	new file:   dmwebapp/public/test/images/287295230_424870179651615_8639128166918859655_n.png
#	new file:   dmwebapp/public/test/images/293229472_440831021388864_4550485181881416156_n.png
#	new file:   dmwebapp/public/test/images/309477480_499565025515463_8751996586965130244_n.png
#	new file:   dmwebapp/public/test/images/78997724_2591073760929837_2536989060933615616_n.png
#	new file:   dmwebapp/public/test/images/81358662_2629018217135391_4360776004680024064_n.png
#	new file:   dmwebapp/public/test/images/81668032_2655253744511838_6107655069295968256_n.png
#	new file:   dmwebapp/public/test/images/82220007_2655299367840609_4743437215428771840_n.png
#	new file:   dmwebapp/public/test/images/83930275_2709691425734736_48241966021869568_n.png
#	new file:   dmwebapp/public/test/images/88108975_2756600341043844_8218669132078383104_n.png
#	new file:   dmwebapp/public/test/images/brimage_fotos_logo_Fotor.png
#	new file:   dmwebapp/public/test/images/business-team-5.jpg
#	new file:   dmwebapp/public/test/images/default-image.jpg
#	new file:   dmwebapp/public/test/index.css
#	new file:   dmwebapp/public/test/index.html
#	new file:   dmwebapp/public/test/intlTelInput/intlTelInput.css
#	new file:   dmwebapp/public/test/intlTelInput/intlTelInput.min.js
#	new file:   dmwebapp/public/test/intlTelInput/utils.js
#	new file:   dmwebapp/public/test/jquery.js
#	new file:   dmwebapp/public/test/nicepage.css
#	new file:   dmwebapp/public/test/nicepage.js
#	modified:   dmwebapp/src/middleware.ts
#	modified:   dmwebapp/src/pages/api/cms/visitors.ts
#	modified:   dmwebapp/src/server/db/schema/tables.billing.ts
#	modified:   dmwebapp/src/server/db/schema/tables.public.ts
#	modified:   dmwebapp/src/server/db/schema/tables.user_accounts.ts
#	modified:   dmwebapp/src/server/db/schema/utils/common_types.ts
#	modified:   dmwebapp/src/server/db/schema/utils/visitor_info.ts
#	modified:   golang_api/src/lib/db_access/generated/models.go
#	renamed:    golang_api/src/lib/db_access/sql/schema/0000_talented_reptil.sql -> golang_api/src/lib/db_access/sql/schema/0000_medical_komodo.sql
#	modified:   golang_api/src/lib/db_access/sql/schema/constraints_schema.sql
#	modified:   package.json
#	new file:   setup/nodemon_config/json_recurse.json
#
```

### 2024 September 18th, 09:22 AM GMT+3
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

### 2024 September 16th, 12:58 PM GMT+3
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

### 2024 September 13th, 20:13 PM GMT+3
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

### 2024 September 12th, 12:08 PM GMT+3
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

### 2024 September 11th, 19:41 PM GMT+3
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


### 2024 September 10th, 09:31 AM GMT+3
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