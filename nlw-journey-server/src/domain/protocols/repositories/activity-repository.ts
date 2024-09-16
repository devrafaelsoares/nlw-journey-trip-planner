import { Activity, ActivityProps } from '@domain/entities';
import { EntityRepository } from './entity-repository';

export interface ActivityRepository extends EntityRepository<Activity, ActivityProps> {
    createAndTripConnect(data: Activity, tripId: string): Promise<Activity>;
    findByTitleAndOccursAt(title: string, occursAt: Date): Promise<Activity | null>;
    findWithPagination(take: number, skip?: number): Promise<Activity[]>;
    createMany(activities: Activity[]): Promise<Activity[]>;
}
