import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
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
}
