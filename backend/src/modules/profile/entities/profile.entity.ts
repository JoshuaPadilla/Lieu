import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryColumn('uuid')
  id: string;

  @Column({})
  userName: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
