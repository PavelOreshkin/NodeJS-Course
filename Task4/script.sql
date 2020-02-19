CREATE SCHEMA "ProjectSchema";
CREATE TABLE "ProjectSchema"."Users"
(
    id SERIAL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean DEFAULT false,
    PRIMARY KEY (id)
);

ALTER TABLE "ProjectSchema"."Users"
OWNER to postgres;

INSERT INTO "ProjectSchema"."Users"(
	login, password, age)
	VALUES ('Boris', 'boris007', 48);
	
INSERT INTO "ProjectSchema"."Users"(
	login, password, age)
	VALUES ('Feokl', 'kosovorotka228', 14);
	
INSERT INTO "ProjectSchema"."Users"(
	login, password, age)
	VALUES ('Makar', 'Rakam', 28);
	
INSERT INTO "ProjectSchema"."Users"(
	login, password, age)
	VALUES ('Kupala', 'poleno', 33);
	
INSERT INTO "ProjectSchema"."Users"(
	login, password, age)
	VALUES ('Svyatomir', 'overkiller9000', 18);
	
INSERT INTO "ProjectSchema"."Users"(
	login, password, age)
	VALUES ('Paul1', 'passPaul1', 11);
	
INSERT INTO "ProjectSchema"."Users"(
	login, password, age)
	VALUES ('Paul2', 'passPaul2', 22);



CREATE TABLE "ProjectSchema"."Groups"
(
    id SERIAL,
    name character varying NOT NULL,
    permissions character varying(12)[],
    PRIMARY KEY (id)
);

ALTER TABLE "ProjectSchema"."Groups"
OWNER to postgres;

INSERT INTO "ProjectSchema"."Groups"(
	name, permissions)
	VALUES ('admin1', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);

INSERT INTO "ProjectSchema"."Groups"(
	name, permissions)
	VALUES ('admin2', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);

INSERT INTO "ProjectSchema"."Groups"(
	name, permissions)
	VALUES ('admin3', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);



CREATE TABLE "ProjectSchema"."UsersGroups"
(
    id SERIAL,
    "groupId" int NOT NULL REFERENCES "ProjectSchema"."Groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "userId" int NOT NULL REFERENCES "ProjectSchema"."Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("groupId", "userId")
);

ALTER TABLE "ProjectSchema"."UsersGroups"
OWNER to postgres;

INSERT INTO "ProjectSchema"."UsersGroups"(
	"groupId", "userId")
	VALUES (2, 4)
