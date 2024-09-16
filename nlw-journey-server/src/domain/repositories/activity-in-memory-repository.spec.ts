import { createActivity } from '@domain/factories/activity';
import { ActivityInMemoryRepository } from './activity-in-memory-repository';
import { Activity } from '@domain/entities';

describe('ActivityInMemoryRepository', () => {
    it('should be able to save an activity', async () => {
        const activityInMemoryRepository = new ActivityInMemoryRepository();

        const activity = createActivity() as Activity;

        const savedActivity = await activityInMemoryRepository.create(activity);
        const foundActivities = await activityInMemoryRepository.findAll();

        expect(foundActivities).toHaveLength(1);
        expect(foundActivities[0]).toEqual(savedActivity);
    });

    it('should be able to search all activitys', async () => {
        const activityInMemoryRepository = new ActivityInMemoryRepository();

        const activity1 = createActivity({ title: 'Título 01' }) as Activity;
        const activity2 = createActivity({ title: 'Título 02' }) as Activity;
        const activity3 = createActivity({ title: 'Título 03' }) as Activity;

        await activityInMemoryRepository.create(activity1);
        await activityInMemoryRepository.create(activity2);
        await activityInMemoryRepository.create(activity3);

        const foundActivities = await activityInMemoryRepository.findAll();

        expect(foundActivities).toHaveLength(3);
    });

    it('should be able to search the first 10 items', async () => {
        const activityInMemoryRepository = new ActivityInMemoryRepository();
        const activities: Activity[] = [];
        for (let index = 0; index <= 49; index++) {
            const activity = createActivity({ title: `Título ${index + 1}` }) as Activity;
            activities.push(activity);
        }

        await activityInMemoryRepository.createMany(activities);

        const foundActivities = await activityInMemoryRepository.findWithPagination(10);

        expect(foundActivities).toHaveLength(10);
    });

    it('should be able to skip the first 20 items display search the first 20 items', async () => {
        const activityInMemoryRepository = new ActivityInMemoryRepository();
        const activities: Activity[] = [];
        for (let index = 0; index <= 49; index++) {
            const activity = createActivity({ title: `Título ${index + 1}` }) as Activity;
            activities.push(activity);
        }

        await activityInMemoryRepository.createMany(activities);

        const foundActivities = await activityInMemoryRepository.findWithPagination(20, 30);

        expect(foundActivities).toHaveLength(20);
    });

    it('should be able to search activity by id', async () => {
        const activityInMemoryRepository = new ActivityInMemoryRepository();

        const activity = createActivity({ title: 'Título 01' }) as Activity;

        const savedActivity = await activityInMemoryRepository.create(activity);

        const id = savedActivity.id;

        const foundActivity = await activityInMemoryRepository.findById(id);

        expect(foundActivity).not.toBeNull();
        expect(foundActivity).toBe(savedActivity);
    });

    it('should be able to search activity by some attribute', async () => {
        const activityInMemoryRepository = new ActivityInMemoryRepository();

        const activity = createActivity({ title: 'Título 01' }) as Activity;

        const savedActivity = await activityInMemoryRepository.create(activity);

        const foundActivity = await activityInMemoryRepository.find('title', 'Título 01');

        expect(foundActivity).not.toBeNull();
        expect(foundActivity).toContainEqual(savedActivity);
    });

    it('should be able to update an event', async () => {
        const activityInMemoryRepository = new ActivityInMemoryRepository();

        const activity = createActivity({ title: 'Título 01' }) as Activity;

        const savedActivity = await activityInMemoryRepository.create(activity);

        savedActivity.title = 'Título 01 (Alterado)';

        const savedUpdatedActivity = await activityInMemoryRepository.save(savedActivity);

        expect(savedUpdatedActivity).toHaveProperty('title', 'Título 01 (Alterado)');
    });

    it('should be able to delete an event', async () => {
        const activityInMemoryRepository = new ActivityInMemoryRepository();

        const event = createActivity({ title: 'Título 01' }) as Activity;

        const savedActivity = await activityInMemoryRepository.create(event);

        await activityInMemoryRepository.delete(savedActivity.id);

        const foundActivities = await activityInMemoryRepository.findAll();

        expect(foundActivities).not.toContain([]);
    });
});
