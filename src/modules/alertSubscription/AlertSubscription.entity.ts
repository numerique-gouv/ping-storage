import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Monitor } from '../monitor';

@Entity()
@Unique('People can only subscribe once to monitors', ['email', 'monitor'])
export class AlertSubscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @ManyToOne(() => Monitor, { onDelete: 'CASCADE', nullable: false })
    monitor: Monitor;
}
