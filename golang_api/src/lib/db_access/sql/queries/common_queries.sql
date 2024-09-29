-- name: GetAllOrganisations :many
select * from billing.organisations;

-- name: GetVisitMetadata :one
select * from user_accounts.visits 
where visitor_id = $1
limit 1;

-- name: GetSessionTokens :many
select session_token, user_id, expires, "name", email, email_verified, image, client_org, contact_info from user_accounts."session" 
right JOIN user_accounts."user" ON session.user_id = user_accounts."user".id;