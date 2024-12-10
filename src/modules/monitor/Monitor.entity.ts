import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user';

@Entity()
export class Monitor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    displayName: string;

    @Column()
    url: string;

    @Column({ default: 10 })
    frequency: number;

    @Column({ type: 'timestamp', nullable: true })
    lastSuccessfulCall: string | null;

    @Column({ type: 'timestamp', nullable: true })
    lastCall: string | null;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
    user: User;
}
