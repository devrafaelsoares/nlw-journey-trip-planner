import { LinkRepository } from '@domain/protocols/repositories';
import { Link, LinkProps } from '@domain/entities';

export class LinkInMemoryRepository implements LinkRepository {
    private readonly links: Link[] = [];
    private readonly tripLinks: Map<string, string[]> = new Map();

    async findByUrl(url: string): Promise<Link | null> {
        const foundLink = this.links.find(link => link.url === url);

        if (!foundLink) {
            return null;
        }

        return foundLink;
    }
    async findByTitle(title: string): Promise<Link | null> {
        const foundLink = this.links.find(link => link.title === title);

        if (!foundLink) {
            return null;
        }

        return foundLink;
    }

    async createAndTripConnect(data: Link, tripId: string): Promise<Link> {
        this.links.push(data);

        if (!this.tripLinks.has(tripId)) {
            this.tripLinks.set(tripId, []);
        }
        this.tripLinks.get(tripId)!.push(data.id);

        return data;
    }

    async save(link: Link): Promise<Link | void> {
        const tripFoundIndex = this.links.findIndex(item => item.id === link.id);

        if (tripFoundIndex >= 0) {
            this.links[tripFoundIndex] = link;
            return link;
        }
    }

    async create(link: Link): Promise<Link> {
        this.links.push(link);
        return link;
    }

    async findById(id: string): Promise<Link | null> {
        const foundLink = this.links.find(link => link.id === id);

        if (!foundLink) {
            return null;
        }

        return foundLink;
    }

    async find<K extends keyof LinkProps>(field: K, value: LinkProps[K]): Promise<Link[] | null> {
        const foundLinks = this.links.filter(link => link[field] === value);

        if (!foundLinks.length) {
            return null;
        }

        return foundLinks;
    }

    async findAll(): Promise<Link[]> {
        return this.links;
    }

    async delete(id: string): Promise<void> {
        const tripFoundIndex = this.links.findIndex(item => item.id === id);

        if (tripFoundIndex >= 0) {
            this.links.slice(tripFoundIndex);
        }
    }
}
