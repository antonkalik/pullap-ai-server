BEGIN;

CREATE OR REPLACE FUNCTION set_username() RETURNS trigger AS $$
BEGIN
    NEW.username := NEW.first_name || '_' || NEW.last_name || '_' || NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER username_trigger
    BEFORE INSERT ON users
    FOR EACH ROW EXECUTE PROCEDURE set_username();

COMMIT;
