import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @CreateDateColumn({
    type: 'datetime',
    // type: 'date',s
    comment: '创建时间',
    name: 'birthdate'
})
  birthdate: Date;

  @Column()
  is_active: number;
}
