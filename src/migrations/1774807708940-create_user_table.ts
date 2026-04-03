import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1774807708940 implements MigrationInterface {
    name = 'CreateUserTable1774807708940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "status",
                        type: "varchar",
                        default: "'active'",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
