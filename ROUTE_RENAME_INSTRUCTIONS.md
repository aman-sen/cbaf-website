# ⚠️ IMPORTANT: Rename These Folders After Cloning

Next.js uses special folder name syntax that cannot be created with standard shell tools.
After copying this project, rename the following folders:

## Route Groups & Dynamic Segments

| Current Folder Name         | Rename To                    |
|-----------------------------|------------------------------|
| app/public_routes/          | app/(public)/                |
| app/public_routes/campaigns/slug/ | app/(public)/campaigns/[slug]/ |
| app/public_routes/projects/slug/  | app/(public)/projects/[slug]/  |
| app/api/campaigns/id/       | app/api/campaigns/[id]/      |
| app/api/donations/id/       | app/api/donations/[id]/      |
| app/api/projects/id/        | app/api/projects/[id]/       |
| app/api/auth/nextauth/      | app/api/auth/[...nextauth]/  |

## Quick Rename Script (run from project root)

```bash
# Move public routes to route group
mv app/public_routes "app/(public)"

# Dynamic campaign slug
mv "app/(public)/campaigns/slug" "app/(public)/campaigns/[slug]"

# Dynamic project slug
mv "app/(public)/projects/slug" "app/(public)/projects/[slug]"

# API dynamic routes
mv app/api/campaigns/id "app/api/campaigns/[id]"
mv app/api/donations/id "app/api/donations/[id]"
mv app/api/projects/id "app/api/projects/[id]"

# NextAuth catch-all
mv app/api/auth/nextauth "app/api/auth/[...nextauth]"
```

Run this script once and the full Next.js routing will work correctly.
