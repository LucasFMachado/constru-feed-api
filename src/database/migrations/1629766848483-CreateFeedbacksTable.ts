import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFeedbacksTable1629766848483 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedbacks',
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
            name: 'sender_id',
            type: 'int',
            isNullable: false
          },
          {
            name: 'receiver_id',
            type: 'int',
            isNullable: false
          },
          {
            name: 'tag_id',
            type: 'int',
            isNullable: false
          },
          {
            name: 'message',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'anonymous',
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
          }
        ],
        foreignKeys: [
          {
            name: 'fk_feedbacks_tag_id',
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            columnNames: ['tag_id']
          },
          {
            name: 'fk_feedbacks_sender_id',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['sender_id']
          },
          {
            name: 'fk_feedbacks_receiver_id',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['receiver_id']
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('feedbacks')
  }
}
