CREATE TABLE `email_captures` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submissionId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`firstName` varchar(128),
	`archetypeId` varchar(32) NOT NULL,
	`emailSent` enum('pending','sent','failed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_captures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`answers` json NOT NULL,
	`primaryArchetype` varchar(32) NOT NULL,
	`secondaryArchetype` varchar(32),
	`scores` json NOT NULL,
	`percentages` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_submissions_id` PRIMARY KEY(`id`)
);
