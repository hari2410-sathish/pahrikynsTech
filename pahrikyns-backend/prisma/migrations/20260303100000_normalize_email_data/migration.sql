-- Normalize stored email values to trimmed lowercase wherever it is safe.
-- This helps old rows created before input normalization in auth flows.

UPDATE "User" u
SET "email" = lower(trim(u."email"))
WHERE u."email" <> lower(trim(u."email"))
  AND NOT EXISTS (
    SELECT 1
    FROM "User" x
    WHERE x."id" <> u."id"
      AND lower(trim(x."email")) = lower(trim(u."email"))
  );

UPDATE "TempUser" t
SET "email" = lower(trim(t."email"))
WHERE t."email" <> lower(trim(t."email"))
  AND NOT EXISTS (
    SELECT 1
    FROM "TempUser" x
    WHERE x."email" <> t."email"
      AND lower(trim(x."email")) = lower(trim(t."email"))
  );

UPDATE "Admin" a
SET "email" = lower(trim(a."email"))
WHERE a."email" <> lower(trim(a."email"))
  AND NOT EXISTS (
    SELECT 1
    FROM "Admin" x
    WHERE x."id" <> a."id"
      AND lower(trim(x."email")) = lower(trim(a."email"))
  );

UPDATE "Student" s
SET "email" = lower(trim(s."email"))
WHERE s."email" <> lower(trim(s."email"))
  AND NOT EXISTS (
    SELECT 1
    FROM "Student" x
    WHERE x."id" <> s."id"
      AND lower(trim(x."email")) = lower(trim(s."email"))
  );

UPDATE "OtpStore"
SET "email" = lower(trim("email"))
WHERE "email" <> lower(trim("email"));
