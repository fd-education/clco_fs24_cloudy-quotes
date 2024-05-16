create_quotes_db_dev: # has to be run before populating the tables with the fill_db_dev target
	npx wrangler d1 create quotes --local

create_quotes_db_prod: # has to be run before populating the tables with the fill_db_prod target
	npx wrangler d1 create quotes

fill_db_dev: # create dev deployment of the quotes table
	cat ./database/schema.sql > ./database/tmp.sql
	awk '{gsub(/" /, "\"|"); gsub(/"/,""); print}' ./database/quotes.txt | awk -F"|" '{gsub(/^[ \t]+|[ \t]+$$/, "", $$2); print "INSERT INTO quotes (quote, author) VALUES(""\""$$1"\",\""$$2"\");"}' >> ./database/tmp.sql
	npx wrangler d1 execute quotes --local --file=./database/tmp.sql
	rm ./database/tmp.sql

fill_db_prod: # create prod deployment of the quotes table
	cat ./database/schema.sql > ./database/tmp.sql
	awk '{gsub(/" /, "\"|"); gsub(/"/,""); print}' ./database/quotes.txt | awk -F"|" '{gsub(/^[ \t]+|[ \t]+$$/, "", $$2); print "INSERT INTO quotes (quote, author) VALUES(""\""$$1"\",\""$$2"\");"}' >> ./database/tmp.sql
	npx wrangler d1 execute quotes --remote --file=./database/tmp.sql
	rm ./database/tmp.sql
