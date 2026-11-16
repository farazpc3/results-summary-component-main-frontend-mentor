#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/98873fb8d1644659194ef9306d82f5e92ec57b13ff6977ede17995e597176868/contract';
import endContract from '../../snapshots/98873fb8d1644659194ef9306d82f5e92ec57b13ff6977ede17995e597176868/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a62d15a094e80be7b342d75e0538935972b9699c76dabb5339940dd50d17a889/contract';
import startContract from '../../snapshots/a62d15a094e80be7b342d75e0538935972b9699c76dabb5339940dd50d17a889/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropDefault({ schema: 'public', table: 'User', column: 'id' }),
      this.createTable({
        schema: 'public',
        table: 'CategoryScore',
        columns: [
          col('categoryName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('iconName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('maxScore', 'int4', {
            notNull: true,
            default: lit(100),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('score', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('testAttemptId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'TestAttempt',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('overallScore', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('percentile', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('statusLabel', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('createdAt', 'timestamptz(3)', {
          notNull: true,
          default: fn(sql`now()`),
          codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
        }),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'User',
        column: 'id',
        type: 'text',
        operationClass: 'widening',
      }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'User',
        column: 'updatedAt',
        type: 'timestamptz(3)',
        temporaryDefault: sql`'epoch'`,
      }),
      this.addUnique({
        schema: 'public',
        table: 'CategoryScore',
        constraint: 'CategoryScore_testAttemptId_categoryName_key',
        columns: ['testAttemptId', 'categoryName'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'CategoryScore',
        index: 'CategoryScore_testAttemptId_idx_aa63b252',
        columns: ['testAttemptId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'TestAttempt',
        index: 'TestAttempt_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'CategoryScore',
        foreignKey: {
          name: 'CategoryScore_testAttemptId_fkey',
          columns: ['testAttemptId'],
          references: { schema: 'public', table: 'TestAttempt', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TestAttempt',
        foreignKey: {
          name: 'TestAttempt_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
