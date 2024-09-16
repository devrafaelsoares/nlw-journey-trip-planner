import { Trip, TripProps } from '@domain/entities';
import { EntityRepository } from './entity-repository';

export interface TripRepository extends EntityRepository<Trip, TripProps> {}
