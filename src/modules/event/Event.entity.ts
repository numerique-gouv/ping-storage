import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SystemPulse } from '../systemPulse';
import { EVENT_KINDS, eventKindType } from './types';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('enum', { enum: EVENT_KINDS })
    kind: eventKindType;

    @ManyToOne(() => SystemPulse, { onDelete: 'CASCADE', nullable: false })
    systemPulse: SystemPulse;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: string;
}
