import { Link, LinkProps } from '@domain/entities';
import { EntityRepository } from './entity-repository';

export interface LinkRepository extends EntityRepository<Link, LinkProps> {
    findByUrl(url: string): Promise<Link | null>;
    findByTitle(title: string): Promise<Link | null>;
    createAndTripConnect(data: Link, tripId: string): Promise<Link>;
}
