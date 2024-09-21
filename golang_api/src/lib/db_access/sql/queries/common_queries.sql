-- name: GetAllOrganisations :many
select * from billing.organisations;

-- name: GetVisitMetadata :one
select * from user_accounts.visits 
where visitor_id = $1
limit 1;