import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Monitor } from '../monitor';
import { EVENT_KINDS, eventKindType, genericEvent } from '../genericEvent/types';

@Entity()
export class MonitorEvent implements genericEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('enum', { enum: EVENT_KINDS })
    kind: eventKindType;

    @ManyToOne(() => Monitor, { onDelete: 'CASCADE', nullable: false })
    monitor: Monitor;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;
}
