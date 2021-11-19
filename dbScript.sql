DROP DATABASE projeto_16_test;
CREATE DATABASE projeto_16_test;
\c projeto_16_test;

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"complete_name" varchar(255),
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "signature" (
	"id" serial NOT NULL,
	"signature_date" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"delivery_date_id" integer NOT NULL,
	"product_options_id" integer NOT NULL,
	"user_id" integer NOT NULL UNIQUE,
	CONSTRAINT "signature_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "product_options" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "product_options_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "address" (
	"id" serial NOT NULL,
	"zip_code" varchar(255) NOT NULL,
	"street" varchar(255) NOT NULL,
	"street_number" varchar(255) NOT NULL,
	"neighborhood" varchar(255) NOT NULL,
	"user_id" integer NOT NULL UNIQUE,
	CONSTRAINT "address_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "delivery_date" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"plan_id" integer NOT NULL,
	CONSTRAINT "delivery_date_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "signature" ADD CONSTRAINT "signature_fk0" FOREIGN KEY ("delivery_date_id") REFERENCES "delivery_date"("id");
ALTER TABLE "signature" ADD CONSTRAINT "signature_fk1" FOREIGN KEY ("product_options_id") REFERENCES "product_options"("id");
ALTER TABLE "signature" ADD CONSTRAINT "signature_fk2" FOREIGN KEY ("user_id") REFERENCES "users"("id");



ALTER TABLE "address" ADD CONSTRAINT "address_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "delivery_date" ADD CONSTRAINT "delivery_date_fk0" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");


INSERT INTO "plans" ("name") VALUES ('semanal');
INSERT INTO "plans" ("name") VALUES ('mensal');

INSERT INTO "product_options" ("name") VALUES ('Chás');
INSERT INTO "product_options" ("name") VALUES ('Incensos');
INSERT INTO "product_options" ("name") VALUES ('Produtos orgânicos');

INSERT INTO "delivery_date" ("name","plan_id") VALUES ('Segunda',1);
INSERT INTO "delivery_date" ("name","plan_id") VALUES ('Quarta',1);
INSERT INTO "delivery_date" ("name","plan_id") VALUES ('Sexta',1);

INSERT INTO "delivery_date" ("name","plan_id") VALUES ('01',2);
INSERT INTO "delivery_date" ("name","plan_id") VALUES ('10',2);
INSERT INTO "delivery_date" ("name","plan_id") VALUES ('20',2);










