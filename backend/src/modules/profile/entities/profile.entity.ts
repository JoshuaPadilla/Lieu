import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: true })
  city: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
