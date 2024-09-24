import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../client';

@Entity()
export class Ping {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, { onDelete: 'CASCADE', nullable: false })
    client: Client;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: string;
}
