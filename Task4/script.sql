CREATE SCHEMA "userSchema";
CREATE TABLE "userSchema".users
(
    id SERIAL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean DEFAULT false,
    PRIMARY KEY (id)
);

ALTER TABLE "userSchema".users
OWNER to postgres;

INSERT INTO "userSchema".users(
	login, password, age)
	VALUES ('Boris', 'boris007', 48);
	
INSERT INTO "userSchema".users(
	login, password, age)
	VALUES ('Feokl', 'kosovorotka228', 14);
	
INSERT INTO "userSchema".users(
	login, password, age)
	VALUES ('Makar', 'Rakam', 28);
	
INSERT INTO "userSchema".users(
	login, password, age)
	VALUES ('Kupala', 'poleno', 33);
	
INSERT INTO "userSchema".users(
	login, password, age)
	VALUES ('Svyatomir', 'overkiller9000', 18);
	
INSERT INTO "userSchema".users(
	login, password, age)
	VALUES ('Paul1', 'passPaul1', 11);
	
INSERT INTO "userSchema".users(
	login, password, age)
	VALUES ('Paul2', 'passPaul2', 22);



CREATE SCHEMA "groupSchema";
CREATE TABLE "groupSchema".groups
(
    id SERIAL,
    name character varying NOT NULL,
    permissions character varying(12)[],
    PRIMARY KEY (id)
);

ALTER TABLE "groupSchema".groups
OWNER to postgres;

INSERT INTO "groupSchema".groups(
	name, permissions)
	VALUES ('admin1', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'])

INSERT INTO "groupSchema".groups(
	name, permissions)
	VALUES ('admin2', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'])

INSERT INTO "groupSchema".groups(
	name, permissions)
	VALUES ('admin3', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'])



CREATE SCHEMA "userGroupSchema";
CREATE TABLE "userGroupSchema".userGroup
(
    id SERIAL,
    userId int NOT NULL,
    groupId int NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE "userGroupSchema".userGroup
OWNER to postgres;

-- INSERT INTO "groupSchema".groups(
-- 	name, permissions)
-- 	VALUES ('admin1', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'])
