import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../client';
import { EVENT_KINDS, eventKindType } from './types';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('enum', { enum: EVENT_KINDS })
    kind: eventKindType;

    @ManyToOne(() => Client, { onDelete: 'CASCADE', nullable: false })
    client: Client;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;
}
