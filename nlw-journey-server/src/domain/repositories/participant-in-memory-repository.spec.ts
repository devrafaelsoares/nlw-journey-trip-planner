import { createParticipant } from '@domain/factories/participant';
import { ParticipantInMemoryRepository } from './participant-in-memory-repository';
import { Participant } from '@domain/entities';

describe('ParticipantInMemoryRepository', () => {
    it('should be able to save an participant', async () => {
        const participantInMemoryRepository = new ParticipantInMemoryRepository();

        const participant = createParticipant() as Participant;

        const savedParticipant = await participantInMemoryRepository.create(participant);
        const foundParticipants = await participantInMemoryRepository.findAll();

        expect(foundParticipants).toHaveLength(1);
        expect(foundParticipants[0]).toEqual(savedParticipant);
    });

    it('should be able to search all participants', async () => {
        const participantInMemoryRepository = new ParticipantInMemoryRepository();

        const participant1 = createParticipant({ name: 'Nome 01' }) as Participant;
        const participant2 = createParticipant({ name: 'Nome 02' }) as Participant;
        const participant3 = createParticipant({ name: 'Nome 03' }) as Participant;

        await participantInMemoryRepository.create(participant1);
        await participantInMemoryRepository.create(participant2);
        await participantInMemoryRepository.create(participant3);

        const foundParticipants = await participantInMemoryRepository.findAll();

        expect(foundParticipants).toHaveLength(3);
    });

    it('should be able to search participant by id', async () => {
        const participantInMemoryRepository = new ParticipantInMemoryRepository();

        const participant = createParticipant({ name: 'Nome 01' }) as Participant;

        const savedParticipant = await participantInMemoryRepository.create(participant);

        const id = savedParticipant.id;

        const foundParticipant = await participantInMemoryRepository.findById(id);

        expect(foundParticipant).not.toBeNull();
        expect(foundParticipant).toBe(savedParticipant);
    });

    it('should be able to search participant by some attribute', async () => {
        const participantInMemoryRepository = new ParticipantInMemoryRepository();

        const participant = createParticipant({ name: 'Nome 01' }) as Participant;

        const savedParticipant = await participantInMemoryRepository.create(participant);

        const foundParticipant = await participantInMemoryRepository.find('name', 'Nome 01');

        expect(foundParticipant).not.toBeNull();
        expect(foundParticipant).toContainEqual(savedParticipant);
    });

    it('should be able to update an event', async () => {
        const participantInMemoryRepository = new ParticipantInMemoryRepository();

        const participant = createParticipant({ name: 'Nome 01' }) as Participant;

        const savedParticipant = await participantInMemoryRepository.create(participant);

        savedParticipant.name = 'Nome 01 (Alterado)';

        const savedUpdatedParticipant = await participantInMemoryRepository.save(savedParticipant);

        expect(savedUpdatedParticipant).toHaveProperty('name', 'Nome 01 (Alterado)');
    });

    it('should be able to delete an event', async () => {
        const participantInMemoryRepository = new ParticipantInMemoryRepository();

        const event = createParticipant({ name: 'Nome 01' }) as Participant;

        const savedParticipant = await participantInMemoryRepository.create(event);

        await participantInMemoryRepository.delete(savedParticipant.id);

        const foundParticipants = await participantInMemoryRepository.findAll();

        expect(foundParticipants).not.toContain([]);
    });
});
