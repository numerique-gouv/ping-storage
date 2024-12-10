import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user';

@Entity()
export class SystemPulse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ default: 1 })
    frequency: number;

    @Column({ default: 1 })
    gracePeriod: number;

    @Column({ type: 'timestamp', nullable: true })
    lastPingedAt: string | null;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
    user: User;
}
