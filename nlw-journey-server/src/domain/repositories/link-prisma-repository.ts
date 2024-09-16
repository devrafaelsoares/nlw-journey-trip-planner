import { prisma } from '@infra/database/prisma/config';
import { Link, LinkProps } from '@domain/entities';
import { LinkRepository } from '@domain/protocols/repositories/link-repository';
import { LinkMapper } from '@domain/mappers/link';

export class LinkPrismaRepository implements LinkRepository {
    async findByUrl(url: string): Promise<Link | null> {
        const foundLink = await prisma.link.findFirst({
            where: { url },
        });

        if (!foundLink) {
            return null;
        }

        return LinkMapper.toDomain(foundLink);
    }
    async findByTitle(title: string): Promise<Link | null> {
        const foundLink = await prisma.link.findFirst({
            where: { title },
        });

        if (!foundLink) {
            return null;
        }

        return LinkMapper.toDomain(foundLink);
    }

    async createAndTripConnect(data: Link, tripId: string): Promise<Link> {
        const { title, url } = data;

        const createdLink = await prisma.link.create({
            data: {
                url,
                title: title,
                trip: { connect: { id: tripId } },
            },
        });

        return LinkMapper.toDomain(createdLink);
    }
    async save(data: Link): Promise<void | Link> {
        const { url, title, id } = data;

        const updatedLink = await prisma.link.update({
            where: { id },
            data: {
                title,
                url,
            },
        });

        const link = LinkMapper.toDomain(updatedLink);

        return link;
    }
    async create(data: Link): Promise<Link> {
        throw new Error('Method not implemented.');
    }
    async findById(id: string): Promise<Link | null> {
        const foundLink = await prisma.link.findFirst({
            where: { id },
        });

        if (!foundLink) {
            return null;
        }

        return LinkMapper.toDomain(foundLink);
    }
    async find<K extends keyof LinkProps>(field: K, value: LinkProps[K]): Promise<Link[] | null> {
        const foundLinks = await prisma.link.findMany({
            where: { [field]: value },
        });

        if (!foundLinks) {
            return null;
        }

        return foundLinks.map(LinkMapper.toDomain);
    }
    async findAll(): Promise<Link[]> {
        const foundAllLinks = await prisma.link.findMany();

        return foundAllLinks.map(LinkMapper.toDomain);
    }
    async delete(id: string): Promise<void> {
        await prisma.link.delete({
            where: { id },
        });
    }
}
