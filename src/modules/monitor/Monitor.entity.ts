import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user';
import { MONITOR_KINDS, monitorKindType } from './constants';

@Entity()
export class Monitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('enum', { enum: MONITOR_KINDS, default: 'app' })
    kind: monitorKindType;

    @Column()
    name: string;

    @Column()
    displayName: string;

    @Column({ nullable: true })
    url?: string;

    @Column({ default: 10 })
    frequency: number;

    @Column({ default: 1 })
    gracePeriod: number;

    @Column({ type: 'timestamp', nullable: true })
    lastSuccessfulCall: string | null;

    @Column({ type: 'timestamp', nullable: true })
    lastPingedAt: string | null;

    @Column({ type: 'timestamp', nullable: true })
    lastCall: string | null;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
    user: User;
}
