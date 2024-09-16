import { ActivityRepository } from '@domain/protocols/repositories';
import { Activity, ActivityProps } from '@domain/entities';
import { prisma } from '@infra/database/prisma/config';
import { ActivityMapper } from '@domain/mappers/activity';

export class ActivityPrismaRepository implements ActivityRepository {
    async createAndTripConnect(data: Activity, tripId: string): Promise<Activity> {
        const { occursAt, title } = data;

        const createdActivity = await prisma.activity.create({
            data: {
                occurs_at: occursAt,
                title: title,
                trip: { connect: { id: tripId } },
            },
        });

        return ActivityMapper.toDomain(createdActivity);
    }
    async findByTitleAndOccursAt(title: string, occursAt: Date): Promise<Activity | null> {
        const foundActivity = await prisma.activity.findFirst({
            where: {
                title,
                occurs_at: new Date(occursAt),
            },
        });

        if (!foundActivity) {
            return null;
        }

        return ActivityMapper.toDomain(foundActivity);
    }

    async save(data: Activity): Promise<void | Activity> {
        const { occursAt, title, id } = data;

        const updatedActivity = await prisma.activity.update({
            where: { id },
            data: {
                title: title,
                occurs_at: occursAt,
            },
        });

        const activity = ActivityMapper.toDomain(updatedActivity);

        return activity;
    }
    async create(data: Activity): Promise<Activity> {
        throw new Error('Method not implemented.');
    }

    async createMany(data: Activity[]): Promise<Activity[]> {
        throw new Error('Method not implemented.');
    }

    async findById(id: string): Promise<Activity | null> {
        const foundActivity = await prisma.activity.findUnique({
            where: { id },
        });

        if (!foundActivity) {
            return null;
        }

        return ActivityMapper.toDomain(foundActivity);
    }

    async find<K extends keyof ActivityProps>(field: K, value: ActivityProps[K]): Promise<Activity[] | null> {
        const foundActivity = await prisma.activity.findMany({
            where: {
                [field]: value,
            },
        });

        if (!foundActivity.length) {
            return null;
        }

        return foundActivity.map(ActivityMapper.toDomain);
    }
    async findAll(): Promise<Activity[]> {
        const foundAllActivies = await prisma.activity.findMany();

        return foundAllActivies.map(ActivityMapper.toDomain);
    }

    async findWithPagination(take: number, skip: number = 0): Promise<Activity[]> {
        const foundAllActivies = await prisma.activity.findMany({
            take,
            skip,
        });

        return foundAllActivies.map(ActivityMapper.toDomain);
    }

    async delete(id: string): Promise<void> {
        await prisma.activity.delete({
            where: { id },
        });
    }
}
