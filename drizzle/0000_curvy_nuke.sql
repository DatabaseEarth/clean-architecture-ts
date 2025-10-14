CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_by" uuid,
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_by" uuid,
	"deleted_at" timestamp with time zone,
	"email" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"password" varchar(500) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	CONSTRAINT "email_phone_unique" UNIQUE("email","phone")
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_by" uuid,
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_by" uuid,
	"deleted_at" timestamp with time zone,
	"user_id" uuid NOT NULL,
	"token" varchar(500) NOT NULL,
	"session_id" uuid NOT NULL,
	"device_info" varchar(255),
	"ip_address" varchar(50)
);
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;