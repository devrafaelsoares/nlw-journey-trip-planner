import { ActivityRepository } from '@domain/protocols/repositories';
import { Activity, ActivityProps } from '@domain/entities';

export class ActivityInMemoryRepository implements ActivityRepository {
    private readonly activities: Activity[] = [];
    private readonly tripActivities: Map<string, string[]> = new Map();

    async createAndTripConnect(data: Activity, tripId: string): Promise<Activity> {
        this.activities.push(data);

        if (!this.tripActivities.has(tripId)) {
            this.tripActivities.set(tripId, []);
        }

        this.tripActivities.get(tripId)!.push(data.id);

        return data;
    }
    async findByTitleAndOccursAt(title: string, occursAt: Date): Promise<Activity | null> {
        const foundActivity = this.activities.find(
            activity => activity.title === title && activity.occursAt === occursAt
        );

        if (!foundActivity) {
            return null;
        }

        return foundActivity;
    }

    async save(activity: Activity): Promise<Activity | void> {
        const tripFoundIndex = this.activities.findIndex(item => item.id === activity.id);

        if (tripFoundIndex >= 0) {
            this.activities[tripFoundIndex] = activity;
            return activity;
        }
    }

    async create(activity: Activity): Promise<Activity> {
        this.activities.push(activity);
        return activity;
    }

    async createMany(activities: Activity[]): Promise<Activity[]> {
        this.activities.push(...activities);
        return activities;
    }

    async findById(id: string): Promise<Activity | null> {
        const foundActivity = this.activities.find(activity => activity.id === id);

        if (!foundActivity) {
            return null;
        }

        return foundActivity;
    }

    async find<K extends keyof ActivityProps>(field: K, value: ActivityProps[K]): Promise<Activity[] | null> {
        const foundActivitys = this.activities.filter(activity => activity[field] === value);

        if (!foundActivitys.length) {
            return null;
        }

        return foundActivitys;
    }

    async findAll(): Promise<Activity[]> {
        return this.activities;
    }

    async findWithPagination(take: number, skip: number = 0): Promise<Activity[]> {
        return skip ? this.activities.slice(skip - 1).slice(0, take) : this.activities.slice(0, take);
    }

    async delete(id: string): Promise<void> {
        const tripFoundIndex = this.activities.findIndex(item => item.id === id);

        if (tripFoundIndex >= 0) {
            this.activities.slice(tripFoundIndex);
        }
    }
}
