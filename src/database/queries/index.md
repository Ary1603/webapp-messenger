📄 Purpose of SQL Query Files

The SQL files in this directory are not executed directly by the application at runtime.

Their purpose is to serve as:
	•	Documentation of database logic (functions, views, policies).
	•	Source of truth for how complex queries are implemented in PostgreSQL.
	•	Version-controlled reference for code reviews and team collaboration.
	•	Support for database migrations, ensuring consistency across environments.
	•	Onboarding aid for new developers to understand database behavior.

In projects using Supabase, all SQL logic is executed inside PostgreSQL (via Functions, Views, or Policies).
The application layer (TypeScript / backend) only calls these database functions, it does not execute raw SQL.

Therefore, these SQL files exist to document, version, and maintain the database logic —
not to be imported or executed directly by the application code.