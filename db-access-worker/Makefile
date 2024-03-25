setup_db_local: # create local deployment of the quotes table
	cat ./database/schema.sql > ./database/tmp.sql
	awk '{gsub(/" /, "\"|"); gsub(/"/,""); print}' ./database/quotes.txt | awk -F"|" '{gsub(/^[ \t]+|[ \t]+$$/, "", $$2); print "INSERT INTO quotes (quote, author) VALUES(""\""$$1"\",\""$$2"\");"}' >> ./database/tmp.sql
	npx wrangler d1 execute quotes --local --file=./database/tmp.sql
	rm ./database/tmp.sql

setup_db_remote: # create remote deployment of the quotes table
	cat ./database/schema.sql > ./database/tmp.sql
	awk '{gsub(/" /, "\"|"); gsub(/"/,""); print}' ./database/quotes.txt | awk -F"|" '{gsub(/^[ \t]+|[ \t]+$$/, "", $$2); print "INSERT INTO quotes (quote, author) VALUES(""\""$$1"\",\""$$2"\");"}' >> ./database/tmp.sql
	npx wrangler d1 execute quotes --remote --file=./database/tmp.sql
	rm ./database/tmp.sql
