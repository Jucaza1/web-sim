import { Prisma } from "@prisma/client";
import { StoreErrorCode } from "./result";

export function prismaCatchToStoreError(e: unknown): StoreErrorCode {
    if (e instanceof Prisma.PrismaClientKnownRequestError
        // || e instanceof Prisma.PrismaClientUnknownRequestError
        // || e instanceof Prisma.PrismaClientRustPanicError
        // || e instanceof Prisma.PrismaClientInitializationError
        // || e instanceof Prisma.PrismaClientValidationError
        ) {
        // Known errors
        switch (e.code) {
            case 'P1000':
                return StoreErrorCode.invalidCredentials
            case 'P1001':
                return StoreErrorCode.connectionFault
            case 'P1002':
                return StoreErrorCode.connectionFault
            case 'P1003':
                return StoreErrorCode.connectionFault
            case 'P1008':
                return StoreErrorCode.connectionFault
            case 'P1009':
                return StoreErrorCode.connectionFault
            case 'P1010':
                return StoreErrorCode.invalidCredentials
            case 'P1011':
                return StoreErrorCode.connectionFault
            case 'P1012':
                return StoreErrorCode.versionError
            case 'P1013':
                return StoreErrorCode.connectionFault
            case 'P1014':
                return StoreErrorCode.invalidInput
            case 'P1015':
                return StoreErrorCode.versionError
            case 'P1016':
                return StoreErrorCode.invalidInput
            case 'P1017':
                return StoreErrorCode.connectionFault
            case 'P2000':
                return StoreErrorCode.invalidInput
            case 'P2001':
                return StoreErrorCode.invalidInput
            case 'P2002':
                return StoreErrorCode.unique
            case 'P2003':
                return StoreErrorCode.invalidInput
            case 'P2004':
                return StoreErrorCode.invalidInput
            case 'P2005':
                return StoreErrorCode.inconsistentState
            case 'P2006':
                return StoreErrorCode.invalidInput
            case 'P2007':
                return StoreErrorCode.invalidInput
            case 'P2008':
                return StoreErrorCode.invalidInput
            case 'P2009':
                return StoreErrorCode.invalidInput
            case 'P2010':
                return StoreErrorCode.invalidInput
            case 'P2011':
                return StoreErrorCode.invalidInput
            case 'P2012':
                return StoreErrorCode.invalidInput
            case 'P2013':
                return StoreErrorCode.invalidInput
            case 'P2014':
                return StoreErrorCode.invalidInput
            case 'P2015':
                return StoreErrorCode.notFound
            case 'P2016':
                return StoreErrorCode.invalidInput
            case 'P2017':
                return StoreErrorCode.invalidInput
            case 'P2018':
                return StoreErrorCode.invalidInput
            case 'P2019':
                return StoreErrorCode.invalidInput
            case 'P2020':
                return StoreErrorCode.invalidInput
            case 'P2021':
                return StoreErrorCode.invalidInput
            case 'P2022':
                return StoreErrorCode.invalidInput
            case 'P2023':
                return StoreErrorCode.inconsistentState
            case 'P2024':
                return StoreErrorCode.connectionFault
            case 'P2025':
                return StoreErrorCode.invalidInput
            case 'P2026':
                return StoreErrorCode.versionError
            case 'P2027':
                return StoreErrorCode.unknown
            case 'P2028':
                return StoreErrorCode.engineFault
            case 'P2029':
                return StoreErrorCode.invalidInput
            case 'P2030':
                return StoreErrorCode.invalidInput
            case 'P2031':
                return StoreErrorCode.versionError
            case 'P2033':
                return StoreErrorCode.invalidInput
            case 'P2034':
                return StoreErrorCode.unknown
            case 'P2035':
                return StoreErrorCode.inconsistentState
            case 'P2036':
                return StoreErrorCode.connectionFault
            case 'P2037':
                return StoreErrorCode.connectionFault
            case 'P3000':
                return StoreErrorCode.migrateError
            case 'P3001':
                return StoreErrorCode.migrateError
            case 'P3002':
                return StoreErrorCode.migrateError
            case 'P3003':
                return StoreErrorCode.migrateError
            case 'P3004':
                return StoreErrorCode.migrateError
            case 'P3005':
                return StoreErrorCode.migrateError
            case 'P3006':
                return StoreErrorCode.migrateError
            case 'P3007':
                return StoreErrorCode.versionError
            case 'P3008':
                return StoreErrorCode.migrateError
            case 'P3009':
                return StoreErrorCode.migrateError
            case 'P3010':
                return StoreErrorCode.migrateError
            case 'P3011':
                return StoreErrorCode.migrateError
            case 'P3012':
                return StoreErrorCode.migrateError
            case 'P3013':
                return StoreErrorCode.versionError
            case 'P3014':
                return StoreErrorCode.migrateError
            case 'P3015':
                return StoreErrorCode.migrateError
            case 'P3016':
                return StoreErrorCode.migrateError
            case 'P3017':
                return StoreErrorCode.migrateError
            case 'P3018':
                return StoreErrorCode.migrateError
            case 'P3019':
                return StoreErrorCode.migrateError
            case 'P3020':
                return StoreErrorCode.migrateError
            case 'P3021':
                return StoreErrorCode.migrateError
            case 'P3022':
                return StoreErrorCode.migrateError
            case 'P4000':
                return StoreErrorCode.unknown
            case 'P4001':
                return StoreErrorCode.migrateError
            case 'P4002':
                return StoreErrorCode.unknown
            case 'P5011':
                return StoreErrorCode.connectionFault
            case 'P6000':
                return StoreErrorCode.unknown
            case 'P6001':
                return StoreErrorCode.connectionFault
            case 'P6002':
                return StoreErrorCode.connectionFault
            case 'P6003':
                return StoreErrorCode.unknown
            case 'P6004':
                return StoreErrorCode.connectionFault
            case 'P6005':
                return StoreErrorCode.invalidInput
            case 'P6006':
                return StoreErrorCode.versionError
            case 'P6008':
                return StoreErrorCode.connectionFault
            case 'P6009':
                return StoreErrorCode.connectionFault
            case 'P6010':
                return StoreErrorCode.unknown
            default:
                return StoreErrorCode.unknown
        }
    }
    return StoreErrorCode.unknown
}

// P3000
// "Failed to create database: {database_error}"
//
// P3001
// "Migration possible with destructive changes and possible data loss: {migration_engine_destructive_details}"
//
// P3002
// "The attempted migration was rolled back: {database_error}"
//
// P3003
// "The format of migrations changed, the saved migrations are no longer valid. To solve this problem, please follow the steps at: https://pris.ly/d/migrate"
//
// P3004
// "The {database_name} database is a system database, it should not be altered with prisma migrate. Please connect to another database."
//
// P3005
// "The database schema is not empty. Read more about how to baseline an existing production database: https://pris.ly/d/migrate-baseline"
//
// P3006
// "Migration {migration_name} failed to apply cleanly to the shadow database.
// {error_code}Error:
// {inner_error}"
//
// P3007
// "Some of the requested preview features are not yet allowed in schema engine. Please remove them from your data model before using migrations. (blocked: {list_of_blocked_features})"
//
// P3008
// "The migration {migration_name} is already recorded as applied in the database."
//
// P3009
// "migrate found failed migrations in the target database, new migrations will not be applied. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve
// {details}"
//
// P3010
// "The name of the migration is too long. It must not be longer than 200 characters (bytes)."
//
// P3011
// "Migration {migration_name} cannot be rolled back because it was never applied to the database. Hint: did you pass in the whole migration name? (example: "20201207184859_initial_migration")"
//
// P3012
// "Migration {migration_name} cannot be rolled back because it is not in a failed state."
//
// P3013
// "Datasource provider arrays are no longer supported in migrate. Please change your datasource to use a single provider. Read more at https://pris.ly/multi-provider-deprecation"
//
// P3014
// "Prisma Migrate could not create the shadow database. Please make sure the database user has permission to create databases. Read more about the shadow database (and workarounds) at https://pris.ly/d/migrate-shadow.
//
// Original error: {error_code}
// {inner_error}"
//
// P3015
// "Could not find the migration file at {migration_file_path}. Please delete the directory or restore the migration file."
//
// P3016
// "The fallback method for database resets failed, meaning Migrate could not clean up the database entirely. Original error: {error_code}
// {inner_error}"
//
// P3017
// "The migration {migration_name} could not be found. Please make sure that the migration exists, and that you included the whole name of the directory. (example: "20201207184859_initial_migration")"
//
// P3018
// "A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve
//
// Migration name: {migration_name}
//
// Database error code: {database_error_code}
//
// Database error:
// {database_error} "
//
// P3019
// "The datasource provider {provider} specified in your schema does not match the one specified in the migration_lock.toml, {expected_provider}. Please remove your current migration directory and start a new migration history with prisma migrate dev. Read more: https://pris.ly/d/migrate-provider-switch"
//
// P3020
// "The automatic creation of shadow databases is disabled on Azure SQL. Please set up a shadow database using the shadowDatabaseUrl datasource attribute.
// Read the docs page for more details: https://pris.ly/d/migrate-shadow"
//
// P3021
// "Foreign keys cannot be created on this database. Learn more how to handle this: https://pris.ly/d/migrate-no-foreign-keys"
//
// P3022
// "Direct execution of DDL (Data Definition Language) SQL statements is disabled on this database. Please read more here about how to handle this: https://pris.ly/d/migrate-no-direct-ddl"
//
// prisma db pull
// P4000
// "Introspection operation failed to produce a schema file: {introspection_error}"
//
// P4001
// "The introspected database was empty."
//
// P4002
// "The schema of the introspected database was inconsistent: {explanation}"
//
// Prisma Accelerate
// Prisma Accelerate-related errors start with P6xxx except for P5011.
//
// P6000 (ServerError)
// Generic error to catch all other errors.
//
// P6001 (InvalidDataSource)
// The URL is malformed; for instance, it does not use the prisma:// protocol.
//
// P6002 (Unauthorized)
// The API Key in the connection string is invalid.
//
// P6003 (PlanLimitReached)
// The included usage of the current plan has been exceeded. This can only occur on the free plan.
//
// P6004 (QueryTimeout)
// The global timeout of Accelerate has been exceeded. You can find the limit here.
//
// Also see the troubleshooting guide for more information.
//
// P6005 (InvalidParameters)
// The user supplied invalid parameters. Currently only relevant for transaction methods. For example, setting a timeout that is too high. You can find the limit here.
//
// P6006 (VersionNotSupported)
// The chosen Prisma version is not compatible with Accelerate. This may occur when a user uses an unstable development version that we occasionally prune.
//
// P6008 (ConnectionError|EngineStartError)
// The engine failed to start. For example, it couldn't establish a connection to the database.
//
// Also see the troubleshooting guide for more information.
//
// P6009 (ResponseSizeLimitExceeded)
// The global response size limit of Accelerate has been exceeded. You can find the limit here.
//
// Also see the troubleshooting guide for more information.
//
// P6010 (ProjectDisabledError)
// Your accelerate project is disabled. Please enable it again to use it.
//
// P5011 (Too Many Requests)
// This error indicates that the request volume exceeded. Implement a back-off strategy and try again later. For assistance with expected high workloads, contact support.
//
//
