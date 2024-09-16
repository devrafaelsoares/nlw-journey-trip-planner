import { TripResponseProps } from '@presentation/adpaters/trip';
import { TripRepository } from '@domain/protocols/repositories';
import { TripMapper } from '@domain/mappers/trip';

export class FindAllTripsUseCase {
    constructor(private tripRepository: TripRepository) {}

    async execute(): Promise<TripResponseProps[]> {
        const findAllTrips = await this.tripRepository.findAll();
        return findAllTrips.map(TripMapper.toHttpResponse);
    }
}
