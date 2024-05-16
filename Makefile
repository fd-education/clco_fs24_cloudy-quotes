login:
	npx wrangler login

create_db_prod:
	npx wrangler d1 create quotes-db

fill_db_prod:
	cat ./db-access-worker/database/schema.sql > ./db-access-worker/database/tmp.sql
	awk '{gsub(/" /, "\"|"); gsub(/"/,""); print}' ./db-access-worker/database/quotes.txt | awk -F"|" '{gsub(/^[ \t]+|[ \t]+$$/, "", $$2); print "INSERT INTO quotes (quote, author) VALUES(""\""$$1"\",\""$$2"\");"}' >> ./db-access-worker/database/tmp.sql
	npx wrangler d1 execute quotes-db --remote --file=./db-access-worker/database/tmp.sql
	rm ./db-access-worker/database/tmp.sql

deploy_workers:
	cd ./db-access-worker && npx wrangler deploy
	cd ./get-quotes-worker && npx wrangler deploy

deploy_page:
	npx wrangler pages project create quotes-page --production-branch main
	cd ./quotes-page && npm run build && npx wrangler pages deploy ./build --project-name quotes-page

destroy_deployment:
	npx wrangler pages project delete quotes-page --yes true
	cd ./get-quotes-worker && npx wrangler delete
	cd ./db-access-worker && npx wrangler delete
	npx wrangler d1 delete quotes-db -y
