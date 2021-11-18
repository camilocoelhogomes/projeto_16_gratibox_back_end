CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"complete_name" varchar(255),
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "signature" (
	"id" serial NOT NULL,
	"signature_date" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"plans_id" integer NOT NULL,
	"delivery_date" varchar(255) NOT NULL,
	"product_options_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"address_id" integer NOT NULL,
	CONSTRAINT "signature_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "Plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "produc_options" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "produc_options_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "address" (
	"id" bigint NOT NULL,
	"delivery_address" varchar(255) NOT NULL,
	"zip_code" varchar(255) NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "signature" ADD CONSTRAINT "signature_fk0" FOREIGN KEY ("plans_id") REFERENCES "plans"("id");
ALTER TABLE "signature" ADD CONSTRAINT "signature_fk1" FOREIGN KEY ("product_options_id") REFERENCES "produc_options"("id");
ALTER TABLE "signature" ADD CONSTRAINT "signature_fk2" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "signature" ADD CONSTRAINT "signature_fk3" FOREIGN KEY ("address_id") REFERENCES "address"("id");








