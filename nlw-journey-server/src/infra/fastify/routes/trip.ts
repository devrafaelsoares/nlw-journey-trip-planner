import { FastifyInstance } from 'fastify';
import { fastifyAdapterRoute } from '@presentation/adpaters';

import {
    CreateTripUseCase,
    ConfirmTripInviteUseCase,
    ConfirmTripUseCase,
    FindAllTripsUseCase,
    FindByIdTripUseCase,
    SendTripInviteUseCase,
    UpdateTripUseCase,
    RefuseTripInviteUseCase,
    RefuseTripUseCase,
} from '@domain/usecases/trip';

import {
    CreateActivityUseCase,
    FindAllActivitiesByTripUseCase,
    FindByIdActivityAndTripUseCase,
    UpdateActivityUseCase,
    DeleteActivityUseCase,
} from '@domain/usecases/activity';

import { SendingEmailTripCreate, SendingEmailTripInvite } from '@domain/usecases/email';

import {
    TripPrismaRepository,
    ParticipantPrismaRepository,
    ActivityPrismaRepository,
    LinkPrismaRepository,
} from '@domain/repositories';

import {
    CreateLinkUseCase,
    DeleteLinkUseCase,
    UpdateLinkUseCase,
    FindAllLinksByTripUseCase,
    FindByIdLinkAndTripUseCase,
} from '@domain/usecases/link';

import {
    SendTripInviteControllerFastify,
    CreateTripControllerFastify,
    FindAllTripsControllerFastify,
    UpdateTripControllerFastify,
    FindByIdTripControllerFastify,
    ConfirmTripInviteControllerFastify,
    ConfirmTripControllerFastify,
    RefuseTripInviteControllerFastify,
    RefuseTripControllerFastify,
} from '@infra/fastify/controllers/trip';

import {
    CreateLinkControllerFastify,
    DeleteLinkControllerFastify,
    FindAllLinksByTripControllerFastify,
    FindByIdLinkAndTripControllerFastify,
    UpdateLinkControllerFastify,
} from '@infra/fastify/controllers/link';

import {
    ActivityValidatorSimple,
    LinkValidatorSimple,
    ParticipantValidatorSimple,
    TripValidatorSimple,
} from '@domain/validators';

import {
    TripCreateSchema,
    TripGetAllSchema,
    TripFindByIdSchema,
    TripSendInviteSchema,
    TripUpdateSchema,
    TripAttendanceConfirmationSchema,
    TripConfirmationSchema,
    TripRefuseInviteSchema,
    TripRefuseSchema,
} from '@infra/fastify/schema/zod/trip';

import {
    TripActivityCreationSchema,
    TripActivityDeleteSchema,
    TripActivityFindAllSchema,
    TripActivityFindByIdAndTripSchema,
    TripActivityUpdateSchema,
} from '@infra/fastify/schema/zod/activity';

import {
    TripLinkCreateSchema,
    TripLinkDeleteSchema,
    TripLinkFindAllSchema,
    TripLinkFindByIdAndTripSchema,
    TripLinkUpdateSchema,
} from '@infra/fastify/schema/zod/link';

import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { NodemailerService } from '@infra/email/nodemailer';
import {
    DeleteActivityControllerFastify,
    CreateActivityControllerFastify,
    FindAllActivitiesByTripControllerFastify,
    FindByIdActivityAndTripControllerFastify,
    UpdateActivityControllerFastify,
} from '@infra/fastify/controllers/activity';

// Repositórios
const tripPrismaRepository = new TripPrismaRepository();
const activityPrismaRepository = new ActivityPrismaRepository();
const participantPrismaRepository = new ParticipantPrismaRepository();
const linkPrismaRepository = new LinkPrismaRepository();

// Validadores
const participantValidatorSimple = new ParticipantValidatorSimple();
const activityValidatorSimple = new ActivityValidatorSimple();
const linkValidatorSimple = new LinkValidatorSimple();
const tripValidatorSimple = new TripValidatorSimple();

// Serviço de Email
const nodemailerSerivce = new NodemailerService();
const sendingEmailTripCreate = new SendingEmailTripCreate(nodemailerSerivce);
const sendingEmailTripInvite = new SendingEmailTripInvite(nodemailerSerivce);

/** CREATE TRIP */
const createTripUseCase = new CreateTripUseCase(
    tripPrismaRepository,
    participantValidatorSimple,
    tripValidatorSimple,
    sendingEmailTripCreate,
    sendingEmailTripInvite
);
const createTripControllerFastify = new CreateTripControllerFastify(createTripUseCase);

/** UPDATE TRIP */
const updateTripUseCase = new UpdateTripUseCase(tripPrismaRepository);
const updateTripControllerFastify = new UpdateTripControllerFastify(updateTripUseCase);

/** FIND ALL TRIP */
const findAllTripsUseCase = new FindAllTripsUseCase(tripPrismaRepository);
const findAllTripsControllerFastify = new FindAllTripsControllerFastify(findAllTripsUseCase);

/** FIND BY ID TRIP */
const findByIdTripUseCase = new FindByIdTripUseCase(tripPrismaRepository);
const findByIdTripControllerFastify = new FindByIdTripControllerFastify(findByIdTripUseCase);

/** SEND TRIP INVITE */
const sendInviteUseCase = new SendTripInviteUseCase(
    tripPrismaRepository,
    participantPrismaRepository,
    participantValidatorSimple,
    sendingEmailTripInvite
);
const sendInviteControllerFastify = new SendTripInviteControllerFastify(sendInviteUseCase);

/** CONFIRM TRIP INVITE */
const confirmParticipantUseCase = new ConfirmTripInviteUseCase(tripPrismaRepository, participantPrismaRepository);
const confirmParticipantControllerFastify = new ConfirmTripInviteControllerFastify(confirmParticipantUseCase);

/** REFUSE TRIP INVITE */
const refuseTripInviteUseCase = new RefuseTripInviteUseCase(tripPrismaRepository, participantPrismaRepository);
const refuseTripInviteControllerFastify = new RefuseTripInviteControllerFastify(refuseTripInviteUseCase);

/** REFUSE TRIP */
const refuseTripUseCase = new RefuseTripUseCase(tripPrismaRepository);
const refuseTripControllerFastify = new RefuseTripControllerFastify(refuseTripUseCase);

/** CONFIRM TRIP */
const confirmTripUseCase = new ConfirmTripUseCase(tripPrismaRepository);
const confirmTripControllerFastify = new ConfirmTripControllerFastify(confirmTripUseCase);

/** CREATE ACTIVITY */
const createActivityUseCase = new CreateActivityUseCase(
    tripPrismaRepository,
    activityPrismaRepository,
    activityValidatorSimple
);
const createActivityControllerFastify = new CreateActivityControllerFastify(createActivityUseCase);

/** CREATE LINK */
const createLinkUseCase = new CreateLinkUseCase(tripPrismaRepository, linkPrismaRepository, linkValidatorSimple);
const createLinkControllerFastify = new CreateLinkControllerFastify(createLinkUseCase);

/** UPDATE LINK */
const updateLinkUseCase = new UpdateLinkUseCase(tripPrismaRepository, linkPrismaRepository, linkValidatorSimple);
const updateLinkControllerFastify = new UpdateLinkControllerFastify(updateLinkUseCase);

/** DELETE LINK */
const deleteLinkUseCase = new DeleteLinkUseCase(tripPrismaRepository, linkPrismaRepository);
const deleteLinkControllerFastify = new DeleteLinkControllerFastify(deleteLinkUseCase);

/** DELETE ACTIVITY */
const deleteActivityUseCase = new DeleteActivityUseCase(tripPrismaRepository, activityPrismaRepository);
const deleteActivityControllerFastify = new DeleteActivityControllerFastify(deleteActivityUseCase);

/** UPDATE ACTIVITY */
const updateActivityUseCase = new UpdateActivityUseCase(
    tripPrismaRepository,
    activityPrismaRepository,
    activityValidatorSimple
);
const updateActivityControllerFastify = new UpdateActivityControllerFastify(updateActivityUseCase);

/** FIND ALL BY TRIP (LINKS) */
const findAllLinksByTripUseCase = new FindAllLinksByTripUseCase(tripPrismaRepository);
const findAllLinksByTripControllerFastify = new FindAllLinksByTripControllerFastify(findAllLinksByTripUseCase);

/** FIND BY ID AND TRIP (LINK) */
const findByIdLinkAndTripUseCase = new FindByIdLinkAndTripUseCase(tripPrismaRepository);
const findByIdLinkAndTripControllerFastify = new FindByIdLinkAndTripControllerFastify(findByIdLinkAndTripUseCase);

/** FIND ALL BY TRIP (ACTIVITIES) */
const findAllActivitiesByTripUseCase = new FindAllActivitiesByTripUseCase(tripPrismaRepository);
const findAllActivitiesByTripControllerFastify = new FindAllActivitiesByTripControllerFastify(
    findAllActivitiesByTripUseCase
);

/** FIND BY ID AND TRIP (ACTIVITY) */
const findByIdActivityAndTripUseCase = new FindByIdActivityAndTripUseCase(tripPrismaRepository);
const findByIdActivityAndTripControllerFastify = new FindByIdActivityAndTripControllerFastify(
    findByIdActivityAndTripUseCase
);

export default async function routesFastify(fastify: FastifyInstance) {
    fastify
        .withTypeProvider<ZodTypeProvider>()

        // Trips Routes
        .post('/trips', { schema: TripCreateSchema }, fastifyAdapterRoute(createTripControllerFastify))
        .get('/trips', { schema: TripGetAllSchema }, fastifyAdapterRoute(findAllTripsControllerFastify))
        .get('/trips/:id', { schema: TripFindByIdSchema }, fastifyAdapterRoute(findByIdTripControllerFastify))
        .put('/trips/:id', { schema: TripUpdateSchema }, fastifyAdapterRoute(updateTripControllerFastify))
        .post('/trips/:id/invites', { schema: TripSendInviteSchema }, fastifyAdapterRoute(sendInviteControllerFastify))
        .post(
            '/trips/:tripId/participants/:participantId/confirm',
            { schema: TripAttendanceConfirmationSchema },
            fastifyAdapterRoute(confirmParticipantControllerFastify)
        )
        .get(
            '/trips/:tripId/participants/:participantId/refuse',
            { schema: TripRefuseInviteSchema },
            fastifyAdapterRoute(refuseTripInviteControllerFastify)
        )
        .get(
            '/trips/:id/confirm',
            { schema: TripConfirmationSchema },
            fastifyAdapterRoute(confirmTripControllerFastify)
        )
        .get('/trips/:id/refuse', { schema: TripRefuseSchema }, fastifyAdapterRoute(refuseTripControllerFastify))

        // Activity Routes
        .post(
            '/trips/:id/activities',
            { schema: TripActivityCreationSchema },
            fastifyAdapterRoute(createActivityControllerFastify)
        )
        .put(
            '/trips/:tripId/activities/:activityId',
            { schema: TripActivityUpdateSchema },
            fastifyAdapterRoute(updateActivityControllerFastify)
        )
        .delete(
            '/trips/:tripId/activities/:activityId',
            { schema: TripActivityDeleteSchema },
            fastifyAdapterRoute(deleteActivityControllerFastify)
        )
        .get(
            '/trips/:id/activities',
            { schema: TripActivityFindAllSchema },
            fastifyAdapterRoute(findAllActivitiesByTripControllerFastify)
        )
        .get(
            '/trips/:tripId/activities/:activityId',
            { schema: TripActivityFindByIdAndTripSchema },
            fastifyAdapterRoute(findByIdActivityAndTripControllerFastify)
        )

        // Link Routes
        .post('/trips/:id/links', { schema: TripLinkCreateSchema }, fastifyAdapterRoute(createLinkControllerFastify))
        .put(
            '/trips/:tripId/links/:linkId',
            { schema: TripLinkUpdateSchema },
            fastifyAdapterRoute(updateLinkControllerFastify)
        )
        .delete(
            '/trips/:tripId/links/:linkId',
            { schema: TripLinkDeleteSchema },
            fastifyAdapterRoute(deleteLinkControllerFastify)
        )
        .get(
            '/trips/:id/links',
            { schema: TripLinkFindAllSchema },
            fastifyAdapterRoute(findAllLinksByTripControllerFastify)
        )
        .get(
            '/trips/:tripId/links/:linkId',
            { schema: TripLinkFindByIdAndTripSchema },
            fastifyAdapterRoute(findByIdLinkAndTripControllerFastify)
        );
}
