CREATE SCHEMA "ProjectSchema";
CREATE TABLE "ProjectSchema"."users"
(
    id SERIAL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean DEFAULT false,
    PRIMARY KEY (id)
);

ALTER TABLE "ProjectSchema"."users"
OWNER to postgres;

INSERT INTO "ProjectSchema"."users"(
	login, password, age)
	VALUES ('Boris', 'boris007', 48);
	
INSERT INTO "ProjectSchema"."users"(
	login, password, age)
	VALUES ('Feokl', 'kosovorotka228', 14);
	
INSERT INTO "ProjectSchema"."users"(
	login, password, age)
	VALUES ('Makar', 'Rakam', 28);
	
INSERT INTO "ProjectSchema"."users"(
	login, password, age)
	VALUES ('Kupala', 'poleno', 33);
	
INSERT INTO "ProjectSchema"."users"(
	login, password, age)
	VALUES ('Svyatomir', 'overkiller9000', 18);
	
INSERT INTO "ProjectSchema"."users"(
	login, password, age)
	VALUES ('Paul1', 'passPaul1', 11);
	
INSERT INTO "ProjectSchema"."users"(
	login, password, age)
	VALUES ('Paul2', 'passPaul2', 22);



CREATE TABLE "ProjectSchema"."groups"
(
    id SERIAL,
    name character varying NOT NULL,
    permissions character varying(12)[],
    PRIMARY KEY (id)
);

ALTER TABLE "ProjectSchema"."groups"
OWNER to postgres;

INSERT INTO "ProjectSchema"."groups"(
	name, permissions)
	VALUES ('admin1', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);

INSERT INTO "ProjectSchema"."groups"(
	name, permissions)
	VALUES ('admin2', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);

INSERT INTO "ProjectSchema"."groups"(
	name, permissions)
	VALUES ('admin3', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);



CREATE TABLE "ProjectSchema"."usersGroups"
(
    id SERIAL,
    "groupId" int NOT NULL REFERENCES "ProjectSchema"."groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "userId" int NOT NULL REFERENCES "ProjectSchema"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("groupId", "userId")
);

ALTER TABLE "ProjectSchema"."usersGroups"
OWNER to postgres;

INSERT INTO "ProjectSchema"."usersGroups"(
	"groupId", "userId")
	VALUES (2, 4)
