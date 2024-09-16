import { createLink } from '@domain/factories/link';
import { LinkInMemoryRepository } from './link-in-memory-repository';
import { Link } from '@domain/entities';

describe('LinkInMemoryRepository', () => {
    it('should be able to save an link', async () => {
        const linkInMemoryRepository = new LinkInMemoryRepository();

        const link = createLink() as Link;

        const savedLink = await linkInMemoryRepository.create(link);
        const foundLinks = await linkInMemoryRepository.findAll();

        expect(foundLinks).toHaveLength(1);
        expect(foundLinks[0]).toEqual(savedLink);
    });

    it('should be able to search all links', async () => {
        const linkInMemoryRepository = new LinkInMemoryRepository();

        const link1 = createLink({ title: 'Título 01' }) as Link;
        const link2 = createLink({ title: 'Título 02' }) as Link;
        const link3 = createLink({ title: 'Título 03' }) as Link;

        await linkInMemoryRepository.create(link1);
        await linkInMemoryRepository.create(link2);
        await linkInMemoryRepository.create(link3);

        const foundLinks = await linkInMemoryRepository.findAll();

        expect(foundLinks).toHaveLength(3);
    });

    it('should be able to search link by id', async () => {
        const linkInMemoryRepository = new LinkInMemoryRepository();

        const link = createLink({ title: 'Título 01' }) as Link;

        const savedLink = await linkInMemoryRepository.create(link);

        const id = savedLink.id;

        const foundLink = await linkInMemoryRepository.findById(id);

        expect(foundLink).not.toBeNull();
        expect(foundLink).toBe(savedLink);
    });

    it('should be able to search link by some attribute', async () => {
        const linkInMemoryRepository = new LinkInMemoryRepository();

        const link = createLink({ title: 'Título 01' }) as Link;

        const savedLink = await linkInMemoryRepository.create(link);

        const foundLink = await linkInMemoryRepository.find('title', 'Título 01');

        expect(foundLink).not.toBeNull();
        expect(foundLink).toContainEqual(savedLink);
    });

    it('should be able to update an event', async () => {
        const linkInMemoryRepository = new LinkInMemoryRepository();

        const link = createLink({ title: 'Título 01' }) as Link;

        const savedLink = await linkInMemoryRepository.create(link);

        savedLink.title = 'Título 01 (Alterado)';

        const savedUpdatedLink = await linkInMemoryRepository.save(savedLink);

        expect(savedUpdatedLink).toHaveProperty('title', 'Título 01 (Alterado)');
    });

    it('should be able to delete an event', async () => {
        const linkInMemoryRepository = new LinkInMemoryRepository();

        const event = createLink({ title: 'Título 01' }) as Link;

        const savedLink = await linkInMemoryRepository.create(event);

        await linkInMemoryRepository.delete(savedLink.id);

        const foundLinks = await linkInMemoryRepository.findAll();

        expect(foundLinks).not.toContain([]);
    });
});
