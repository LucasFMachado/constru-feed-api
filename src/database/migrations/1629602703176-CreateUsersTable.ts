import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1629602703176 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'blocked',
            type: 'boolean',
            isNullable: false,
            default: false
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true
          },
          {
            name: 'admin',
            type: 'boolean',
            isNullable: false,
            default: false
          },
          {
            name: 'deleted',
            type: 'boolean',
            isNullable: false,
            default: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
