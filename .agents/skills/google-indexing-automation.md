# SKILL: Google Indexing Automation
**Trigger:** Whenever a new batch of 500+ parts is added to Supabase.
**Agent Instructions:** 1. Access the `GOOGLE_APPLICATION_CREDENTIALS` from the project secrets.
2. Run the script at `/scripts/index-pages.ts`.
3. Verify the status of each URL via the Google Search Console API.
4. Output a summary report of "Pages Successfully Indexed" vs "Retries Needed."
5. Jules, to run the indexing script, use the INDEXING_SERVICE_EMAIL and INDEXING_PRIVATE_KEY variables stored in the environment. Do not output these values to the console. Use the googleapis library to authenticate and submit URLs from the database.